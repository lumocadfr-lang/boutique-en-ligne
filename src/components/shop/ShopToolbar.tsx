"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/lib/site";
import { cn } from "@/lib/utils";

const sorts = [
  { value: "recent", label: "Nouveautés" },
  { value: "price-asc", label: "Prix croissant" },
  { value: "price-desc", label: "Prix décroissant" },
];

export function ShopToolbar({ count }: { count: number }) {
  const pathname = usePathname();
  const params = useSearchParams();
  const activeCategory = params.get("category");
  const activeSort = params.get("sort") ?? "recent";

  function buildHref(next: Record<string, string | null>) {
    const sp = new URLSearchParams(params.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value === null) sp.delete(key);
      else sp.set(key, value);
    }
    const qs = sp.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  return (
    <div className="flex flex-col gap-4 border-b border-line pb-5 sm:flex-row sm:items-center sm:justify-between">
      {/* Catégories */}
      <div className="flex flex-wrap items-center gap-2">
        <Link
          href={buildHref({ category: null })}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm transition-colors",
            !activeCategory
              ? "border-ink bg-ink text-paper"
              : "border-line text-ink hover:border-ink",
          )}
        >
          Tout
        </Link>
        {categories
          .filter((c) => c.key !== "SUR_MESURE")
          .map((c) => (
            <Link
              key={c.key}
              href={buildHref({ category: c.key })}
              className={cn(
                "rounded-full border px-4 py-1.5 text-sm transition-colors",
                activeCategory === c.key
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink hover:border-ink",
              )}
            >
              {c.label}
            </Link>
          ))}
      </div>

      {/* Tri + compteur */}
      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-muted sm:inline">
          {count} création{count > 1 ? "s" : ""}
        </span>
        <label className="flex items-center gap-2 text-sm text-muted">
          <span className="sr-only sm:not-sr-only">Trier&nbsp;:</span>
          <select
            value={activeSort}
            onChange={(e) => {
              window.location.href = buildHref({ sort: e.target.value });
            }}
            className="rounded-full border border-line bg-paper px-3 py-1.5 text-sm text-ink focus:border-brass focus:outline-none cursor-pointer"
          >
            {sorts.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  );
}
