# LumoCAD — Boutique e-commerce premium

Site e-commerce **autonome** (hors Shopify) pour **LumoCAD**, marque de luminaires
artisanaux imprimés en 3D et fabriqués en France. Panier, paiement, stocks et
commandes sont gérés par le site lui-même. Shopify n'est utilisé que comme **source
d'import** initiale du catalogue.

## Stack technique

| Brique | Choix | Rôle |
|--------|-------|------|
| Framework | **Next.js 16** (App Router, TypeScript) | SSR/SSG/ISR, SEO, perfs |
| Styles | **Tailwind CSS v4** | Design system premium sur-mesure |
| Base de données | **Prisma 6** (SQLite en dev → PostgreSQL en prod) | Catalogue, stocks, commandes |
| Paiement | **Stripe Checkout** | Cartes, SEPA, livraison |
| Contenu | **MDX** (`next-mdx-remote`) | Blog optimisé SEO |
| Animations | **Framer Motion** | Apparitions légères (respect `prefers-reduced-motion`) |
| Icônes | **lucide-react** | Pictogrammes SVG |

## Démarrage rapide

```bash
# 1. Installer les dépendances
npm install

# 2. Configurer l'environnement
cp .env.example .env       # puis renseigner les valeurs

# 3. Créer et peupler la base de données (SQLite)
npm run db:push
npm run db:seed

# 4. Lancer le serveur de développement
npm run dev                # http://localhost:3000
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production (`prisma generate` + `next build`) |
| `npm run start` | Serveur de production |
| `npm run lint` | ESLint |
| `npm run db:push` | Applique le schéma Prisma à la base |
| `npm run db:seed` | Insère le catalogue de démonstration (DOMEA, HYLDA…) |
| `npm run db:studio` | Interface visuelle Prisma Studio |
| `npm run import:shopify` | Importe le vrai catalogue depuis Shopify |

## Import du catalogue Shopify (one-shot)

Pour remplacer les données de démonstration par votre vrai catalogue :

1. **Shopify** → Paramètres → *Applications et canaux de vente* → *Développer des apps*
   → *Créer une app* → configurer l'**API Storefront** (cocher au minimum
   `unauthenticated_read_product_listings`) → *Installer* → copier le
   **Storefront API access token**.
2. Renseigner `.env` :
   ```env
   SHOPIFY_STORE_DOMAIN="lumocad.myshopify.com"
   SHOPIFY_STOREFRONT_TOKEN="votre_token"
   ```
3. Lancer l'import :
   ```bash
   npm run import:shopify            # met à jour / complète le catalogue
   npm run import:shopify -- --fresh # vide d'abord le catalogue de démo
   ```

Les images sont servies depuis le CDN Shopify (déjà autorisé dans `next.config.ts`).
Le réseau doit autoriser l'accès à `*.myshopify.com`.

## Paiement (Stripe)

1. Créer un compte [Stripe](https://dashboard.stripe.com) et récupérer les clés.
2. Renseigner `.env` :
   ```env
   STRIPE_SECRET_KEY="sk_live_..."
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
   STRIPE_WEBHOOK_SECRET="whsec_..."
   ```
3. Configurer un webhook vers `/api/webhooks/stripe` (événement
   `checkout.session.completed`) pour marquer les commandes payées et décrémenter
   le stock.

Tant que `STRIPE_SECRET_KEY` est vide, le tunnel affiche un message invitant à
contacter l'atelier (le reste du site reste pleinement fonctionnel).

## Déploiement (recommandé : Vercel)

1. Passer Prisma sur PostgreSQL : dans `prisma/schema.prisma`, mettre
   `provider = "postgresql"` et fournir un `DATABASE_URL` Postgres (Neon, Supabase…).
2. `npm run db:push` puis `npm run db:seed` (ou `npm run import:shopify`).
3. Déployer sur Vercel, renseigner les variables d'environnement, configurer le
   webhook Stripe, et pointer le domaine `lumocad.fr`.

## Architecture

```
src/
├── app/                    # Routes (App Router)
│   ├── boutique/           # Catalogue + filtres
│   ├── collections/[slug]/ # Pages catégories
│   ├── produits/[slug]/    # Fiches produit
│   ├── blog/               # Journal (MDX)
│   ├── a-propos, sur-mesure, contact, panier, faq, livraison…
│   ├── api/                # checkout, webhooks/stripe, contact, newsletter
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx
│   └── layout.tsx, page.tsx (accueil)
├── components/             # ui, layout, product, cart, shop, seo, contact
├── content/blog/           # Articles MDX
└── lib/                    # prisma, products, blog, seo, stripe, site, utils
prisma/                     # schema.prisma + seed.ts
scripts/                    # import-shopify.ts
```

## SEO

- Métadonnées + `canonical` par page, `title` template global.
- Données structurées JSON-LD : `Organization`, `WebSite`, `Product`, `Article`,
  `FAQPage`, `BreadcrumbList`.
- `sitemap.xml` et `robots.txt` dynamiques, fil d'Ariane, URLs propres en français.
- Images optimisées (AVIF/WebP via `next/image`), Core Web Vitals soignés.

## À compléter avant mise en ligne

- [ ] Importer le vrai catalogue (`npm run import:shopify`).
- [ ] Renseigner les mentions légales / CGV (champs `[À COMPLÉTER]`).
- [ ] Configurer Stripe (clés + webhook).
- [ ] Brancher un service e-mail pour `contact` et `newsletter`.
- [ ] Vérifier les liens réseaux sociaux dans `src/lib/site.ts`.
