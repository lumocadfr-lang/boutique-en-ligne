import { promises as fs } from "fs";
import path from "path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "src/content/blog");

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  date: string;
  category: string;
  tags: string[];
  cover?: string;
  readingMinutes: number;
};

export type Post = PostMeta & { content: string };

function readingTime(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

async function fileToPost(file: string): Promise<Post> {
  const raw = await fs.readFile(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");
  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    excerpt: data.excerpt ?? data.description ?? "",
    date: data.date ?? new Date().toISOString(),
    category: data.category ?? "Inspiration",
    tags: data.tags ?? [],
    cover: data.cover,
    readingMinutes: readingTime(content),
    content,
  };
}

export async function getAllPosts(): Promise<Post[]> {
  let files: string[] = [];
  try {
    files = (await fs.readdir(BLOG_DIR)).filter((f) => /\.mdx?$/.test(f));
  } catch {
    return [];
  }
  const posts = await Promise.all(files.map(fileToPost));
  return posts.sort((a, b) => +new Date(b.date) - +new Date(a.date));
}

export async function getPostSlugs(): Promise<string[]> {
  try {
    return (await fs.readdir(BLOG_DIR))
      .filter((f) => /\.mdx?$/.test(f))
      .map((f) => f.replace(/\.mdx?$/, ""));
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    return await fileToPost(`${slug}.mdx`);
  } catch {
    return null;
  }
}
