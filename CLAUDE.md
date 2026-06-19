# LumoCAD — notes pour Claude

Boutique e-commerce **autonome** (Next.js 16 + Prisma + Stripe), hors Shopify.
Marque : luminaires artisanaux imprimés en 3D, fabriqués en France (Bourgogne),
matériaux éco-responsables (PLA biodégradable, PETG, verre upcyclé).

## Commandes

- `npm run dev` · `npm run build` · `npm run lint`
- `npm run db:push` (schéma) · `npm run db:seed` (catalogue démo) · `npm run db:studio`
- `npm run import:shopify [-- --fresh]` (import du vrai catalogue via Storefront API)
- Toujours lancer `npx tsc --noEmit` puis `npm run build` après des changements notables.

## Conventions

- **Langue de l'UI : français.** Textes, slugs et libellés en français.
- Design system dans `src/app/globals.css` (`@theme` Tailwind v4) : couleurs `paper`,
  `cream`, `ink`, `brass`, `amber` ; polices `font-display` (Playfair) / `font-sans` (Inter).
- Prix stockés en **centimes** (`priceCents`). Formatage via `formatPrice` (`lib/utils`).
- Données via `src/lib/products.ts` (Prisma). Accès produits/collections/avis centralisé.
- SEO : utiliser `pageMetadata()` + helpers Schema.org de `src/lib/seo.ts` ; fil d'Ariane
  via `components/seo/Breadcrumbs`.
- Visuels : `components/ui/Media` (photo réelle `next/image` sinon `BrandedPlaceholder`).
  Les images de seed valent `"placeholder"` tant que l'import Shopify n'a pas eu lieu.
- Schéma Prisma volontairement **portable** (pas d'enums natifs / tableaux scalaires) pour
  migrer SQLite → PostgreSQL sans friction.

## Pièges connus

- `lucide-react` v1 n'exporte plus les icônes de marque (Instagram/Facebook) → SVG inline.
- Prisma 7 a changé sa config (adapters) ; le projet est volontairement sur **Prisma 6**.
