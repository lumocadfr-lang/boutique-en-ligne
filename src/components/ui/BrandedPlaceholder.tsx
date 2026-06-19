import { cn } from "@/lib/utils";

/**
 * Visuel de marque généré (SVG) utilisé tant que les photos réelles ne sont
 * pas importées depuis Shopify. Line-art chaleureux décliné par catégorie.
 */
export function BrandedPlaceholder({
  category,
  label,
  className,
  seed = 0,
}: {
  category?: string;
  label?: string;
  className?: string;
  seed?: number;
}) {
  const gid = `glow-${seed}-${(label ?? category ?? "x").replace(/\W/g, "")}`;

  return (
    <div className={cn("relative h-full w-full overflow-hidden bg-cream", className)}>
      <svg
        viewBox="0 0 400 500"
        className="h-full w-full"
        preserveAspectRatio="xMidYMid slice"
        role="img"
        aria-label={label ? `Aperçu — ${label}` : "Aperçu du luminaire"}
      >
        <defs>
          <radialGradient id={gid} cx="50%" cy="38%" r="60%">
            <stop offset="0%" stopColor="#fbe9c8" />
            <stop offset="45%" stopColor="#f2ece2" />
            <stop offset="100%" stopColor="#e9ddc9" />
          </radialGradient>
        </defs>
        <rect width="400" height="500" fill={`url(#${gid})`} />
        <g stroke="#1a1714" strokeWidth="1.5" fill="none" opacity="0.78" strokeLinecap="round" strokeLinejoin="round">
          <LampArt category={category} />
        </g>
        {/* halo lumineux */}
        <circle cx="200" cy="250" r="120" fill="#e8a94b" opacity="0.10" />
      </svg>
      {label && (
        <span className="pointer-events-none absolute bottom-4 left-4 font-display text-sm tracking-wide text-ink/70">
          {label}
        </span>
      )}
    </div>
  );
}

function LampArt({ category }: { category?: string }) {
  switch (category) {
    case "APPLIQUE":
      return (
        <>
          <rect x="150" y="170" width="100" height="160" rx="14" />
          <path d="M150 210 H250 M150 250 H250 M150 290 H250" opacity="0.5" />
          <circle cx="200" cy="250" r="10" fill="#e8a94b" stroke="none" />
        </>
      );
    case "LAMPE_A_POSER":
      return (
        <>
          <path d="M150 200 Q200 150 250 200 L240 270 Q200 285 160 270 Z" />
          <path d="M185 285 H215 L210 360 H190 Z" />
          <ellipse cx="200" cy="370" rx="55" ry="12" />
          <circle cx="200" cy="235" r="9" fill="#e8a94b" stroke="none" />
        </>
      );
    case "LAMPADAIRE":
      return (
        <>
          <path d="M160 130 Q200 100 240 130 L232 185 Q200 198 168 185 Z" />
          <path d="M200 198 V400" />
          <path d="M160 400 H240" />
          <circle cx="200" cy="158" r="9" fill="#e8a94b" stroke="none" />
        </>
      );
    case "SUSPENSION":
    default:
      return (
        <>
          <path d="M200 90 V150" />
          <path d="M120 235 Q120 150 200 150 Q280 150 280 235 Q280 250 200 250 Q120 250 120 235 Z" />
          <path d="M120 235 Q200 270 280 235" opacity="0.5" />
          <circle cx="200" cy="220" r="11" fill="#e8a94b" stroke="none" />
        </>
      );
  }
}
