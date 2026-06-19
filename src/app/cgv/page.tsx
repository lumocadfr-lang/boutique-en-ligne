import type { Metadata } from "next";
import { InfoShell } from "@/components/ui/InfoShell";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Conditions générales de vente",
  description: "Conditions générales de vente des luminaires LumoCAD : commande, prix, paiement, livraison, rétractation et garanties.",
  path: "/cgv",
  noindex: true,
});

export default function CgvPage() {
  return (
    <InfoShell
      title="Conditions générales de vente"
      crumb={{ name: "CGV", path: "/cgv" }}
      updated="juin 2026"
    >
      <p className="rounded-lg bg-cream/60 p-4 text-sm">
        ⚠️ Modèle de CGV à faire valider par un professionnel du droit et à compléter avec vos
        informations légales avant la mise en ligne.
      </p>

      <h2>Article 1 — Objet</h2>
      <p>
        Les présentes conditions régissent les ventes de luminaires réalisées par LumoCAD via le
        site lumocad.fr. Toute commande implique l'acceptation pleine et entière des présentes
        CGV.
      </p>

      <h2>Article 2 — Produits</h2>
      <p>
        Les produits sont des luminaires fabriqués à la commande par impression 3D. De légères
        variations (teinte, texture) inhérentes à la fabrication artisanale peuvent exister et ne
        constituent pas un défaut.
      </p>

      <h2>Article 3 — Prix</h2>
      <p>
        Les prix sont indiqués en euros, toutes taxes comprises, hors frais de livraison précisés
        avant validation de la commande. LumoCAD se réserve le droit de modifier ses prix à tout
        moment, les produits étant facturés sur la base des tarifs en vigueur au moment de la
        commande.
      </p>

      <h2>Article 4 — Commande &amp; paiement</h2>
      <p>
        Le paiement s'effectue en ligne par carte bancaire via notre prestataire sécurisé Stripe.
        La commande est considérée comme ferme après confirmation du paiement.
      </p>

      <h2>Article 5 — Délais &amp; livraison</h2>
      <p>
        Les délais de fabrication et de livraison sont précisés sur la page{" "}
        <a href="/livraison">Livraison</a>. Les retards éventuels ne peuvent donner lieu à
        annulation ni à indemnité, sauf dispositions légales contraires.
      </p>

      <h2>Article 6 — Droit de rétractation</h2>
      <p>
        Conformément au Code de la consommation, vous disposez d'un délai de{" "}
        <strong>14 jours</strong> à compter de la réception pour exercer votre droit de
        rétractation sur les articles standard. Conformément à l'article L221-28, les biens
        confectionnés sur-mesure ou nettement personnalisés sont exclus de ce droit.
      </p>

      <h2>Article 7 — Garanties</h2>
      <p>
        Tous nos produits bénéficient des garanties légales de conformité et contre les vices
        cachés. En cas de défaut, contactez-nous à{" "}
        <a href="mailto:contact@lumocad.fr">contact@lumocad.fr</a>.
      </p>

      <h2>Article 8 — Médiation &amp; litiges</h2>
      <p>
        En cas de litige, une solution amiable sera recherchée avant toute action judiciaire.
        Le consommateur peut recourir gratuitement à un médiateur de la consommation. Le droit
        applicable est le droit français.
      </p>
    </InfoShell>
  );
}
