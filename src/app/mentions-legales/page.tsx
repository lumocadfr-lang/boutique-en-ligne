import type { Metadata } from "next";
import { InfoShell } from "@/components/ui/InfoShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site LumoCAD : éditeur, hébergeur et propriété intellectuelle.",
  path: "/mentions-legales",
  noindex: true,
});

export default function MentionsLegalesPage() {
  return (
    <InfoShell
      title="Mentions légales"
      crumb={{ name: "Mentions légales", path: "/mentions-legales" }}
    >
      <p className="rounded-lg bg-cream/60 p-4 text-sm">
        ⚠️ Modèle à compléter avec vos informations légales définitives (raison sociale, SIRET,
        adresse, hébergeur) avant la mise en ligne.
      </p>

      <h2>Éditeur du site</h2>
      <p>
        Le site <strong>lumocad.fr</strong> est édité par LumoCAD.
        <br />
        Raison sociale : <em>[À COMPLÉTER]</em>
        <br />
        Forme juridique &amp; capital : <em>[À COMPLÉTER]</em>
        <br />
        Siège social : <em>[Adresse — Bourgogne, France]</em>
        <br />
        SIRET / RCS : <em>[À COMPLÉTER]</em>
        <br />
        TVA intracommunautaire : <em>[À COMPLÉTER]</em>
        <br />
        E-mail : <a href="mailto:contact@lumocad.fr">contact@lumocad.fr</a>
        <br />
        Directeur de la publication : <em>[À COMPLÉTER]</em>
      </p>

      <h2>Hébergeur</h2>
      <p>
        Le site est hébergé par <em>[Nom de l'hébergeur, ex. Vercel Inc.]</em>
        <br />
        Adresse : <em>[Adresse de l'hébergeur]</em>
      </p>

      <h2>Propriété intellectuelle</h2>
      <p>
        L'ensemble des contenus présents sur ce site (textes, visuels, créations, logos,
        modèles 3D) est la propriété exclusive de LumoCAD, sauf mention contraire. Toute
        reproduction, même partielle, est interdite sans autorisation écrite préalable.
      </p>

      <h2>Données personnelles</h2>
      <p>
        Le traitement de vos données est détaillé dans notre{" "}
        <a href="/confidentialite">politique de confidentialité</a>.
      </p>
    </InfoShell>
  );
}
