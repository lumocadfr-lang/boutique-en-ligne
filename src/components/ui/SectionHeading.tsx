import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && <p className="eyebrow mb-3 text-brass">{eyebrow}</p>}
      <h2 className="font-display text-3xl leading-tight text-ink sm:text-4xl">{title}</h2>
      {intro && <p className="mt-4 text-base leading-relaxed text-muted">{intro}</p>}
    </Reveal>
  );
}
