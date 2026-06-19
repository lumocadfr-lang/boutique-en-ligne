import type { Metadata } from "next";
import { ArrowRight, Leaf, Lightbulb, PenTool, Recycle, ShieldCheck } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Notre histoire & savoir-faire — Luminaires artisanaux en 3D",
  description:
    "Découvrez LumoCAD : un créateur de luminaires artisanaux imprimés en 3D, fabriqués à la main en Bourgogne à partir de matériaux éco-responsables. Design, innovation et engagement écologique.",
  path: "/a-propos",
});

const steps = [
  {
    icon: PenTool,
    title: "Conception 3D",
    text: "Chaque luminaire naît d'un dessin numérique, modélisé avec soin pour guider et sublimer la lumière. Des formes impossibles à mouler de façon traditionnelle.",
  },
  {
    icon: Lightbulb,
    title: "Impression couche par couche",
    text: "La pièce est imprimée en 3D dans notre atelier, en PLA biodégradable, sans moule ni surproduction. Fabriquée uniquement lorsque vous la commandez.",
  },
  {
    icon: PenTool,
    title: "Finition à la main",
    text: "Ponçage, assemblage, montage électrique : chaque détail est repris à la main pour une finition irréprochable et une pièce véritablement unique.",
  },
  {
    icon: ShieldCheck,
    title: "Contrôle & expédition",
    text: "La lumière est testée, la pièce contrôlée, puis emballée avec soin dans des matériaux responsables avant de rejoindre votre intérieur.",
  },
];

const values = [
  {
    icon: Leaf,
    title: "Éco-conception",
    text: "PLA biodégradable d'origine végétale, diffuseurs PETG recyclables, fabrication à la demande : nous réduisons l'empreinte à chaque étape.",
  },
  {
    icon: Recycle,
    title: "Upcycling",
    text: "Nous donnons une seconde vie à des globes en verre chinés, sélectionnés pour leur charme et leur authenticité.",
  },
  {
    icon: ShieldCheck,
    title: "Fabriqué en France",
    text: "Tout est dessiné, imprimé et assemblé dans notre atelier en Bourgogne. Un circuit court, transparent et local.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="border-b border-line bg-cream/40">
        <Container className="grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <Breadcrumbs items={[{ name: "Notre histoire", path: "/a-propos" }]} />
            <p className="eyebrow mt-6 text-brass">La maison LumoCAD</p>
            <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl">
              Une histoire de lumière, de mains et de conscience
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted">
              LumoCAD, c'est la rencontre entre l'innovation de l'impression 3D et la patience
              de l'artisanat. Des luminaires uniques, pensés pour durer et respecter la planète.
            </p>
          </div>
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-card">
              <BrandedPlaceholder category="SUSPENSION" label="L'atelier" />
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Histoire */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow text-brass">Notre histoire</p>
            <h2 className="mt-3 font-display text-3xl text-ink">
              Derrière chaque lampe, une personne et une passion
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="prose-lumo">
              <p>
                LumoCAD est né d'une conviction simple&nbsp;: la technologie peut servir la
                beauté et le respect du vivant. Derrière la marque, un créateur unique, guidé
                par l'amour du design et de l'innovation, qui transforme des idées en objets
                lumineux dessinés avec précision et attention.
              </p>
              <p>
                Dans notre atelier de Bourgogne, l'impression 3D devient un outil d'artisan.
                Elle permet de donner vie à des formes organiques, des plissés et des textures
                impossibles à réaliser autrement, tout en ne produisant que ce qui est commandé.
              </p>
              <p>
                Certaines créations intègrent des globes en verre chinés, sélectionnés un à un.
                Chaque pièce associe ainsi esthétique, qualité et respect de l'environnement&nbsp;:
                une lumière qui a du sens.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Savoir-faire */}
      <section id="savoir-faire" className="scroll-mt-24 bg-ink py-20 text-paper">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-amber">Le savoir-faire</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl">
              De l'esquisse numérique à la lumière chez vous
            </h2>
            <p className="mt-4 text-paper/70">
              Quatre étapes, un fil conducteur&nbsp;: le soin du détail. Voici comment naît
              un luminaire LumoCAD.
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.07}>
                <div className="flex h-full flex-col rounded-2xl border border-paper/10 bg-paper/5 p-7">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-2xl text-amber">0{i + 1}</span>
                    <step.icon size={20} className="text-amber" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-4 font-display text-xl">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-paper/70">{step.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Engagements */}
      <section className="py-20">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow text-brass">Nos engagements</p>
            <h2 className="mt-3 font-display text-3xl text-ink sm:text-4xl">
              Le beau ne devrait jamais coûter à la planète
            </h2>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06}>
                <div className="h-full rounded-2xl border border-line bg-cream/40 p-8">
                  <v.icon size={26} className="text-brass" strokeWidth={1.5} />
                  <h3 className="mt-4 font-display text-xl text-ink">{v.title}</h3>
                  <p className="mt-2 text-muted">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <Container>
          <div className="flex flex-col items-center gap-6 rounded-3xl bg-cream/60 px-8 py-14 text-center">
            <h2 className="font-display text-3xl text-ink sm:text-4xl">
              Prêt à illuminer votre intérieur&nbsp;?
            </h2>
            <p className="max-w-xl text-muted">
              Découvrez nos créations ou imaginons ensemble un luminaire entièrement sur-mesure,
              à vos dimensions et à votre image.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button href="/boutique" size="lg">
                Voir les créations <ArrowRight size={18} />
              </Button>
              <Button href="/sur-mesure" variant="outline" size="lg">
                Projet sur-mesure
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
