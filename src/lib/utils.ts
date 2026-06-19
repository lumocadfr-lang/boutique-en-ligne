import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Fusion de classes Tailwind sans conflits. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Formate un prix en centimes vers une devise lisible (par défaut EUR / fr-FR). */
export function formatPrice(
  cents: number,
  currency = "EUR",
  locale = "fr-FR",
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}

/** Construit une URL absolue à partir du domaine du site. */
export function absoluteUrl(path = ""): string {
  const base =
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://lumocad.fr";
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Transforme un texte en slug URL-friendly. */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Calcule le pourcentage de réduction entre deux prix. */
export function discountPercent(
  priceCents: number,
  compareAtCents?: number | null,
): number | null {
  if (!compareAtCents || compareAtCents <= priceCents) return null;
  return Math.round(((compareAtCents - priceCents) / compareAtCents) * 100);
}

/** Date au format français lisible. */
export function formatDate(date: Date | string, locale = "fr-FR"): string {
  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}
