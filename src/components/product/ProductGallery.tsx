"use client";

import { useState } from "react";
import { Media } from "@/components/ui/Media";
import { cn } from "@/lib/utils";

type GalleryImage = { url: string; alt: string | null };

export function ProductGallery({
  images,
  title,
  category,
}: {
  images: GalleryImage[];
  title: string;
  category: string;
}) {
  const list = images.length > 0 ? images : [{ url: "placeholder", alt: title }];
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 sm:flex-row">
      {/* Miniatures */}
      {list.length > 1 && (
        <div className="flex gap-3 sm:flex-col">
          {list.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={cn(
                "relative aspect-square w-16 shrink-0 overflow-hidden rounded-md border transition-colors cursor-pointer",
                active === i ? "border-ink" : "border-line hover:border-muted",
              )}
              aria-label={`Voir l'image ${i + 1}`}
            >
              <Media
                src={img.url}
                alt={img.alt ?? `${title} ${i + 1}`}
                category={category}
                seed={i}
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}

      {/* Image principale */}
      <div className="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-cream shadow-soft">
        <Media
          src={list[active].url}
          alt={list[active].alt ?? title}
          category={category}
          label={title}
          seed={active}
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>
    </div>
  );
}
