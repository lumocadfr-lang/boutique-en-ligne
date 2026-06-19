/**
 * Seed LumoCAD.
 *
 * DOMEA et HYLDA reprennent les vraies créations de la boutique. Les autres
 * pièces sont des exemples cohérents avec l'univers de la marque, destinés à
 * être remplacés par l'import Shopify réel (`npm run import:shopify`).
 *
 * Lancement : `npm run db:seed`
 */
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type SeedSpec = { label: string; value: string };
type SeedFaq = { question: string; answer: string };
type SeedReview = { author: string; location?: string; rating?: number; title?: string; body: string };

type SeedProduct = {
  slug: string;
  title: string;
  tagline: string;
  excerpt: string;
  description: string;
  story: string;
  category: string;
  priceCents: number;
  compareAtCents?: number;
  stock: number;
  featured?: boolean;
  material: string;
  color?: string;
  dimensions: string;
  bulbType: string;
  leadTimeDays: string;
  specs: SeedSpec[];
  faqs: SeedFaq[];
  reviews?: SeedReview[];
  related: string[];
  seoTitle: string;
  seoDescription: string;
};

const collections = [
  {
    slug: "suspensions",
    title: "Suspensions",
    subtitle: "Pièces sculpturales à suspendre",
    description:
      "Des suspensions au dessin organique qui structurent l'espace et diffusent une lumière chaude et enveloppante. Au-dessus d'une table, d'un îlot ou d'un coin lecture.",
    category: "SUSPENSION",
    seoTitle: "Suspensions design artisanales imprimées en 3D",
    seoDescription:
      "Suspensions luminaires design fabriquées en France, imprimées en 3D à partir de matériaux éco-responsables. Pièces uniques à la lumière chaleureuse.",
  },
  {
    slug: "appliques",
    title: "Appliques murales",
    subtitle: "La lumière qui habille vos murs",
    description:
      "Des appliques graphiques qui transforment un mur en tableau lumineux. Lumière indirecte, ambiance feutrée, détails texturés.",
    category: "APPLIQUE",
    seoTitle: "Appliques murales design fabriquées en France",
    seoDescription:
      "Appliques murales design imprimées en 3D, éco-conçues et fabriquées à la main en France. Lumière d'ambiance chaleureuse pour votre intérieur.",
  },
  {
    slug: "lampes-a-poser",
    title: "Lampes à poser",
    subtitle: "Compagnes lumineuses du quotidien",
    description:
      "Posées sur une table de chevet, un bureau ou une console, ces lampes apportent une lumière douce et une présence sculpturale.",
    category: "LAMPE_A_POSER",
    seoTitle: "Lampes à poser design artisanales — LumoCAD",
    seoDescription:
      "Lampes à poser design, imprimées en 3D et fabriquées en France. Matériaux éco-responsables, lumière chaleureuse, pièces uniques.",
  },
  {
    slug: "lampadaires",
    title: "Lampadaires",
    subtitle: "La verticale lumineuse",
    description:
      "Des lampadaires qui dessinent une signature dans la pièce et diffusent une lumière généreuse, idéale pour un coin salon.",
    category: "LAMPADAIRE",
    seoTitle: "Lampadaires design fabriqués en France — LumoCAD",
    seoDescription:
      "Lampadaires design imprimés en 3D, éco-conçus et fabriqués à la main en France par LumoCAD.",
  },
];

const baseFaqs: SeedFaq[] = [
  {
    question: "Quel délai de fabrication ?",
    answer:
      "Chaque pièce est imprimée à la commande dans notre atelier en Bourgogne. Comptez 3 à 12 jours ouvrés selon la complexité avant expédition.",
  },
  {
    question: "Quelle source lumineuse utiliser ?",
    answer:
      "Nos luminaires sont compatibles avec les ampoules LED standard à culot E27. Nous recommandons une LED blanc chaud (2200–2700 K) pour une ambiance feutrée.",
  },
  {
    question: "Les matériaux sont-ils vraiment écologiques ?",
    answer:
      "Oui. Nous imprimons en PLA biodégradable d'origine végétale et privilégions les diffuseurs PETG recyclables. La fabrication à la demande évite la surproduction.",
  },
  {
    question: "Puis-je adapter les dimensions ?",
    answer:
      "Absolument : la plupart de nos modèles sont personnalisables (taille, hauteur, diamètre). Contactez-nous via la page Sur-mesure pour un devis.",
  },
];

const products: SeedProduct[] = [
  {
    slug: "suspension-domea",
    title: "Suspension DOMEA",
    tagline: "Courbes ondulées, lumière chaleureuse",
    excerpt:
      "Une suspension sculpturale aux courbes généreuses et au plissé translucide qui diffuse une lumière douce.",
    description:
      "DOMEA habille vos espaces de ses courbes ondulées inspirées du minimalisme nordique. Son abat-jour plissé translucide tamise la lumière pour créer une ambiance chaleureuse et contemporaine, parfaite au-dessus d'une table à manger ou dans un salon. Imprimée en 3D dans notre atelier, chaque pièce est unique.",
    story:
      "DOMEA est née de l'envie de capturer le mouvement d'une étoffe figée dans la lumière. Le plissé, impossible à mouler de façon traditionnelle, prend vie grâce à l'impression 3D couche après couche.",
    category: "SUSPENSION",
    priceCents: 18900,
    compareAtCents: 27000,
    stock: 8,
    featured: true,
    material: "PLA biodégradable",
    color: "Ivoire chaud",
    dimensions: "Ø 32 × H 26 cm",
    bulbType: "E27 — LED blanc chaud recommandée",
    leadTimeDays: "3 à 12 jours ouvrés",
    specs: [
      { label: "Matériau", value: "PLA biodégradable d'origine végétale" },
      { label: "Dimensions", value: "Ø 32 × H 26 cm" },
      { label: "Source lumineuse", value: "Culot E27 (ampoule non fournie)" },
      { label: "Longueur de câble", value: "120 cm, ajustable" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
      { label: "Poids", value: "≈ 700 g" },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        author: "Camille R.",
        location: "Lyon",
        rating: 5,
        title: "Sublime au-dessus de la table",
        body: "La lumière est incroyablement douce et le plissé fait son effet. Communication parfaite avec le créateur et livraison en point relais rapide.",
      },
      {
        author: "Thomas L.",
        location: "Nantes",
        rating: 5,
        body: "Très belle pièce, encore plus jolie en vrai. On sent le travail artisanal.",
      },
    ],
    related: ["suspension-solenn", "applique-hylda", "suspension-halo"],
    seoTitle: "Suspension DOMEA — luminaire design ondulé imprimé en 3D",
    seoDescription:
      "DOMEA, suspension design aux courbes ondulées et plissé translucide. Imprimée en 3D, éco-conçue et fabriquée en France. Lumière chaleureuse, pièce unique.",
  },
  {
    slug: "applique-hylda",
    title: "Applique HYLDA & étagère intégrée",
    tagline: "L'effet coucher de soleil",
    excerpt:
      "Une applique carrée aux angles arrondis qui reproduit la magie d'un coucher de soleil, avec une étagère intégrée.",
    description:
      "HYLDA reproduit la magie d'un coucher de soleil dans votre intérieur. Son dessin carré aux angles arrondis et sa finition texturée créent un spectaculaire jeu de lumière, tandis que son étagère intégrée accueille vos plus beaux objets. Le diffuseur en PETG translucide adoucit la lumière pour une ambiance enveloppante.",
    story:
      "HYLDA est un hommage aux lumières de fin de journée. La texture imprimée en relief diffracte la lumière et fait apparaître des dégradés ambrés, comme un soleil couchant sur le mur.",
    category: "APPLIQUE",
    priceCents: 12900,
    compareAtCents: 18400,
    stock: 12,
    featured: true,
    material: "PLA biodégradable + diffuseur PETG translucide",
    color: "Sable",
    dimensions: "L 22 × H 22 × P 9 cm",
    bulbType: "E14 — LED blanc chaud recommandée",
    leadTimeDays: "3 à 12 jours ouvrés",
    specs: [
      { label: "Matériau", value: "PLA biodégradable + diffuseur PETG translucide" },
      { label: "Dimensions", value: "L 22 × H 22 × P 9 cm" },
      { label: "Source lumineuse", value: "Culot E14 (ampoule non fournie)" },
      { label: "Fonction", value: "Étagère intégrée" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
    ],
    faqs: baseFaqs,
    reviews: [
      {
        author: "Sophie M.",
        location: "Bordeaux",
        rating: 5,
        title: "L'effet coucher de soleil est bluffant",
        body: "Installée dans l'entrée, elle crée une ambiance incroyable le soir. L'étagère est un vrai plus.",
      },
    ],
    related: ["applique-ora", "suspension-domea", "lampe-novea"],
    seoTitle: "Applique HYLDA — effet coucher de soleil & étagère intégrée",
    seoDescription:
      "HYLDA, applique murale design effet coucher de soleil avec étagère intégrée. PLA biodégradable et diffuseur PETG, imprimée en 3D et fabriquée en France.",
  },
  {
    slug: "suspension-solenn",
    title: "Suspension SOLENN",
    tagline: "Le dôme plissé",
    excerpt: "Un dôme aux fines nervures verticales qui projette une lumière graphique et apaisante.",
    description:
      "SOLENN évoque un coquillage renversé. Ses nervures verticales finement imprimées dessinent des ombres délicates et tamisent la lumière. Idéale en duo ou trio au-dessus d'un îlot de cuisine.",
    story:
      "Inspirée des formes marines, SOLENN explore la répétition et le rythme. Chaque nervure guide la lumière vers le bas pour un éclairage fonctionnel et doux.",
    category: "SUSPENSION",
    priceCents: 16900,
    stock: 6,
    featured: true,
    material: "PLA biodégradable",
    color: "Blanc cassé",
    dimensions: "Ø 28 × H 22 cm",
    bulbType: "E27 — LED blanc chaud recommandée",
    leadTimeDays: "3 à 12 jours ouvrés",
    specs: [
      { label: "Matériau", value: "PLA biodégradable d'origine végétale" },
      { label: "Dimensions", value: "Ø 28 × H 22 cm" },
      { label: "Source lumineuse", value: "Culot E27 (ampoule non fournie)" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
    ],
    faqs: baseFaqs,
    related: ["suspension-domea", "suspension-halo", "lampe-galet"],
    seoTitle: "Suspension SOLENN — dôme plissé design imprimé en 3D",
    seoDescription:
      "SOLENN, suspension dôme aux nervures verticales. Luminaire design éco-conçu, imprimé en 3D et fabriqué en France. Lumière graphique et chaleureuse.",
  },
  {
    slug: "lampe-novea",
    title: "Lampe à poser NOVÉA",
    tagline: "Une lueur sculpturale",
    excerpt: "Une lampe à poser au galbe doux qui diffuse une lumière d'appoint chaleureuse.",
    description:
      "NOVÉA pose une parenthèse lumineuse sur votre table de chevet ou votre bureau. Son galbe arrondi et sa surface satinée diffusent une lumière tamisée, parfaite pour une fin de soirée. Interrupteur à variateur en option.",
    story:
      "NOVÉA est pensée comme un objet à toucher autant qu'à regarder : sa surface légèrement texturée invite la main et accroche délicatement la lumière.",
    category: "LAMPE_A_POSER",
    priceCents: 10900,
    stock: 10,
    featured: true,
    material: "PLA biodégradable",
    color: "Terracotta",
    dimensions: "Ø 16 × H 28 cm",
    bulbType: "E14 — LED blanc chaud recommandée",
    leadTimeDays: "3 à 12 jours ouvrés",
    specs: [
      { label: "Matériau", value: "PLA biodégradable d'origine végétale" },
      { label: "Dimensions", value: "Ø 16 × H 28 cm" },
      { label: "Source lumineuse", value: "Culot E14 (ampoule non fournie)" },
      { label: "Interrupteur", value: "Sur câble, variateur en option" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
    ],
    faqs: baseFaqs,
    related: ["lampe-galet", "applique-hylda", "suspension-solenn"],
    seoTitle: "Lampe à poser NOVÉA — lumière d'appoint design",
    seoDescription:
      "NOVÉA, lampe à poser design au galbe doux. Imprimée en 3D, éco-conçue et fabriquée en France. Lumière tamisée et chaleureuse.",
  },
  {
    slug: "applique-ora",
    title: "Applique ORA",
    tagline: "Un lever de lumière",
    excerpt: "Une applique en demi-cercle qui projette un halo doux vers le haut.",
    description:
      "ORA dessine un demi-soleil sur votre mur. Sa forme épurée projette un halo de lumière indirecte vers le haut, idéale dans un couloir, une chambre ou de part et d'autre d'un lit.",
    story:
      "ORA est l'aube de la collection HYLDA : la même fascination pour la lumière du jour, condensée dans une forme minimale.",
    category: "APPLIQUE",
    priceCents: 9900,
    stock: 14,
    material: "PLA biodégradable + diffuseur PETG translucide",
    color: "Lin",
    dimensions: "L 24 × H 13 × P 8 cm",
    bulbType: "E14 — LED blanc chaud recommandée",
    leadTimeDays: "3 à 12 jours ouvrés",
    specs: [
      { label: "Matériau", value: "PLA biodégradable + diffuseur PETG" },
      { label: "Dimensions", value: "L 24 × H 13 × P 8 cm" },
      { label: "Source lumineuse", value: "Culot E14 (ampoule non fournie)" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
    ],
    faqs: baseFaqs,
    related: ["applique-hylda", "lampe-novea", "suspension-domea"],
    seoTitle: "Applique ORA — halo de lumière indirecte design",
    seoDescription:
      "ORA, applique murale demi-cercle à lumière indirecte. Design éco-conçu, imprimé en 3D et fabriqué en France.",
  },
  {
    slug: "suspension-halo",
    title: "Suspension HALO",
    tagline: "L'anneau lumineux",
    excerpt: "Un anneau épuré qui flotte et signe l'espace d'une ligne de lumière.",
    description:
      "HALO réduit la suspension à l'essentiel : un anneau lumineux qui semble flotter. Graphique et discrète, elle s'intègre aussi bien dans un intérieur contemporain qu'au-dessus d'un bureau.",
    story:
      "HALO est un exercice de pureté : une seule ligne, fermée sur elle-même, pour une lumière qui ne montre pas sa source.",
    category: "SUSPENSION",
    priceCents: 19900,
    stock: 5,
    material: "PLA biodégradable",
    color: "Noir mat",
    dimensions: "Ø 40 × H 6 cm",
    bulbType: "LED intégrée",
    leadTimeDays: "5 à 14 jours ouvrés",
    specs: [
      { label: "Matériau", value: "PLA biodégradable d'origine végétale" },
      { label: "Dimensions", value: "Ø 40 × H 6 cm" },
      { label: "Source lumineuse", value: "LED intégrée (blanc chaud)" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
    ],
    faqs: baseFaqs,
    related: ["suspension-domea", "suspension-solenn", "lampadaire-lira"],
    seoTitle: "Suspension HALO — anneau lumineux design en 3D",
    seoDescription:
      "HALO, suspension anneau à LED intégrée. Luminaire design minimaliste, imprimé en 3D et fabriqué en France.",
  },
  {
    slug: "lampe-galet",
    title: "Lampe à poser GALET",
    tagline: "Douce comme un galet",
    excerpt: "Une petite lampe nomade et arrondie, parfaite en lumière d'ambiance.",
    description:
      "GALET tient dans le creux de la main. Sa forme organique et sa lumière tamisée en font la parfaite veilleuse d'appoint, sur une étagère ou une table basse.",
    story:
      "GALET est un clin d'œil aux pierres polies par l'eau : une forme simple, douce, que l'on a envie de garder près de soi.",
    category: "LAMPE_A_POSER",
    priceCents: 8900,
    stock: 18,
    material: "PLA biodégradable",
    color: "Galet gris",
    dimensions: "L 18 × H 12 cm",
    bulbType: "LED intégrée — USB rechargeable",
    leadTimeDays: "3 à 10 jours ouvrés",
    specs: [
      { label: "Matériau", value: "PLA biodégradable d'origine végétale" },
      { label: "Dimensions", value: "L 18 × H 12 cm" },
      { label: "Source lumineuse", value: "LED intégrée, batterie USB-C rechargeable" },
      { label: "Autonomie", value: "≈ 8 h" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
    ],
    faqs: baseFaqs,
    related: ["lampe-novea", "applique-ora", "suspension-solenn"],
    seoTitle: "Lampe à poser GALET — veilleuse nomade design",
    seoDescription:
      "GALET, lampe nomade rechargeable au design organique. Imprimée en 3D, éco-conçue et fabriquée en France.",
  },
  {
    slug: "lampadaire-lira",
    title: "Lampadaire LIRA",
    tagline: "La verticale chaleureuse",
    excerpt: "Un lampadaire élancé au diffuseur sculptural pour un coin salon enveloppant.",
    description:
      "LIRA s'élève avec élégance pour éclairer un coin lecture ou un canapé. Son diffuseur sculptural répartit une lumière généreuse et chaleureuse, sans éblouir. Une présence forte mais douce dans la pièce.",
    story:
      "LIRA porte le nom d'une constellation : son diffuseur, comme un astre, irradie une lumière douce dans toute la pièce.",
    category: "LAMPADAIRE",
    priceCents: 24900,
    stock: 4,
    material: "PLA biodégradable + piètement acier",
    color: "Ivoire / acier noir",
    dimensions: "H 150 × Ø base 28 cm",
    bulbType: "E27 — LED blanc chaud recommandée",
    leadTimeDays: "7 à 15 jours ouvrés",
    specs: [
      { label: "Matériau", value: "Diffuseur PLA biodégradable, piètement acier" },
      { label: "Dimensions", value: "H 150 × Ø base 28 cm" },
      { label: "Source lumineuse", value: "Culot E27 (ampoule non fournie)" },
      { label: "Interrupteur", value: "À pied sur câble" },
      { label: "Fabrication", value: "Imprimé 3D à la main en Bourgogne" },
    ],
    faqs: baseFaqs,
    related: ["suspension-halo", "lampe-novea", "suspension-domea"],
    seoTitle: "Lampadaire LIRA — luminaire vertical design en 3D",
    seoDescription:
      "LIRA, lampadaire design au diffuseur sculptural. Imprimé en 3D, éco-conçu et fabriqué en France. Lumière chaleureuse pour le salon.",
  },
];

// Avis « marque » (non rattachés à un produit) pour la page d'accueil
const brandReviews: SeedReview[] = [
  {
    author: "Élodie P.",
    location: "Annecy",
    rating: 5,
    title: "Un artisanat précieux",
    body: "On sent l'amour du détail. La lampe est unique et l'échange avec le créateur a été adorable.",
  },
  {
    author: "Marc D.",
    location: "Strasbourg",
    rating: 5,
    title: "Design et conscience écologique",
    body: "Enfin des luminaires beaux ET responsables, fabriqués en France. Je recommande les yeux fermés.",
  },
  {
    author: "Inès G.",
    location: "Toulouse",
    rating: 5,
    title: "Service au top",
    body: "Commande sur-mesure pour adapter la taille à mon plafond, le résultat est parfait.",
  },
];

async function main() {
  console.log("🌱 Réinitialisation…");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.review.deleteMany();
  await prisma.productFaq.deleteMany();
  await prisma.productSpec.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.collection.deleteMany();

  console.log("📦 Collections…");
  const collectionByCategory = new Map<string, string>();
  for (let i = 0; i < collections.length; i++) {
    const c = collections[i];
    const created = await prisma.collection.create({
      data: {
        slug: c.slug,
        title: c.title,
        subtitle: c.subtitle,
        description: c.description,
        position: i,
        heroImage: "placeholder",
        seoTitle: c.seoTitle,
        seoDescription: c.seoDescription,
      },
    });
    collectionByCategory.set(c.category, created.id);
  }

  console.log("💡 Produits…");
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    await prisma.product.create({
      data: {
        slug: p.slug,
        title: p.title,
        tagline: p.tagline,
        excerpt: p.excerpt,
        description: p.description,
        story: p.story,
        category: p.category,
        status: "ACTIVE",
        featured: p.featured ?? false,
        priceCents: p.priceCents,
        compareAtCents: p.compareAtCents,
        currency: "EUR",
        sku: p.slug.toUpperCase().replace(/-/g, "_"),
        stock: p.stock,
        leadTimeDays: p.leadTimeDays,
        madeToOrder: true,
        material: p.material,
        color: p.color,
        dimensions: p.dimensions,
        bulbType: p.bulbType,
        collectionId: collectionByCategory.get(p.category),
        seoTitle: p.seoTitle,
        seoDescription: p.seoDescription,
        images: {
          create: [0, 1, 2].map((n) => ({
            url: "placeholder",
            alt: `${p.title} — vue ${n + 1}`,
            position: n,
          })),
        },
        specs: { create: p.specs.map((s, n) => ({ ...s, position: n })) },
        faqs: { create: p.faqs.map((f, n) => ({ ...f, position: n })) },
        reviews: {
          create: (p.reviews ?? []).map((r) => ({
            author: r.author,
            location: r.location,
            rating: r.rating ?? 5,
            title: r.title,
            body: r.body,
            verified: true,
          })),
        },
      },
    });
  }

  console.log("🔗 Produits complémentaires…");
  for (const p of products) {
    await prisma.product.update({
      where: { slug: p.slug },
      data: { relatedTo: { connect: p.related.map((slug) => ({ slug })) } },
    });
  }

  console.log("⭐ Avis de marque…");
  for (const r of brandReviews) {
    await prisma.review.create({
      data: {
        author: r.author,
        location: r.location,
        rating: r.rating ?? 5,
        title: r.title,
        body: r.body,
        verified: true,
      },
    });
  }

  const count = await prisma.product.count();
  console.log(`✅ Seed terminé : ${count} produits, ${collections.length} collections.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
