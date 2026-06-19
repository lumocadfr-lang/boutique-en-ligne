"use client";

import { useState } from "react";
import type { CartItem } from "./cart-context";

/**
 * Lance le tunnel de paiement : envoie le panier à /api/checkout,
 * puis redirige vers la page de paiement Stripe.
 * Tant que Stripe n'est pas configuré, l'API renvoie une erreur explicite.
 */
export function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout(items: CartItem[]) {
    if (items.length === 0) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((i) => ({ productId: i.productId, quantity: i.quantity })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Le paiement est momentanément indisponible.");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Une erreur est survenue.");
      setLoading(false);
    }
  }

  return { startCheckout, loading, error };
}
