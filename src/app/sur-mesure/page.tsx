import type { Metadata } from "next";
import { MessagesSquare, PencilRuler, Printer, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Luminaire sur-mesure — Votre lumière, vos dimensions",
  description:
    "Imaginez un luminaire unique à vos dimensions. LumoCAD conçoit et imprime en 3D des lampes sur-mesure, éco-conçues et fabriquées en France. Demandez votre devis.",
  path: "/sur-mesure",
});

const steps = [
  {
    icon: MessagesSquare,
    title: "On échange",
    text: "Décrivez-nous votre projet, votre espace et vos envies. Inspiration, contraintes, dimensions : tout compte.",
  },
  {
    icon: PencilRuler,
    title: "On dessine",
    text: "Nous concevons une modélisation 3D sur-mesure et vous proposons un devis transparent, sans engagement.",
  },
  {
    icon: Printer,
    title: "On imprime",
    text: "Une fois validé, votre luminaire est imprimé en 3D et fini à la main dans notre atelier de Bourgogne.",
  },
  {
    icon: Sparkles,
    title: "On illumine",
    text: "Vous recevez une pièce unique, à vos dimensions, prête à transformer votre intérieur.",
  },
];

export default function SurMesurePage() {
  return (
    <>
      <section className="border-b border-line bg-cream/40">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <Breadcrumbs items={[{ name: "Sur-mesure", path: "/sur-mesure" }]} />
            <p className="eyebrow mt-6 text-brass">Sur-mesure</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Votre luminaire, à votre image
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              Une hauteur sous plafond particulière, une teinte précise, une forme dont vous
              rêvez&nbsp;? La plupart de nos modèles sont adaptables, et nous créons aussi des
              pièces entièrement personnalisées.
            </p>
          </div>
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
              <BrandedPlaceholder category="LAMPADAIRE" label="Création sur-mesure" />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-brass">Comment ça marche</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Un projet en quatre étapes
            </h2>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <div className="h-full rounded-2xl border border-line bg-paper p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-brass">0{i + 1}</span>
                    <step.icon size={20} className="text-brass" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-display text-xl text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="pb-24">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
          <div>
            <h2 className="font-display text-3xl text-ink sm:text-4xl">Demandez votre devis</h2>
            <p className="mt-4 text-muted">
              Parlez-nous de votre projet&nbsp;: nous revenons vers vous sous 24 à 48&nbsp;h avec
              des premières pistes et une estimation. Sans engagement.
            </p>
          </div>
          <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft sm:p-9">
            <ContactForm defaultSubject="Projet sur-mesure" />
          </div>
        </Container>
      </section>
    </>
  );
}
