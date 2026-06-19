import Link from "next/link";
import {
  ArrowRight,
  Leaf,
  MapPin,
  Ruler,
  Sparkles,
  Star,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema } from "@/lib/seo";
import { categoryFromCollectionSlug } from "@/lib/site";
import {
  getCollections,
  getFeaturedProducts,
  getTestimonials,
} from "@/lib/products";

const homeFaqs = [
  {
    question: "Vos luminaires sont-ils vraiment fabriqués en France ?",
    answer:
      "Oui, à 100 %. Chaque pièce est dessinée et imprimée en 3D dans notre atelier en Bourgogne, puis assemblée et contrôlée à la main avant expédition.",
  },
  {
    question: "Avec quels matériaux travaillez-vous ?",
    answer:
      "Nous imprimons principalement en PLA biodégradable d'origine végétale et utilisons des diffuseurs en PETG translucide. Nous donnons aussi une seconde vie à des globes en verre chinés.",
  },
  {
    question: "Quels sont les délais de fabrication et de livraison ?",
    answer:
      "Nos pièces étant imprimées à la commande, comptez 3 à 12 jours ouvrés de fabrication, puis 48 à 72 h de livraison en France (point relais ou domicile).",
  },
  {
    question: "Puis-je commander un luminaire sur-mesure ?",
    answer:
      "Bien sûr. La plupart de nos modèles sont adaptables (dimensions, hauteur, finition) et nous réalisons aussi des projets entièrement personnalisés. Rendez-vous sur la page Sur-mesure.",
  },
];

export default async function HomePage() {
  const [featured, collections, testimonials] = await Promise.all([
    getFeaturedProducts(4),
    getCollections(),
    getTestimonials(3),
  ]);

  return (
    <>
      <JsonLd data={faqSchema(homeFaqs)} />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div className="animate-fade-up">
            <p className="eyebrow mb-5 inline-flex items-center gap-2 text-brass">
              <Sparkles size={15} /> Luminaires imprimés en 3D · Made in France
            </p>
            <h1 className="font-display text-4xl leading-[1.08] text-ink sm:text-5xl lg:text-6xl">
              La lumière,
              <br />
              <span className="italic text-brass-dark">façonnée à la main.</span>
            </h1>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-muted">
              LumoCAD imagine des luminaires d'exception, imprimés en 3D et
              éco-conçus dans son atelier en Bourgogne. Des pièces uniques qui
              transforment votre intérieur en jeu de lumière.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <Button href="/boutique" size="lg">
                Découvrir les créations <ArrowRight size={18} />
              </Button>
              <Button href="/a-propos" variant="outline" size="lg">
                Notre savoir-faire
              </Button>
            </div>
            <div className="mt-8 flex items-center gap-2 text-sm text-muted">
              <div className="flex text-brass">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span>Plus de 200 intérieurs illuminés en France</span>
            </div>
          </div>

          <Reveal className="relative" delay={0.1}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card sm:aspect-square lg:aspect-[4/5]">
              <BrandedPlaceholder category="SUSPENSION" label="Suspension DOMEA" />
            </div>
            <div className="absolute -bottom-5 -left-5 hidden rounded-xl bg-paper p-4 shadow-card sm:block">
              <p className="font-display text-2xl text-ink">3D</p>
              <p className="text-xs text-muted">Imprimé & éco-conçu</p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* ── Réassurance ──────────────────────────────────────────────────── */}
      <section className="border-y border-line bg-cream/60">
        <Container className="grid grid-cols-2 gap-6 py-8 md:grid-cols-4">
          {[
            { icon: MapPin, label: "Fabriqué en France", detail: "Atelier en Bourgogne" },
            { icon: Leaf, label: "Éco-conçu", detail: "PLA biodégradable" },
            { icon: Sparkles, label: "Pièces uniques", detail: "Imprimées à la commande" },
            { icon: Ruler, label: "Sur-mesure", detail: "Dimensions adaptables" },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon size={22} className="mt-0.5 shrink-0 text-brass" strokeWidth={1.5} />
              <div>
                <p className="text-sm font-medium text-ink">{item.label}</p>
                <p className="text-xs text-muted">{item.detail}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>

      {/* ── Collections ──────────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <div className="flex items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Nos familles lumineuses"
              title="Explorez les collections"
              intro="Suspensions sculpturales, appliques graphiques, lampes à poser… chaque famille raconte une histoire de lumière."
            />
            <Link
              href="/boutique"
              className="hidden shrink-0 items-center gap-2 text-sm font-medium text-ink hover:text-brass-dark sm:inline-flex"
            >
              Tout voir <ArrowRight size={16} />
            </Link>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {collections.map((c, i) => (
              <Reveal key={c.id} delay={i * 0.05}>
                <Link
                  href={`/collections/${c.slug}`}
                  className="group block overflow-hidden rounded-lg"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-cream">
                    <div className="h-full w-full transition-transform duration-700 group-hover:scale-105">
                      <BrandedPlaceholder
                        category={categoryFromCollectionSlug(c.slug)}
                        seed={i}
                      />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-ink/0 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-5 text-paper">
                      <h3 className="font-display text-xl">{c.title}</h3>
                      <p className="mt-0.5 text-sm text-paper/80">
                        {c._count.products} création{c._count.products > 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Savoir-faire ─────────────────────────────────────────────────── */}
      <section className="bg-ink py-20 text-paper">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative order-2 lg:order-1">
            <div className="relative aspect-[5/4] overflow-hidden rounded-2xl">
              <BrandedPlaceholder category="LAMPE_A_POSER" label="Atelier LumoCAD" />
            </div>
          </Reveal>
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-4 text-amber">Le savoir-faire</p>
            <h2 className="font-display text-3xl leading-tight sm:text-4xl">
              Une personne, une passion, des milliers de couches de lumière
            </h2>
            <p className="mt-5 leading-relaxed text-paper/75">
              Derrière chaque LumoCAD se cache un créateur unique, guidé par l'amour
              du design et de l'innovation. De l'esquisse numérique à l'impression 3D,
              chaque pièce est façonnée couche après couche, puis finie et contrôlée
              à la main dans notre atelier de Bourgogne.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                "Conception 3D sur-mesure, pensée pour la lumière",
                "Impression en PLA biodégradable, sans surproduction",
                "Finition et assemblage artisanaux, pièce par pièce",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-paper/90">
                  <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-amber" />
                  {line}
                </li>
              ))}
            </ul>
            <div className="mt-9">
              <Button href="/a-propos" variant="light" size="lg">
                Découvrir l'atelier <ArrowRight size={18} />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* ── Produits phares ──────────────────────────────────────────────── */}
      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Coups de cœur"
            title="Les créations du moment"
            intro="Une sélection de pièces emblématiques, prêtes à illuminer votre intérieur."
            align="center"
            className="mx-auto"
          />
          <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {featured.map((p, i) => (
              <Reveal key={p.id} delay={i * 0.05}>
                <ProductCard product={p} index={i} priority={i < 2} />
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/boutique" variant="outline" size="lg">
              Voir toute la boutique <ArrowRight size={18} />
            </Button>
          </div>
        </Container>
      </section>

      {/* ── Témoignages ──────────────────────────────────────────────────── */}
      {testimonials.length > 0 && (
        <section className="bg-cream/60 py-20">
          <Container>
            <SectionHeading
              eyebrow="Elles & ils nous font confiance"
              title="La parole à nos clients"
              align="center"
              className="mx-auto"
            />
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {testimonials.map((t, i) => (
                <Reveal key={t.id} delay={i * 0.05}>
                  <figure className="flex h-full flex-col rounded-xl border border-line bg-paper p-7 shadow-soft">
                    <div className="flex text-brass">
                      {Array.from({ length: t.rating }).map((_, s) => (
                        <Star key={s} size={16} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    {t.title && (
                      <figcaption className="mt-4 font-display text-lg text-ink">
                        {t.title}
                      </figcaption>
                    )}
                    <blockquote className="mt-2 flex-1 text-muted">“{t.body}”</blockquote>
                    <p className="mt-5 text-sm font-medium text-ink">
                      {t.author}
                      {t.location && (
                        <span className="font-normal text-muted"> · {t.location}</span>
                      )}
                    </p>
                  </figure>
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ── FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Questions fréquentes"
            title="Tout ce qu'il faut savoir"
            intro="Une question avant de commander ? Voici l'essentiel. Et n'hésitez pas à nous écrire."
          />
          <div className="divide-y divide-line border-t border-line">
            {homeFaqs.map((f) => (
              <details key={f.question} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display text-lg text-ink">
                  {f.question}
                  <span className="text-brass transition-transform duration-300 group-open:rotate-45">
                    <Sparkles size={18} />
                  </span>
                </summary>
                <p className="mt-3 max-w-2xl text-muted">{f.answer}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="pb-24">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-ink px-8 py-16 text-center text-paper sm:px-16">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <BrandedPlaceholder category="SUSPENSION" />
            </div>
            <div className="relative mx-auto max-w-2xl">
              <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                Offrez à votre intérieur une lumière unique
              </h2>
              <p className="mt-4 text-paper/75">
                Chaque luminaire LumoCAD est fabriqué à la commande, rien que pour vous.
                Découvrez nos créations ou imaginons ensemble votre pièce sur-mesure.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                <Button href="/boutique" variant="light" size="lg">
                  Explorer la boutique
                </Button>
                <Button
                  href="/sur-mesure"
                  size="lg"
                  className="border border-paper/30 bg-transparent text-paper hover:bg-paper hover:text-ink"
                >
                  Projet sur-mesure
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
