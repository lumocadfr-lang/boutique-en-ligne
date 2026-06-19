"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { Logo } from "./Logo";
import { AnnouncementBar } from "./AnnouncementBar";
import { mainNav } from "@/lib/site";
import { useCart } from "@/components/cart/cart-context";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const { count, open } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  // Ferme le menu mobile lors d'un changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 bg-paper/90 backdrop-blur-md">
      <AnnouncementBar />
      <div className="border-b border-line">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-12">
          {/* Mobile : bouton menu */}
          <button
            onClick={() => setMenuOpen(true)}
            className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand lg:hidden cursor-pointer"
            aria-label="Ouvrir le menu"
          >
            <Menu size={22} />
          </button>

          <Logo className="lg:flex-none" />

          {/* Desktop : navigation */}
          <nav className="hidden items-center gap-7 lg:flex" aria-label="Navigation principale">
            {mainNav.map((item) => {
              const active = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "link-underline text-sm transition-colors hover:text-ink",
                    active ? "text-ink" : "text-muted",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Panier */}
          <button
            onClick={open}
            className="relative grid h-10 w-10 place-items-center rounded-full text-ink transition-colors hover:bg-sand cursor-pointer"
            aria-label={`Panier${count > 0 ? `, ${count} article${count > 1 ? "s" : ""}` : ""}`}
          >
            <ShoppingBag size={21} />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-brass px-1 text-[11px] font-semibold text-white tabular-nums">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Menu mobile */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-50 bg-ink/40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.div
              className="fixed left-0 top-0 z-50 flex h-full w-[86%] max-w-sm flex-col bg-paper lg:hidden"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <Logo />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-sand cursor-pointer"
                  aria-label="Fermer le menu"
                >
                  <X size={22} />
                </button>
              </div>
              <nav className="flex flex-col gap-1 px-3 py-4" aria-label="Navigation mobile">
                {mainNav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex flex-col rounded-lg px-3 py-3 transition-colors hover:bg-cream"
                  >
                    <span className="font-display text-lg text-ink">{item.label}</span>
                    {item.description && (
                      <span className="text-sm text-muted">{item.description}</span>
                    )}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto border-t border-line px-5 py-4 text-sm text-muted">
                <a href="mailto:contact@lumocad.fr" className="link-underline">
                  contact@lumocad.fr
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
