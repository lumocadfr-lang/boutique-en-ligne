import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  Clock,
  Leaf,
  MapPin,
  Ruler,
  Star,
  Truck,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductBuyBox } from "@/components/product/ProductBuyBox";
import { ProductCard } from "@/components/product/ProductCard";
import {
  getAllProductSlugs,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { categoryLabel } from "@/lib/site";
import { discountPercent, formatPrice } from "@/lib/utils";
import { faqSchema, pageMetadata, productSchema } from "@/lib/seo";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getAllProductSlugs();
  return slugs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return {};
  return pageMetadata({
    title: product.seoTitle ?? `${product.title} — ${product.tagline ?? "Luminaire design"}`,
    description: product.seoDescription ?? product.excerpt ?? product.description.slice(0, 160),
    path: `/produits/${slug}`,
    type: "website",
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const related = await getRelatedProducts(product);
  const discount = discountPercent(product.priceCents, product.compareAtCents);
  const inStock = product.stock > 0;
  const ratingCount = product.reviews.length;
  const ratingValue =
    ratingCount > 0
      ? product.reviews.reduce((s, r) => s + r.rating, 0) / ratingCount
      : undefined;

  const reassurance = [
    { icon: MapPin, label: "Fabriqué en France", detail: "Atelier en Bourgogne" },
    { icon: Leaf, label: "Éco-conçu", detail: product.material ?? "PLA biodégradable" },
    { icon: Clock, label: "Fait à la commande", detail: product.leadTimeDays ?? "3 à 12 jours" },
    { icon: Ruler, label: "Personnalisable", detail: "Dimensions adaptables" },
  ];

  return (
    <>
      <JsonLd
        data={[
          productSchema({
            name: product.title,
            description: product.excerpt ?? product.description,
            slug: product.slug,
            images: product.images.map((i) => i.url).filter((u) => u !== "placeholder"),
            priceCents: product.priceCents,
            currency: product.currency,
            inStock,
            sku: product.sku,
            material: product.material,
            ratingValue: ratingValue ? Number(ratingValue.toFixed(1)) : undefined,
            reviewCount: ratingCount || undefined,
          }),
          ...(product.faqs.length
            ? [faqSchema(product.faqs.map((f) => ({ question: f.question, answer: f.answer })))]
            : []),
        ]}
      />

      <Container className="py-8 lg:py-12">
        <Breadcrumbs
          items={[
            { name: "Boutique", path: "/boutique" },
            {
              name: categoryLabel(product.category),
              path: `/boutique?category=${product.category}`,
            },
            { name: product.title, path: `/produits/${product.slug}` },
          ]}
        />

        {/* ── Achat ──────────────────────────────────────────────────────── */}
        <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery
            images={product.images}
            title={product.title}
            category={product.category}
          />

          <div className="lg:py-2">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-brass">{categoryLabel(product.category)}</p>
              <h1 className="mt-2 font-display text-3xl text-ink sm:text-4xl">
                {product.title}
              </h1>
              {product.tagline && (
                <p className="mt-2 text-lg text-muted">{product.tagline}</p>
              )}

              {ratingValue && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex text-brass">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        fill={i < Math.round(ratingValue) ? "currentColor" : "none"}
                        strokeWidth={i < Math.round(ratingValue) ? 0 : 1.5}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">
                    {ratingValue.toFixed(1)} · {ratingCount} avis
                  </span>
                </div>
              )}

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-3xl text-ink tabular-nums">
                  {formatPrice(product.priceCents, product.currency)}
                </span>
                {product.compareAtCents && (
                  <>
                    <span className="text-lg text-muted line-through tabular-nums">
                      {formatPrice(product.compareAtCents, product.currency)}
                    </span>
                    {discount && (
                      <span className="rounded-full bg-brass/15 px-2.5 py-1 text-sm font-semibold text-brass-dark">
                        −{discount}%
                      </span>
                    )}
                  </>
                )}
              </div>

              {product.excerpt && (
                <p className="mt-5 leading-relaxed text-ink-soft">{product.excerpt}</p>
              )}

              <div className="mt-7">
                <ProductBuyBox
                  inStock={inStock}
                  item={{
                    productId: product.id,
                    slug: product.slug,
                    title: product.title,
                    priceCents: product.priceCents,
                    image: product.images[0]?.url ?? null,
                    category: product.category,
                  }}
                />
              </div>

              {/* Réassurance */}
              <ul className="mt-8 grid grid-cols-2 gap-4 border-t border-line pt-7">
                {reassurance.map((r) => (
                  <li key={r.label} className="flex items-start gap-3">
                    <r.icon size={20} className="mt-0.5 shrink-0 text-brass" strokeWidth={1.5} />
                    <div>
                      <p className="text-sm font-medium text-ink">{r.label}</p>
                      <p className="text-xs text-muted">{r.detail}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* ── Histoire ───────────────────────────────────────────────────── */}
        {product.story && (
          <section className="mt-20 grid gap-10 border-t border-line pt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <Reveal>
              <p className="eyebrow text-brass">L'histoire de la pièce</p>
              <h2 className="mt-3 font-display text-3xl text-ink">
                Pensée pour sublimer la lumière
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="prose-lumo">
                <p>{product.story}</p>
                <p>{product.description}</p>
              </div>
            </Reveal>
          </section>
        )}

        {/* ── Caractéristiques ───────────────────────────────────────────── */}
        {product.specs.length > 0 && (
          <section className="mt-20 border-t border-line pt-16">
            <h2 className="font-display text-3xl text-ink">Caractéristiques techniques</h2>
            <dl className="mt-8 grid gap-x-12 gap-y-0 sm:grid-cols-2">
              {product.specs.map((spec) => (
                <div
                  key={spec.id}
                  className="flex justify-between gap-6 border-b border-line py-4"
                >
                  <dt className="text-muted">{spec.label}</dt>
                  <dd className="text-right font-medium text-ink">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        )}

        {/* ── FAQ produit ────────────────────────────────────────────────── */}
        {product.faqs.length > 0 && (
          <section className="mt-20 grid gap-10 border-t border-line pt-16 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <h2 className="font-display text-3xl text-ink">Questions fréquentes</h2>
              <p className="mt-3 text-muted">
                Besoin d'un renseignement ?{" "}
                <a href="/contact" className="link-underline text-ink">
                  Écrivez-nous
                </a>
                .
              </p>
            </div>
            <div className="divide-y divide-line border-t border-line">
              {product.faqs.map((f) => (
                <details key={f.id} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                    {f.question}
                    <span className="text-brass transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 text-muted">{f.answer}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* ── Avis ───────────────────────────────────────────────────────── */}
        {product.reviews.length > 0 && (
          <section className="mt-20 border-t border-line pt-16">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-3xl text-ink">Avis clients</h2>
              {ratingValue && (
                <span className="inline-flex items-center gap-1 text-brass">
                  <Star size={18} fill="currentColor" strokeWidth={0} />
                  <span className="font-medium text-ink">{ratingValue.toFixed(1)}</span>
                </span>
              )}
            </div>
            <div className="mt-8 grid gap-6 md:grid-cols-2">
              {product.reviews.map((r) => (
                <figure key={r.id} className="rounded-xl border border-line bg-paper p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex text-brass">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    {r.verified && (
                      <span className="inline-flex items-center gap-1 text-xs text-muted">
                        <Truck size={13} /> Achat vérifié
                      </span>
                    )}
                  </div>
                  {r.title && (
                    <figcaption className="mt-3 font-medium text-ink">{r.title}</figcaption>
                  )}
                  <blockquote className="mt-1 text-muted">“{r.body}”</blockquote>
                  <p className="mt-3 text-sm text-ink">
                    {r.author}
                    {r.location && <span className="text-muted"> · {r.location}</span>}
                  </p>
                </figure>
              ))}
            </div>
          </section>
        )}

        {/* ── Cross-sell ─────────────────────────────────────────────────── */}
        {related.length > 0 && (
          <section className="mt-20 border-t border-line pt-16">
            <h2 className="font-display text-3xl text-ink">Vous aimerez aussi</h2>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
