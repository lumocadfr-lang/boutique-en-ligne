import { Prisma } from "@prisma/client";
import { prisma } from "./prisma";

/* ── Presets d'inclusion ─────────────────────────────────────────────────── */

const cardSelect = {
  id: true,
  slug: true,
  title: true,
  tagline: true,
  excerpt: true,
  category: true,
  priceCents: true,
  compareAtCents: true,
  currency: true,
  stock: true,
  featured: true,
  madeToOrder: true,
  images: {
    orderBy: { position: "asc" },
    take: 2,
    select: { url: true, alt: true, width: true, height: true },
  },
} satisfies Prisma.ProductSelect;

export type ProductCard = Prisma.ProductGetPayload<{ select: typeof cardSelect }>;

const fullInclude = {
  images: { orderBy: { position: "asc" } },
  specs: { orderBy: { position: "asc" } },
  faqs: { orderBy: { position: "asc" } },
  reviews: { orderBy: { createdAt: "desc" } },
  collection: true,
  relatedTo: { select: cardSelect },
} satisfies Prisma.ProductInclude;

export type ProductFull = Prisma.ProductGetPayload<{ include: typeof fullInclude }>;

/* ── Lectures ────────────────────────────────────────────────────────────── */

export async function getFeaturedProducts(limit = 4): Promise<ProductCard[]> {
  return prisma.product.findMany({
    where: { status: "ACTIVE", featured: true },
    select: cardSelect,
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export type ProductFilter = {
  category?: string;
  sort?: "recent" | "price-asc" | "price-desc";
  q?: string;
};

export async function getProducts(filter: ProductFilter = {}): Promise<ProductCard[]> {
  const orderBy: Prisma.ProductOrderByWithRelationInput =
    filter.sort === "price-asc"
      ? { priceCents: "asc" }
      : filter.sort === "price-desc"
        ? { priceCents: "desc" }
        : { createdAt: "desc" };

  return prisma.product.findMany({
    where: {
      status: "ACTIVE",
      ...(filter.category ? { category: filter.category } : {}),
      ...(filter.q
        ? {
            OR: [
              { title: { contains: filter.q } },
              { excerpt: { contains: filter.q } },
              { description: { contains: filter.q } },
            ],
          }
        : {}),
    },
    select: cardSelect,
    orderBy,
  });
}

export async function getProductBySlug(slug: string): Promise<ProductFull | null> {
  return prisma.product.findUnique({
    where: { slug },
    include: fullInclude,
  });
}

export async function getAllProductSlugs(): Promise<{ slug: string; updatedAt: Date }[]> {
  return prisma.product.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true },
  });
}

export async function getRelatedProducts(
  product: ProductFull,
  limit = 4,
): Promise<ProductCard[]> {
  if (product.relatedTo.length > 0) return product.relatedTo.slice(0, limit);
  // Repli : même catégorie
  return prisma.product.findMany({
    where: { status: "ACTIVE", category: product.category, id: { not: product.id } },
    select: cardSelect,
    take: limit,
  });
}

/* ── Collections ─────────────────────────────────────────────────────────── */

export async function getCollections() {
  return prisma.collection.findMany({
    orderBy: { position: "asc" },
    include: { _count: { select: { products: true } } },
  });
}

export async function getCollectionBySlug(slug: string) {
  return prisma.collection.findUnique({ where: { slug } });
}

export async function getCollectionSlugs() {
  return prisma.collection.findMany({ select: { slug: true, updatedAt: true } });
}

/* ── Avis / preuves sociales ─────────────────────────────────────────────── */

export async function getTestimonials(limit = 6) {
  return prisma.review.findMany({
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function getProductCount(): Promise<number> {
  return prisma.product.count({ where: { status: "ACTIVE" } });
}
