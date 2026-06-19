import type { Metadata } from "next";
import { InfoShell } from "@/components/ui/InfoShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de LumoCAD : quelles données nous collectons, pourquoi, et comment exercer vos droits (RGPD).",
  path: "/confidentialite",
  noindex: true,
});

export default function ConfidentialitePage() {
  return (
    <InfoShell
      title="Politique de confidentialité"
      crumb={{ name: "Confidentialité", path: "/confidentialite" }}
      updated="juin 2026"
    >
      <p className="rounded-lg bg-cream/60 p-4 text-sm">
        ⚠️ Modèle à adapter à vos outils réels (paiement, e-mailing, analytics) avant mise en ligne.
      </p>

      <h2>Responsable du traitement</h2>
      <p>
        LumoCAD est responsable du traitement des données collectées sur ce site. Pour toute
        question : <a href="mailto:contact@lumocad.fr">contact@lumocad.fr</a>.
      </p>

      <h2>Données collectées</h2>
      <ul>
        <li>Données de commande : nom, e-mail, adresse de livraison, téléphone.</li>
        <li>Données de paiement : traitées directement par Stripe (nous ne stockons aucune donnée bancaire).</li>
        <li>Données de navigation : cookies de mesure d'audience (si activés).</li>
        <li>E-mail d'inscription à la newsletter (avec votre consentement).</li>
      </ul>

      <h2>Finalités</h2>
      <p>
        Vos données servent à traiter et expédier vos commandes, à assurer le service client, et,
        avec votre accord, à vous envoyer nos actualités. Elles ne sont jamais revendues.
      </p>

      <h2>Durée de conservation</h2>
      <p>
        Les données de commande sont conservées le temps requis par les obligations légales
        (comptables et fiscales). Les données de prospection sont conservées jusqu'à votre
        désinscription.
      </p>

      <h2>Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, d'effacement,
        de portabilité et d'opposition. Pour les exercer, écrivez-nous à{" "}
        <a href="mailto:contact@lumocad.fr">contact@lumocad.fr</a>. Vous pouvez également
        introduire une réclamation auprès de la CNIL.
      </p>

      <h2>Cookies</h2>
      <p>
        Le site peut utiliser des cookies de fonctionnement et, sous réserve de votre
        consentement, de mesure d'audience. Vous pouvez configurer votre navigateur pour les
        refuser.
      </p>
    </InfoShell>
  );
}
