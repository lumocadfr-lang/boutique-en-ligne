import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqSchema, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ — Questions fréquentes",
  description:
    "Délais de fabrication, matériaux, livraison, entretien, sur-mesure… Retrouvez les réponses à toutes vos questions sur les luminaires LumoCAD.",
  path: "/faq",
});

const groups = [
  {
    title: "Fabrication & matériaux",
    items: [
      {
        question: "Comment sont fabriqués vos luminaires ?",
        answer:
          "Chaque luminaire est modélisé puis imprimé en 3D dans notre atelier en Bourgogne, en PLA biodégradable. La pièce est ensuite poncée, assemblée et contrôlée à la main avant expédition.",
      },
      {
        question: "Les matériaux sont-ils écologiques ?",
        answer:
          "Oui. Nous imprimons en PLA d'origine végétale, biodégradable, et utilisons des diffuseurs en PETG recyclable. La fabrication à la demande évite toute surproduction.",
      },
      {
        question: "Vos luminaires sont-ils solides ?",
        answer:
          "Le PLA imprimé est rigide et durable pour un usage intérieur normal. Évitez simplement une exposition prolongée à de fortes chaleurs ou à la lumière directe du soleil.",
      },
    ],
  },
  {
    title: "Commande & délais",
    items: [
      {
        question: "Quels sont les délais de fabrication ?",
        answer:
          "Nos pièces étant imprimées à la commande, comptez 3 à 12 jours ouvrés de fabrication selon la complexité, puis 48 à 72 h de livraison.",
      },
      {
        question: "Puis-je commander en précommande ?",
        answer:
          "Oui, certaines nouveautés sont proposées en précommande avec un tarif préférentiel. Le délai de fabrication s'applique à partir de la clôture de la précommande.",
      },
    ],
  },
  {
    title: "Livraison & retours",
    items: [
      {
        question: "Où livrez-vous ?",
        answer:
          "Nous livrons en France et dans toute l'Europe (point relais ou domicile). La livraison est offerte en France dès 120 € d'achat.",
      },
      {
        question: "Quelle est votre politique de retour ?",
        answer:
          "Vous disposez de 14 jours pour changer d'avis sur un article standard. Les créations entièrement sur-mesure ne sont pas reprises, sauf défaut de fabrication.",
      },
    ],
  },
  {
    title: "Installation & entretien",
    items: [
      {
        question: "Quelle ampoule utiliser ?",
        answer:
          "La plupart de nos modèles utilisent un culot E27 ou E14. Nous recommandons une LED blanc chaud (2200–2700 K), idéalement dimmable, pour une lumière douce.",
      },
      {
        question: "Comment entretenir mon luminaire ?",
        answer:
          "Un simple chiffon doux et sec suffit. Évitez les produits abrasifs et l'eau sur les parties électriques.",
      },
      {
        question: "Proposez-vous du sur-mesure ?",
        answer:
          "Oui ! La plupart des modèles sont adaptables (dimensions, hauteur, finition) et nous réalisons des projets entièrement personnalisés. Rendez-vous sur la page Sur-mesure.",
      },
    ],
  },
];

const allItems = groups.flatMap((g) => g.items);

export default function FaqPage() {
  return (
    <Container className="py-12 lg:py-16">
      <JsonLd data={faqSchema(allItems)} />
      <Breadcrumbs items={[{ name: "FAQ", path: "/faq" }]} />

      <header className="mt-6 max-w-2xl">
        <p className="eyebrow text-brass">Aide</p>
        <h1 className="mt-2 font-display text-4xl text-ink sm:text-5xl">Questions fréquentes</h1>
        <p className="mt-4 text-muted">
          Tout ce qu'il faut savoir avant et après votre commande. Une autre question ?{" "}
          <a href="/contact" className="link-underline text-ink">
            Écrivez-nous
          </a>
          .
        </p>
      </header>

      <div className="mt-12 space-y-12">
        {groups.map((group) => (
          <section key={group.title}>
            <h2 className="font-display text-2xl text-ink">{group.title}</h2>
            <div className="mt-4 divide-y divide-line border-y border-line">
              {group.items.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-ink">
                    {item.question}
                    <span className="text-brass transition-transform duration-300 group-open:rotate-45">
                      +
                    </span>
                  </summary>
                  <p className="mt-3 max-w-2xl text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}
      </div>
    </Container>
  );
}
