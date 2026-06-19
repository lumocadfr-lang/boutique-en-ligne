import type { Metadata } from "next";
import { Mail, MapPin, Clock } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/seo/Breadcrumbs";
import { ContactForm } from "@/components/contact/ContactForm";
import { site } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Contact — Parlons de votre projet lumineux",
  description:
    "Une question sur nos luminaires, une commande sur-mesure ou un suivi de commande ? Contactez l'atelier LumoCAD. Réponse sous 24 à 48 h.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />

      <div className="mt-8 grid gap-12 lg:grid-cols-[1fr_1.3fr] lg:gap-20">
        <div>
          <p className="eyebrow text-brass">Contact</p>
          <h1 className="mt-3 font-display text-4xl text-ink sm:text-5xl">
            Parlons de votre projet
          </h1>
          <p className="mt-4 text-muted">
            Une question, une envie de sur-mesure, un conseil déco&nbsp;? Écrivez-nous,
            nous serons ravis d'échanger avec vous.
          </p>

          <ul className="mt-10 space-y-6">
            <li className="flex items-start gap-4">
              <Mail size={22} className="mt-0.5 text-brass" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-ink">E-mail</p>
                <a href={`mailto:${site.email}`} className="link-underline text-muted">
                  {site.email}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <MapPin size={22} className="mt-0.5 text-brass" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-ink">Atelier</p>
                <p className="text-muted">{site.region}, {site.country}</p>
              </div>
            </li>
            <li className="flex items-start gap-4">
              <Clock size={22} className="mt-0.5 text-brass" strokeWidth={1.5} />
              <div>
                <p className="font-medium text-ink">Délais</p>
                <p className="text-muted">Réponse sous 24 à 48 h ouvrées</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="rounded-2xl border border-line bg-paper p-7 shadow-soft sm:p-9">
          <ContactForm />
        </div>
      </div>
    </Container>
  );
}
