"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "./cart-context";
import { formatPrice } from "@/lib/utils";
import { useCheckout } from "./useCheckout";

export function CartDrawer() {
  const { isOpen, close, items, subtotalCents, count, setQty, remove } = useCart();
  const { startCheckout, loading } = useCheckout();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={close}
            aria-hidden
          />
          <motion.aside
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-paper shadow-card"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Panier"
          >
            <header className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 className="font-display text-lg text-ink">
                Votre panier{count > 0 ? ` (${count})` : ""}
              </h2>
              <button
                onClick={close}
                className="grid h-10 w-10 place-items-center rounded-full text-muted transition-colors hover:bg-sand hover:text-ink cursor-pointer"
                aria-label="Fermer le panier"
              >
                <X size={20} />
              </button>
            </header>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag size={40} strokeWidth={1.2} className="text-brass" />
                <p className="text-muted">Votre panier est vide pour le moment.</p>
                <Link
                  href="/boutique"
                  onClick={close}
                  className="link-underline font-medium text-ink"
                >
                  Découvrir les créations
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={item.productId} className="flex gap-4 py-5">
                      <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded bg-cream">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        ) : null}
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex justify-between gap-2">
                          <Link
                            href={`/produits/${item.slug}`}
                            onClick={close}
                            className="font-medium leading-snug text-ink hover:text-brass-dark"
                          >
                            {item.title}
                          </Link>
                          <button
                            onClick={() => remove(item.productId)}
                            className="text-muted hover:text-ink cursor-pointer"
                            aria-label={`Retirer ${item.title}`}
                          >
                            <X size={16} />
                          </button>
                        </div>
                        <div className="mt-auto flex items-center justify-between pt-3">
                          <div className="flex items-center rounded-full border border-line">
                            <button
                              onClick={() => setQty(item.productId, item.quantity - 1)}
                              className="grid h-8 w-8 place-items-center text-muted hover:text-ink cursor-pointer"
                              aria-label="Diminuer la quantité"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-7 text-center text-sm tabular-nums">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => setQty(item.productId, item.quantity + 1)}
                              className="grid h-8 w-8 place-items-center text-muted hover:text-ink cursor-pointer"
                              aria-label="Augmenter la quantité"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                          <span className="text-sm font-medium text-ink tabular-nums">
                            {formatPrice(item.priceCents * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <footer className="border-t border-line px-6 py-5">
                  <div className="flex items-center justify-between text-base">
                    <span className="text-muted">Sous-total</span>
                    <span className="font-display text-xl text-ink tabular-nums">
                      {formatPrice(subtotalCents)}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted">
                    Frais de port calculés à l'étape suivante.
                  </p>
                  <button
                    onClick={() => startCheckout(items)}
                    disabled={loading}
                    className="mt-4 flex h-12 w-full items-center justify-center rounded-full bg-ink font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60 cursor-pointer"
                  >
                    {loading ? "Redirection…" : "Passer commande"}
                  </button>
                  <Link
                    href="/panier"
                    onClick={close}
                    className="mt-3 block text-center text-sm text-muted hover:text-ink"
                  >
                    Voir le panier détaillé
                  </Link>
                </footer>
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
