import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllPosts, getPostBySlug, getPostSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { articleSchema, pageMetadata } from "@/lib/seo";
import { Button } from "@/components/ui/Button";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return pageMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${slug}`,
    type: "article",
    keywords: post.tags,
  });
}

const mdxComponents = {
  a: ({ href = "", children, ...props }: React.ComponentProps<"a">) => {
    if (href.startsWith("/")) {
      return (
        <Link href={href} {...props}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
        {children}
      </a>
    );
  },
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const others = (await getAllPosts()).filter((p) => p.slug !== post.slug);
  const related = [
    ...others.filter((p) => p.category === post.category),
    ...others.filter((p) => p.category !== post.category),
  ].slice(0, 3);

  return (
    <>
      <JsonLd
        data={articleSchema({
          title: post.title,
          description: post.description,
          slug: post.slug,
          datePublished: post.date,
        })}
      />

      <Container className="py-10 lg:py-14">
        <article className="mx-auto max-w-3xl">
          <Breadcrumbs
            items={[
              { name: "Journal", path: "/blog" },
              { name: post.title, path: `/blog/${post.slug}` },
            ]}
          />

          <header className="mt-8">
            <div className="flex items-center gap-3 text-sm text-muted">
              <span className="rounded-full bg-cream px-3 py-1 text-brass-dark">
                {post.category}
              </span>
              <span>{formatDate(post.date)}</span>
              <span>·</span>
              <span>{post.readingMinutes} min de lecture</span>
            </div>
            <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-muted">{post.excerpt}</p>
          </header>

          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
            <BrandedPlaceholder category="SUSPENSION" label={post.title} />
          </div>

          <div className="prose-lumo mt-12">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{
                mdxOptions: { remarkPlugins: [remarkGfm], rehypePlugins: [rehypeSlug] },
              }}
            />
          </div>

          {/* CTA boutique */}
          <aside className="mt-14 flex flex-col items-start gap-4 rounded-2xl bg-cream/60 p-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-xl text-ink">
                Envie d'illuminer votre intérieur&nbsp;?
              </p>
              <p className="mt-1 text-sm text-muted">
                Découvrez nos luminaires artisanaux, imprimés en 3D et fabriqués en France.
              </p>
            </div>
            <Button href="/boutique" className="shrink-0">
              Voir la boutique
            </Button>
          </aside>

          <footer className="mt-14 border-t border-line pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brass-dark"
            >
              <ArrowLeft size={16} /> Retour au journal
            </Link>
          </footer>
        </article>

        {/* Articles liés */}
        {related.length > 0 && (
          <section className="mx-auto mt-16 max-w-5xl border-t border-line pt-12">
            <h2 className="font-display text-2xl text-ink">À lire aussi</h2>
            <div className="mt-8 grid gap-x-6 gap-y-10 sm:grid-cols-3">
              {related.map((p, i) => (
                <article key={p.slug} className="group">
                  <Link href={`/blog/${p.slug}`}>
                    <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-cream">
                      <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                        <BrandedPlaceholder category="APPLIQUE" seed={i + 2} />
                      </div>
                    </div>
                    <p className="mt-3 text-xs text-brass-dark">{p.category}</p>
                    <h3 className="mt-1 font-display text-lg leading-snug text-ink group-hover:text-brass-dark">
                      {p.title}
                    </h3>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
