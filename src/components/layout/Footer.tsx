import Link from "next/link";
import { Mail, MapPin } from "lucide-react";
import { Logo } from "./Logo";
import { footerNav, site } from "@/lib/site";
import { NewsletterForm } from "./NewsletterForm";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.3" cy="6.7" r="1.1" fill="currentColor" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M14 8.5V7c0-.8.5-1 1-1h1.5V3H14c-2.2 0-3.5 1.3-3.5 3.6V8.5H8V11h2.5v10H14V11h2.3l.5-2.5H14Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-cream">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          {/* Marque + newsletter */}
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              Luminaires artisanaux imprimés en 3D, dessinés et fabriqués à la main en
              Bourgogne. Des pièces uniques, éco-conçues, pensées pour sublimer la lumière
              de votre intérieur.
            </p>
            <div className="mt-6">
              <p className="mb-2 text-sm font-medium text-ink">
                Recevez nos inspirations lumineuses
              </p>
              <NewsletterForm />
            </div>
          </div>

          {/* Colonnes de liens */}
          {Object.values(footerNav).map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <h3 className="eyebrow text-muted">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-soft transition-colors hover:text-brass-dark"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-3 text-sm text-muted sm:flex-row sm:items-center sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <MapPin size={15} className="text-brass" /> {site.region}, {site.country}
            </span>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center gap-2 hover:text-ink"
            >
              <Mail size={15} className="text-brass" /> {site.email}
            </a>
          </div>
          <div className="flex items-center gap-3">
            {site.social.instagram && (
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <InstagramIcon size={18} />
              </a>
            )}
            {site.social.facebook && (
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
              >
                <FacebookIcon size={18} />
              </a>
            )}
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-2 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} LumoCAD. Tous droits réservés.</p>
          <div className="flex gap-4">
            <Link href="/mentions-legales" className="hover:text-ink">
              Mentions légales
            </Link>
            <Link href="/cgv" className="hover:text-ink">
              CGV
            </Link>
            <Link href="/confidentialite" className="hover:text-ink">
              Confidentialité
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
