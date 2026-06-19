"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";
import { useCart } from "@/components/cart/cart-context";
import { useCheckout } from "@/components/cart/useCheckout";
import { formatPrice } from "@/lib/utils";

const FREE_SHIPPING_THRESHOLD = 12000;

export default function CartPage() {
  const { items, subtotalCents, setQty, remove, count } = useCart();
  const { startCheckout, loading, error } = useCheckout();

  const remaining = FREE_SHIPPING_THRESHOLD - subtotalCents;

  if (count === 0) {
    return (
      <Container className="py-24 text-center">
        <ShoppingBag size={48} strokeWidth={1.2} className="mx-auto text-brass" />
        <h1 className="mt-6 font-display text-4xl text-ink">Votre panier est vide</h1>
        <p className="mt-3 text-muted">
          Parcourez nos créations lumineuses et trouvez la pièce qui vous ressemble.
        </p>
        <div className="mt-8">
          <Button href="/boutique" size="lg">
            Découvrir la boutique
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 lg:py-16">
      <h1 className="font-display text-4xl text-ink">Votre panier</h1>

      <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr]">
        {/* Lignes */}
        <ul className="divide-y divide-line border-y border-line">
          {items.map((item) => (
            <li key={item.productId} className="flex gap-5 py-6">
              <Link
                href={`/produits/${item.slug}`}
                className="relative h-32 w-28 shrink-0 overflow-hidden rounded-lg bg-cream"
              >
                {item.image && item.image.startsWith("http") ? (
                  <Image src={item.image} alt={item.title} fill sizes="112px" className="object-cover" />
                ) : (
                  <BrandedPlaceholder category={item.category} />
                )}
              </Link>

              <div className="flex flex-1 flex-col">
                <div className="flex justify-between gap-4">
                  <div>
                    <Link
                      href={`/produits/${item.slug}`}
                      className="font-display text-lg text-ink hover:text-brass-dark"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-sm text-muted">
                      {formatPrice(item.priceCents)} l'unité
                    </p>
                  </div>
                  <button
                    onClick={() => remove(item.productId)}
                    className="h-fit text-muted hover:text-ink cursor-pointer"
                    aria-label={`Retirer ${item.title}`}
                  >
                    <X size={18} />
                  </button>
                </div>

                <div className="mt-auto flex items-center justify-between pt-4">
                  <div className="flex items-center rounded-full border border-line">
                    <button
                      onClick={() => setQty(item.productId, item.quantity - 1)}
                      className="grid h-9 w-9 place-items-center text-muted hover:text-ink cursor-pointer"
                      aria-label="Diminuer"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm tabular-nums">{item.quantity}</span>
                    <button
                      onClick={() => setQty(item.productId, item.quantity + 1)}
                      className="grid h-9 w-9 place-items-center text-muted hover:text-ink cursor-pointer"
                      aria-label="Augmenter"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-medium text-ink tabular-nums">
                    {formatPrice(item.priceCents * item.quantity)}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>

        {/* Récapitulatif */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-2xl border border-line bg-cream/50 p-7">
            <h2 className="font-display text-xl text-ink">Récapitulatif</h2>

            {remaining > 0 ? (
              <p className="mt-4 rounded-lg bg-paper px-4 py-3 text-sm text-muted">
                Plus que <strong className="text-ink">{formatPrice(remaining)}</strong> pour
                profiter de la <strong className="text-ink">livraison offerte</strong>.
              </p>
            ) : (
              <p className="mt-4 rounded-lg bg-paper px-4 py-3 text-sm text-brass-dark">
                🎉 Vous bénéficiez de la livraison offerte&nbsp;!
              </p>
            )}

            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted">Sous-total</dt>
                <dd className="text-ink tabular-nums">{formatPrice(subtotalCents)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted">Livraison</dt>
                <dd className="text-muted">Calculée au paiement</dd>
              </div>
            </dl>

            <div className="mt-5 flex items-baseline justify-between border-t border-line pt-5">
              <span className="text-ink">Total estimé</span>
              <span className="font-display text-2xl text-ink tabular-nums">
                {formatPrice(subtotalCents)}
              </span>
            </div>

            <button
              onClick={() => startCheckout(items)}
              disabled={loading}
              className="mt-6 flex h-12 w-full items-center justify-center rounded-full bg-ink font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60 cursor-pointer"
            >
              {loading ? "Redirection…" : "Passer au paiement"}
            </button>
            {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

            <Link
              href="/boutique"
              className="mt-4 block text-center text-sm text-muted hover:text-ink"
            >
              Continuer mes achats
            </Link>
          </div>
        </aside>
      </div>
    </Container>
  );
}
