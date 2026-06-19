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
import { getPostBySlug, getPostSlugs } from "@/lib/blog";
import { formatDate } from "@/lib/utils";
import { articleSchema, pageMetadata } from "@/lib/seo";

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

          <footer className="mt-14 border-t border-line pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-ink hover:text-brass-dark"
            >
              <ArrowLeft size={16} /> Retour au journal
            </Link>
          </footer>
        </article>
      </Container>
    </>
  );
}
