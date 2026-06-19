import Image from "next/image";
import { BrandedPlaceholder } from "./BrandedPlaceholder";

function isRealImage(src?: string | null): src is string {
  return !!src && (src.startsWith("/") || src.startsWith("http")) && !src.includes("placeholder");
}

/**
 * Affiche une vraie photo (next/image) si disponible, sinon un visuel de marque.
 * Conçu pour un conteneur en `position: relative` (utilise `fill`).
 */
export function Media({
  src,
  alt,
  category,
  label,
  sizes,
  priority,
  seed,
  className = "object-cover",
}: {
  src?: string | null;
  alt: string;
  category?: string;
  label?: string;
  sizes?: string;
  priority?: boolean;
  seed?: number;
  className?: string;
}) {
  if (isRealImage(src)) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 33vw"}
        priority={priority}
        className={className}
      />
    );
  }
  return <BrandedPlaceholder category={category} label={label} seed={seed} />;
}
