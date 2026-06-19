import Link from "next/link";
import { Media } from "@/components/ui/Media";
import { QuickAdd } from "./QuickAdd";
import { categoryLabel } from "@/lib/site";
import { discountPercent, formatPrice } from "@/lib/utils";
import type { ProductCard as ProductCardType } from "@/lib/products";

export function ProductCard({
  product,
  priority = false,
  index = 0,
}: {
  product: ProductCardType;
  priority?: boolean;
  index?: number;
}) {
  const image = product.images[0];
  const discount = discountPercent(product.priceCents, product.compareAtCents);

  return (
    <article className="group">
      <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-cream">
        <Link href={`/produits/${product.slug}`} className="block h-full w-full" tabIndex={-1}>
          <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]">
            <Media
              src={image?.url}
              alt={image?.alt ?? product.title}
              category={product.category}
              label={product.title}
              seed={index}
              priority={priority}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="pointer-events-none absolute left-3 top-3 flex flex-col gap-2">
          {discount && (
            <span className="rounded-full bg-ink px-2.5 py-1 text-[11px] font-semibold tracking-wide text-paper">
              −{discount}%
            </span>
          )}
          {product.madeToOrder && (
            <span className="rounded-full bg-paper/90 px-2.5 py-1 text-[11px] font-medium tracking-wide text-ink backdrop-blur">
              Sur commande
            </span>
          )}
        </div>

        {/* Ajout rapide */}
        <div className="absolute bottom-3 right-3 translate-y-1 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <QuickAdd
            item={{
              productId: product.id,
              slug: product.slug,
              title: product.title,
              priceCents: product.priceCents,
              image: image?.url ?? null,
              category: product.category,
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        <p className="eyebrow text-muted">{categoryLabel(product.category)}</p>
        <h3 className="mt-1.5 font-display text-lg leading-snug text-ink">
          <Link href={`/produits/${product.slug}`} className="hover:text-brass-dark">
            {product.title}
          </Link>
        </h3>
        {product.tagline && (
          <p className="mt-1 line-clamp-1 text-sm text-muted">{product.tagline}</p>
        )}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-medium text-ink tabular-nums">
            {formatPrice(product.priceCents, product.currency)}
          </span>
          {product.compareAtCents && (
            <span className="text-sm text-muted line-through tabular-nums">
              {formatPrice(product.compareAtCents, product.currency)}
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
