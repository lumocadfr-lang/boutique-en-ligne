import Stripe from "stripe";

/** Renvoie une instance Stripe si la clé est configurée, sinon null. */
export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return null;
  return new Stripe(key, { typescript: true });
}

/** Pays de livraison autorisés (France + zone européenne principale). */
export const SHIPPING_COUNTRIES = [
  "FR", "BE", "CH", "LU", "DE", "ES", "IT", "NL", "PT", "AT", "IE",
] as const;

/** Génère un numéro de commande lisible : LUMO-2026-XXXXXX */
export function generateOrderNumber(): string {
  const year = new Date().getFullYear();
  const rand = Math.random().toString(36).slice(2, 8).toUpperCase();
  return `LUMO-${year}-${rand}`;
}
