import type { Metadata } from "next";
import { InfoShell } from "@/components/ui/InfoShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Livraison & délais",
  description:
    "Délais de fabrication et de livraison, zones desservies, frais de port et suivi : tout savoir sur la livraison de votre luminaire LumoCAD.",
  path: "/livraison",
});

export default function LivraisonPage() {
  return (
    <InfoShell
      title="Livraison & délais"
      intro="Chaque luminaire étant fabriqué à la commande, voici comment se déroule l'acheminement de votre pièce."
      crumb={{ name: "Livraison & délais", path: "/livraison" }}
    >
      <h2>Délais de fabrication</h2>
      <p>
        Nos luminaires sont imprimés en 3D et finis à la main, uniquement après votre commande.
        Comptez <strong>3 à 12 jours ouvrés</strong> de fabrication selon la complexité de la
        pièce, auxquels s'ajoute le délai d'acheminement.
      </p>

      <h2>Délais et frais de livraison</h2>
      <ul>
        <li>
          <strong>France métropolitaine :</strong> 48 à 72 h après expédition (point relais ou
          domicile). <strong>Livraison offerte dès 120 €</strong> d'achat, sinon 6,90 €.
        </li>
        <li>
          <strong>Belgique, Luxembourg, Suisse :</strong> 3 à 6 jours ouvrés. Frais calculés au
          paiement.
        </li>
        <li>
          <strong>Reste de l'Europe :</strong> 4 à 8 jours ouvrés. Frais calculés au paiement.
        </li>
      </ul>

      <h2>Suivi de commande</h2>
      <p>
        Dès l'expédition, vous recevez un e-mail avec un numéro de suivi. Vous pouvez à tout
        moment nous écrire à <a href="mailto:contact@lumocad.fr">contact@lumocad.fr</a> pour
        connaître l'avancement de votre pièce.
      </p>

      <h2>Emballage responsable</h2>
      <p>
        Vos luminaires voyagent protégés dans des matériaux d'emballage recyclés et recyclables,
        à l'image de notre démarche éco-responsable.
      </p>

      <h2>Retours</h2>
      <p>
        Vous disposez de <strong>14 jours</strong> pour changer d'avis sur un article standard,
        retourné dans son état et son emballage d'origine. Les créations entièrement sur-mesure
        ne sont pas reprises, sauf défaut de fabrication. Voir nos{" "}
        <a href="/cgv">conditions générales de vente</a>.
      </p>
    </InfoShell>
  );
}
