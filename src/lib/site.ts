/**
 * Configuration centrale de LumoCAD.
 * Single source of truth pour le SEO, la navigation, les coordonnées et les réseaux.
 */

export const site = {
  name: "LumoCAD",
  legalName: "LumoCAD",
  // Slogan principal (issu de la marque existante)
  tagline: "Luminaires artisanaux, design & durables",
  shortDescription:
    "Luminaires artisanaux imprimés en 3D, conçus et fabriqués en France à partir de matériaux éco-responsables.",
  description:
    "LumoCAD crée des luminaires d'exception imprimés en 3D : appliques, suspensions et lampes à poser au design singulier, fabriqués à la main en Bourgogne à partir de PLA biodégradable et de matériaux chinés. Éco-conception, sur-mesure et lumière chaleureuse.",
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://lumocad.fr",
  locale: "fr_FR",
  lang: "fr",
  currency: "EUR",

  // Coordonnées
  email: "contact@lumocad.fr",
  // À confirmer : LumoCAD est un atelier basé en Bourgogne (France).
  region: "Bourgogne",
  country: "France",
  countryCode: "FR",

  // Réseaux sociaux — à confirmer / compléter
  social: {
    instagram: "https://www.instagram.com/lumocad",
    facebook: "https://www.facebook.com/lumocad",
    pinterest: "https://www.pinterest.com/lumocad",
    tiktok: "",
  },

  // Réassurance (affichée dans le header / footer / fiches produit)
  trust: [
    { label: "Fabriqué en France", detail: "Atelier en Bourgogne" },
    { label: "Éco-conçu", detail: "PLA biodégradable & upcycling" },
    { label: "Pièces uniques", detail: "Imprimé 3D à la commande" },
    { label: "Sur-mesure", detail: "Dimensions adaptables" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
};

/** Navigation principale */
export const mainNav: NavItem[] = [
  { label: "Boutique", href: "/boutique", description: "Toutes nos créations lumineuses" },
  { label: "Suspensions", href: "/collections/suspensions", description: "Pièces sculpturales à suspendre" },
  { label: "Appliques", href: "/collections/appliques", description: "Lumière murale d'ambiance" },
  { label: "Lampes à poser", href: "/collections/lampes-a-poser", description: "Pour vos tables et bureaux" },
  { label: "Sur-mesure", href: "/sur-mesure", description: "Votre luminaire, vos dimensions" },
  { label: "Notre savoir-faire", href: "/a-propos", description: "L'histoire et l'atelier LumoCAD" },
  { label: "Journal", href: "/blog", description: "Inspiration déco & éclairage" },
];

/** Liens de pied de page regroupés */
export const footerNav = {
  boutique: {
    title: "Boutique",
    links: [
      { label: "Toutes les créations", href: "/boutique" },
      { label: "Suspensions", href: "/collections/suspensions" },
      { label: "Appliques murales", href: "/collections/appliques" },
      { label: "Lampes à poser", href: "/collections/lampes-a-poser" },
      { label: "Sur-mesure", href: "/sur-mesure" },
    ],
  },
  maison: {
    title: "La maison",
    links: [
      { label: "Notre histoire", href: "/a-propos" },
      { label: "Le savoir-faire", href: "/a-propos#savoir-faire" },
      { label: "Journal", href: "/blog" },
      { label: "Nous contacter", href: "/contact" },
    ],
  },
  aide: {
    title: "Aide & infos",
    links: [
      { label: "Livraison & délais", href: "/livraison" },
      { label: "FAQ", href: "/faq" },
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "CGV", href: "/cgv" },
      { label: "Confidentialité", href: "/confidentialite" },
    ],
  },
};

/** Catégories du catalogue (clé interne ↔ libellé ↔ slug de collection). */
export const categories = [
  { key: "SUSPENSION", label: "Suspensions", slug: "suspensions" },
  { key: "APPLIQUE", label: "Appliques", slug: "appliques" },
  { key: "LAMPE_A_POSER", label: "Lampes à poser", slug: "lampes-a-poser" },
  { key: "LAMPADAIRE", label: "Lampadaires", slug: "lampadaires" },
  { key: "SUR_MESURE", label: "Sur-mesure", slug: "sur-mesure" },
] as const;

export type CategoryKey = (typeof categories)[number]["key"];

export function categoryLabel(key: string): string {
  return categories.find((c) => c.key === key)?.label ?? key;
}

/** Retrouve la catégorie interne (clé) à partir du slug d'une collection. */
export function categoryFromCollectionSlug(slug: string): string | undefined {
  return categories.find((c) => c.slug === slug)?.key;
}
