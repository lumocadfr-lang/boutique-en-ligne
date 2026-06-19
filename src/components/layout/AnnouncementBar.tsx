import { Sparkles } from "lucide-react";

export function AnnouncementBar() {
  return (
    <div className="bg-ink text-paper">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-5 py-2.5 text-center text-xs tracking-wide sm:text-[13px]">
        <Sparkles size={14} className="hidden text-amber sm:block" aria-hidden />
        <p>
          Fabriqué main en France · Précommandes ouvertes
          <span className="mx-2 text-amber">—30%</span>
          sur les nouvelles créations · Livraison offerte dès 120&nbsp;€
        </p>
      </div>
    </div>
  );
}
