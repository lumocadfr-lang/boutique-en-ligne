"use client";

import { useState } from "react";
import { Check, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart, type CartItem } from "@/components/cart/cart-context";
import { useCheckout } from "@/components/cart/useCheckout";

export function ProductBuyBox({ item, inStock }: { item: Omit<CartItem, "quantity">; inStock: boolean }) {
  const { add } = useCart();
  const { startCheckout, loading, error } = useCheckout();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function handleAdd() {
    add(item, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div>
      <div className="flex items-center gap-4">
        {/* Sélecteur de quantité */}
        <div className="flex items-center rounded-full border border-line">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="grid h-12 w-12 place-items-center text-muted hover:text-ink cursor-pointer"
            aria-label="Diminuer la quantité"
          >
            <Minus size={16} />
          </button>
          <span className="w-8 text-center tabular-nums">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="grid h-12 w-12 place-items-center text-muted hover:text-ink cursor-pointer"
            aria-label="Augmenter la quantité"
          >
            <Plus size={16} />
          </button>
        </div>

        <button
          onClick={handleAdd}
          className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-ink bg-paper px-6 font-medium text-ink transition-colors hover:bg-ink hover:text-paper cursor-pointer"
        >
          {added ? (
            <>
              <Check size={18} /> Ajouté au panier
            </>
          ) : (
            <>
              <ShoppingBag size={18} /> Ajouter au panier
            </>
          )}
        </button>
      </div>

      <button
        onClick={() => startCheckout([{ ...item, quantity: qty }])}
        disabled={loading}
        className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-ink font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60 cursor-pointer"
      >
        {loading ? "Redirection…" : "Acheter maintenant"}
      </button>

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      <p className="mt-4 text-center text-xs text-muted">
        Paiement sécurisé · {inStock ? "Fabriqué à la commande" : "Précommande"} · Livraison
        en France et en Europe
      </p>
    </div>
  );
}
