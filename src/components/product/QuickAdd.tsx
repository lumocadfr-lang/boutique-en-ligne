"use client";

import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { useCart, type CartItem } from "@/components/cart/cart-context";

export function QuickAdd({ item }: { item: Omit<CartItem, "quantity"> }) {
  const { add } = useCart();
  const [done, setDone] = useState(false);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        add(item, 1);
        setDone(true);
        window.setTimeout(() => setDone(false), 1500);
      }}
      className="grid h-10 w-10 place-items-center rounded-full bg-paper/95 text-ink shadow-soft backdrop-blur transition-all hover:bg-ink hover:text-paper cursor-pointer"
      aria-label={`Ajouter ${item.title} au panier`}
    >
      {done ? <Check size={17} /> : <Plus size={17} />}
    </button>
  );
}
