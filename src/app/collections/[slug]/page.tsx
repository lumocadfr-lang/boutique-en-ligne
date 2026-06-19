import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import {
  getCollectionBySlug,
  getCollectionSlugs,
  getProducts,
} from "@/lib/products";
import { categoryFromCollectionSlug } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCollectionSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) return {};
  return pageMetadata({
    title: collection.seoTitle ?? collection.title,
    description: collection.seoDescription ?? collection.description ?? "",
    path: `/collections/${slug}`,
  });
}

export default async function CollectionPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const collection = await getCollectionBySlug(slug);
  if (!collection) notFound();

  const category = categoryFromCollectionSlug(slug);
  const products = await getProducts({ category });

  return (
    <>
      {/* Hero collection */}
      <section className="relative overflow-hidden border-b border-line bg-cream/50">
        <Container className="relative grid items-center gap-8 py-12 lg:grid-cols-2 lg:py-16">
          <div>
            <Breadcrumbs
              items={[
                { name: "Boutique", path: "/boutique" },
                { name: collection.title, path: `/collections/${slug}` },
              ]}
            />
            <h1 className="mt-6 font-display text-4xl text-ink sm:text-5xl">
              {collection.title}
            </h1>
            {collection.subtitle && (
              <p className="mt-3 text-lg text-brass-dark">{collection.subtitle}</p>
            )}
            {collection.description && (
              <p className="mt-4 max-w-md text-muted">{collection.description}</p>
            )}
            <p className="mt-6 text-sm text-muted">
              {products.length} création{products.length > 1 ? "s" : ""}
            </p>
          </div>
          <div className="relative hidden aspect-[5/4] overflow-hidden rounded-2xl lg:block">
            <BrandedPlaceholder category={category} label={collection.title} />
          </div>
        </Container>
      </section>

      <Container className="py-14">
        {products.length === 0 ? (
          <p className="py-20 text-center text-muted">
            De nouvelles pièces arrivent bientôt dans cette collection.
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} priority={i < 4} />
            ))}
          </div>
        )}
      </Container>
    </>
  );
}
