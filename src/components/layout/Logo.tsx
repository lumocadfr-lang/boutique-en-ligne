import Link from "next/link";
import { cn } from "@/lib/utils";

/** Logo LumoCAD : pictogramme suspension minimal + signature typographique. */
export function Logo({
  className,
  withWordmark = true,
  invert = false,
}: {
  className?: string;
  withWordmark?: boolean;
  invert?: boolean;
}) {
  return (
    <Link
      href="/"
      aria-label="LumoCAD — accueil"
      className={cn("group inline-flex items-center gap-2.5", className)}
    >
      <svg
        width="26"
        height="30"
        viewBox="0 0 26 30"
        fill="none"
        aria-hidden
        className={invert ? "text-paper" : "text-ink"}
      >
        <path d="M13 1V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path
          d="M3 21C3 14.3726 7.47715 9 13 9C18.5228 9 23 14.3726 23 21H3Z"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinejoin="round"
        />
        <path d="M3 21H23" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="13" cy="26" r="2.4" fill="var(--color-brass)" />
      </svg>
      {withWordmark && (
        <span
          className={cn(
            "font-display text-xl font-semibold tracking-tight",
            invert ? "text-paper" : "text-ink",
          )}
        >
          LumoCAD
        </span>
      )}
    </Link>
  );
}
