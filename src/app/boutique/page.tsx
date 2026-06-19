import type { Metadata } from "next";
import { Suspense } from "react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { getProducts, type ProductFilter } from "@/lib/products";
import { categoryLabel } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Boutique — Luminaires design artisanaux",
  description:
    "Découvrez toutes les créations LumoCAD : suspensions, appliques, lampes à poser et lampadaires design, imprimés en 3D et fabriqués en France à partir de matériaux éco-responsables.",
  path: "/boutique",
  keywords: [
    "luminaire design",
    "boutique luminaire artisanal",
    "suspension design",
    "applique murale",
    "lampe à poser design",
  ],
});

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function param(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

export default async function BoutiquePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const sp = await searchParams;
  const filter: ProductFilter = {
    category: param(sp.category),
    sort: param(sp.sort) as ProductFilter["sort"],
    q: param(sp.q),
  };
  const products = await getProducts(filter);
  const heading = filter.category ? categoryLabel(filter.category) : "Toutes nos créations";

  return (
    <Container className="py-10 lg:py-14">
      <Breadcrumbs items={[{ name: "Boutique", path: "/boutique" }]} />

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow text-brass">La boutique</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">{heading}</h1>
        <p className="mt-4 text-muted">
          Des luminaires uniques, imprimés en 3D et façonnés à la main en Bourgogne.
          Chaque pièce est fabriquée à la commande, dans le respect de l'environnement.
        </p>
      </header>

      <div className="mt-10">
        <Suspense fallback={<div className="h-16" />}>
          <ShopToolbar count={products.length} />
        </Suspense>
      </div>

      {products.length === 0 ? (
        <div className="py-24 text-center">
          <p className="font-display text-2xl text-ink">Aucune création ne correspond.</p>
          <p className="mt-2 text-muted">Essayez une autre catégorie ou revenez bientôt.</p>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
          ))}
        </div>
      )}
    </Container>
  );
}
