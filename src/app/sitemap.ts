import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { getAllProductSlugs, getCollectionSlugs } from "@/lib/products";
import { getAllPosts } from "@/lib/blog";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections, posts] = await Promise.all([
    getAllProductSlugs(),
    getCollectionSlugs(),
    getAllPosts(),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/boutique"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/a-propos"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/sur-mesure"), changeFrequency: "monthly", priority: 0.7 },
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/contact"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/livraison"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/mentions-legales"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/cgv"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/confidentialite"), changeFrequency: "yearly", priority: 0.2 },
  ];

  const collectionPages: MetadataRoute.Sitemap = collections.map((c) => ({
    url: absoluteUrl(`/collections/${c.slug}`),
    lastModified: c.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: absoluteUrl(`/produits/${p.slug}`),
    lastModified: p.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = posts.map((p) => ({
    url: absoluteUrl(`/blog/${p.slug}`),
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...collectionPages, ...productPages, ...blogPages];
}
