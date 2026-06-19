import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ClearCartOnMount } from "@/components/cart/ClearCartOnMount";

export const metadata: Metadata = {
  title: "Commande confirmée",
  robots: { index: false, follow: false },
};

export default function OrderConfirmedPage() {
  return (
    <Container className="py-24 text-center">
      <ClearCartOnMount />
      <div className="mx-auto max-w-xl">
        <CheckCircle2 size={56} className="mx-auto text-brass" strokeWidth={1.4} />
        <h1 className="mt-6 font-display text-4xl text-ink">Merci pour votre commande&nbsp;!</h1>
        <p className="mt-4 text-muted">
          Votre paiement a bien été reçu. Vous allez recevoir un e-mail de confirmation.
          Votre luminaire est désormais entre les mains de notre atelier&nbsp;: chaque pièce
          étant imprimée et finie à la main, comptez 3 à 12 jours ouvrés avant l'expédition.
        </p>
        <p className="mt-3 text-muted">
          Une question ?{" "}
          <a href="mailto:contact@lumocad.fr" className="link-underline text-ink">
            contact@lumocad.fr
          </a>
        </p>
        <div className="mt-10 flex justify-center gap-4">
          <Button href="/boutique" size="lg">
            Continuer mes découvertes
          </Button>
          <Button href="/" variant="outline" size="lg">
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </Container>
  );
}
