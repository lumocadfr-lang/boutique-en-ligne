import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { Reveal } from "@/components/ui/Reveal";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { getAllPosts } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Journal — Inspiration déco, design & éclairage",
  description:
    "Conseils déco, tendances éclairage, design durable et coulisses de l'atelier : le journal LumoCAD pour sublimer votre intérieur avec la lumière.",
  path: "/blog",
});

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ name: "Journal", path: "/blog" }]} />

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow text-brass">Le journal</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">
          Inspiration, lumière & design
        </h1>
        <p className="mt-4 text-muted">
          Nos conseils pour choisir, marier et sublimer vos luminaires. Décoration intérieure,
          éclairage, tendances et design durable.
        </p>
      </header>

      {posts.length === 0 ? (
        <p className="py-24 text-center text-muted">Les premiers articles arrivent bientôt.</p>
      ) : (
        <>
          {/* Article à la une */}
          {featured && (
            <Reveal className="mt-12">
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid gap-8 overflow-hidden rounded-2xl border border-line lg:grid-cols-2"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-cream lg:aspect-auto">
                  <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                    <BrandedPlaceholder category="SUSPENSION" />
                  </div>
                </div>
                <div className="flex flex-col justify-center p-8 lg:p-10">
                  <div className="flex items-center gap-3 text-sm text-muted">
                    <span className="rounded-full bg-cream px-3 py-1 text-brass-dark">
                      {featured.category}
                    </span>
                    <span>{featured.readingMinutes} min de lecture</span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl text-ink group-hover:text-brass-dark">
                    {featured.title}
                  </h2>
                  <p className="mt-3 text-muted">{featured.excerpt}</p>
                  <span className="mt-5 text-sm text-muted">{formatDate(featured.date)}</span>
                </div>
              </Link>
            </Reveal>
          )}

          {/* Autres articles */}
          {rest.length > 0 && (
            <div className="mt-12 grid gap-x-6 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post, i) => (
                <Reveal key={post.slug} delay={i * 0.05}>
                  <article className="group">
                    <Link href={`/blog/${post.slug}`}>
                      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream">
                        <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                          <BrandedPlaceholder category="APPLIQUE" seed={i + 1} />
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-3 text-sm text-muted">
                        <span className="text-brass-dark">{post.category}</span>
                        <span>·</span>
                        <span>{post.readingMinutes} min</span>
                      </div>
                      <h2 className="mt-2 font-display text-xl text-ink group-hover:text-brass-dark">
                        {post.title}
                      </h2>
                      <p className="mt-2 line-clamp-2 text-sm text-muted">{post.excerpt}</p>
                    </Link>
                  </article>
                </Reveal>
              ))}
            </div>
          )}
        </>
      )}
    </Container>
  );
}
