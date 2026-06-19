import type { Metadata } from "next";
import { site } from "./site";
import { absoluteUrl } from "./utils";

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  noindex?: boolean;
  keywords?: string[];
};

/** Construit des métadonnées Next cohérentes (title, OG, Twitter, canonical). */
export function pageMetadata({
  title,
  description,
  path = "/",
  image,
  type = "website",
  noindex = false,
  keywords,
}: PageMetaInput): Metadata {
  const url = absoluteUrl(path);
  // Si aucune image n'est fournie, la convention de fichier `opengraph-image`
  // (générée dynamiquement) prend le relais automatiquement.
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: site.name,
      locale: site.locale,
      ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(image ? { images: [image] } : {}),
    },
  };
}

/* ── Données structurées Schema.org ──────────────────────────────────────── */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    email: site.email,
    description: site.shortDescription,
    logo: absoluteUrl("/logo-lumocad.png"),
    address: {
      "@type": "PostalAddress",
      addressRegion: site.region,
      addressCountry: site.countryCode,
    },
    sameAs: Object.values(site.social).filter(Boolean),
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
    inLanguage: site.lang,
    potentialAction: {
      "@type": "SearchAction",
      target: `${site.url}/boutique?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

type ProductSchemaInput = {
  name: string;
  description: string;
  slug: string;
  images: string[];
  priceCents: number;
  currency?: string;
  inStock: boolean;
  sku?: string | null;
  brand?: string;
  material?: string | null;
  ratingValue?: number;
  reviewCount?: number;
};

export function productSchema(p: ProductSchemaInput) {
  const schema: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.description,
    sku: p.sku ?? undefined,
    image: p.images.map((src) => (src.startsWith("http") ? src : absoluteUrl(src))),
    brand: { "@type": "Brand", name: p.brand ?? site.name },
    material: p.material ?? undefined,
    offers: {
      "@type": "Offer",
      url: absoluteUrl(`/produits/${p.slug}`),
      priceCurrency: p.currency ?? site.currency,
      price: (p.priceCents / 100).toFixed(2),
      availability: p.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/PreOrder",
      itemCondition: "https://schema.org/NewCondition",
      seller: { "@type": "Organization", name: site.name },
    },
  };
  if (p.ratingValue && p.reviewCount) {
    schema.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: p.ratingValue,
      reviewCount: p.reviewCount,
    };
  }
  return schema;
}

type ArticleSchemaInput = {
  title: string;
  description: string;
  slug: string;
  image?: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
};

export function articleSchema(a: ArticleSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    image: a.image ? absoluteUrl(a.image) : undefined,
    datePublished: a.datePublished,
    dateModified: a.dateModified ?? a.datePublished,
    author: { "@type": "Organization", name: a.author ?? site.name },
    publisher: {
      "@type": "Organization",
      name: site.name,
      logo: { "@type": "ImageObject", url: absoluteUrl("/logo-lumocad.png") },
    },
    mainEntityOfPage: absoluteUrl(`/blog/${a.slug}`),
  };
}

export function faqSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
