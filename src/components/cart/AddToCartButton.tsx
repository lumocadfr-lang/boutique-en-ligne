"use client";

import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { useCart, type CartItem } from "./cart-context";
import { cn } from "@/lib/utils";

export function AddToCartButton({
  item,
  className,
  label = "Ajouter au panier",
  disabled,
}: {
  item: Omit<CartItem, "quantity">;
  className?: string;
  label?: string;
  disabled?: boolean;
}) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  function handleAdd() {
    add(item, 1);
    setDone(true);
    window.setTimeout(() => setDone(false), 1600);
  }

  return (
    <button
      onClick={handleAdd}
      disabled={disabled}
      className={cn(
        "inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-ink-soft disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer",
        className,
      )}
    >
      {done ? (
        <>
          <Check size={18} /> Ajouté
        </>
      ) : (
        <>
          <ShoppingBag size={18} /> {label}
        </>
      )}
    </button>
  );
}
