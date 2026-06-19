/**
 * Import one-shot du catalogue Shopify → base LumoCAD (via Storefront API).
 *
 * Pré-requis :
 *   1. Dans Shopify : Paramètres → Applications et canaux de vente →
 *      Développer des apps → Créer une app → configurer l'API Storefront
 *      (cocher au minimum : unauthenticated_read_product_listings) →
 *      Installer → copier le « Storefront API access token ».
 *   2. Renseigner dans .env :
 *        SHOPIFY_STORE_DOMAIN="votreboutique.myshopify.com"
 *        SHOPIFY_STOREFRONT_TOKEN="xxxxxxxx"
 *   3. Lancer :  npm run import:shopify           (met à jour / complète)
 *         ou  :  npm run import:shopify -- --fresh  (vide d'abord le catalogue)
 *
 * Note : le réseau doit autoriser l'accès à *.myshopify.com.
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const DOMAIN = process.env.SHOPIFY_STORE_DOMAIN;
const TOKEN = process.env.SHOPIFY_STOREFRONT_TOKEN;
const API_VERSION = "2024-10";
const FRESH = process.argv.includes("--fresh");

type ShopifyImage = { url: string; altText: string | null; width: number | null; height: number | null };
type ShopifyVariant = {
  sku: string | null;
  price: { amount: string };
  compareAtPrice: { amount: string } | null;
  quantityAvailable: number | null;
};
type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
  seo: { title: string | null; description: string | null };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { nodes: ShopifyImage[] };
  variants: { nodes: ShopifyVariant[] };
};

const QUERY = /* GraphQL */ `
  query Products($cursor: String) {
    products(first: 50, after: $cursor) {
      pageInfo { hasNextPage endCursor }
      nodes {
        id
        handle
        title
        description
        productType
        tags
        availableForSale
        seo { title description }
        priceRange { minVariantPrice { amount currencyCode } }
        images(first: 8) { nodes { url altText width height } }
        variants(first: 1) {
          nodes { sku price { amount } compareAtPrice { amount } quantityAvailable }
        }
      }
    }
  }
`;

function moneyToCents(amount: string | undefined | null): number {
  if (!amount) return 0;
  return Math.round(parseFloat(amount) * 100);
}

/** Devine la catégorie interne à partir du type / des tags Shopify. */
function detectCategory(productType: string, tags: string[]): string {
  const haystack = `${productType} ${tags.join(" ")}`.toLowerCase();
  if (/(suspension|plafonnier|lustre)/.test(haystack)) return "SUSPENSION";
  if (/(applique|murale|wall)/.test(haystack)) return "APPLIQUE";
  if (/(poser|table|chevet|bureau)/.test(haystack)) return "LAMPE_A_POSER";
  if (/(lampadaire|floor|sur pied)/.test(haystack)) return "LAMPADAIRE";
  if (/(mesure|custom)/.test(haystack)) return "SUR_MESURE";
  return "SUSPENSION";
}

const CATEGORY_COLLECTIONS: Record<string, { slug: string; title: string }> = {
  SUSPENSION: { slug: "suspensions", title: "Suspensions" },
  APPLIQUE: { slug: "appliques", title: "Appliques murales" },
  LAMPE_A_POSER: { slug: "lampes-a-poser", title: "Lampes à poser" },
  LAMPADAIRE: { slug: "lampadaires", title: "Lampadaires" },
  SUR_MESURE: { slug: "sur-mesure", title: "Sur-mesure" },
};

type FetchResult = { nodes: ShopifyProduct[]; hasNextPage: boolean; endCursor: string | null };

async function shopifyFetch(cursor: string | null): Promise<FetchResult> {
  const res = await fetch(`https://${DOMAIN}/api/${API_VERSION}/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": TOKEN as string,
    },
    body: JSON.stringify({ query: QUERY, variables: { cursor } }),
  });

  if (!res.ok) {
    throw new Error(`Shopify a répondu ${res.status} ${res.statusText}. Vérifiez le token et le domaine.`);
  }
  const json = (await res.json()) as {
    data?: { products: { pageInfo: { hasNextPage: boolean; endCursor: string }; nodes: ShopifyProduct[] } };
    errors?: unknown;
  };
  if (json.errors) {
    throw new Error(`Erreur GraphQL Shopify : ${JSON.stringify(json.errors)}`);
  }
  const p = json.data!.products;
  return { nodes: p.nodes, hasNextPage: p.pageInfo.hasNextPage, endCursor: p.pageInfo.endCursor };
}

async function ensureCollection(category: string): Promise<string | undefined> {
  const def = CATEGORY_COLLECTIONS[category];
  if (!def) return undefined;
  const existing = await prisma.collection.findUnique({ where: { slug: def.slug } });
  if (existing) return existing.id;
  const created = await prisma.collection.create({
    data: { slug: def.slug, title: def.title, heroImage: "placeholder" },
  });
  return created.id;
}

async function main() {
  if (!DOMAIN || !TOKEN) {
    console.error(
      "\n❌ Configuration manquante.\n" +
        "   Renseignez SHOPIFY_STORE_DOMAIN et SHOPIFY_STOREFRONT_TOKEN dans .env.\n" +
        "   (cf. en-tête de scripts/import-shopify.ts)\n",
    );
    process.exit(1);
  }

  if (FRESH) {
    console.log("🧹 Suppression du catalogue existant (--fresh)…");
    await prisma.productImage.deleteMany();
    await prisma.productSpec.deleteMany();
    await prisma.productFaq.deleteMany();
    await prisma.review.deleteMany({ where: { productId: { not: null } } });
    await prisma.product.deleteMany();
  }

  console.log(`🛍️  Import depuis ${DOMAIN}…`);
  let cursor: string | null = null;
  let total = 0;

  do {
    const { nodes, hasNextPage, endCursor } = await shopifyFetch(cursor);
    for (const sp of nodes) {
      const category = detectCategory(sp.productType, sp.tags);
      const collectionId = await ensureCollection(category);
      const variant = sp.variants.nodes[0];
      const priceCents = moneyToCents(variant?.price.amount) || moneyToCents(sp.priceRange.minVariantPrice.amount);
      const compareAtCents = moneyToCents(variant?.compareAtPrice?.amount) || null;

      const data = {
        title: sp.title,
        description: sp.description || sp.title,
        excerpt: sp.description ? sp.description.slice(0, 180) : null,
        category,
        status: sp.availableForSale ? "ACTIVE" : "DRAFT",
        priceCents,
        compareAtCents: compareAtCents && compareAtCents > priceCents ? compareAtCents : null,
        currency: sp.priceRange.minVariantPrice.currencyCode || "EUR",
        sku: variant?.sku ?? null,
        stock: variant?.quantityAvailable ?? 0,
        collectionId,
        seoTitle: sp.seo.title ?? null,
        seoDescription: sp.seo.description ?? null,
        shopifyId: sp.id,
      };

      const product = await prisma.product.upsert({
        where: { slug: sp.handle },
        update: data,
        create: { slug: sp.handle, ...data },
      });

      // Images : on remplace
      await prisma.productImage.deleteMany({ where: { productId: product.id } });
      if (sp.images.nodes.length > 0) {
        await prisma.productImage.createMany({
          data: sp.images.nodes.map((img, i) => ({
            productId: product.id,
            url: img.url,
            alt: img.altText ?? sp.title,
            width: img.width ?? undefined,
            height: img.height ?? undefined,
            position: i,
          })),
        });
      }

      total++;
      console.log(`  ✓ ${sp.title}  (${category}, ${(priceCents / 100).toFixed(2)} €)`);
    }
    cursor = hasNextPage ? endCursor : null;
  } while (cursor);

  console.log(`\n✅ Import terminé : ${total} produit(s) synchronisé(s).`);
}

main()
  .catch((e) => {
    console.error("\n❌ Import échoué :", e instanceof Error ? e.message : e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
