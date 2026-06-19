import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "@/components/seo/Breadcrumbs";

export function InfoShell({
  title,
  intro,
  crumb,
  updated,
  children,
}: {
  title: string;
  intro?: string;
  crumb: Crumb;
  updated?: string;
  children: React.ReactNode;
}) {
  return (
    <Container className="py-12 lg:py-16">
      <Breadcrumbs items={[crumb]} />
      <header className="mt-6 max-w-3xl">
        <h1 className="font-display text-4xl text-ink sm:text-5xl">{title}</h1>
        {intro && <p className="mt-4 text-lg text-muted">{intro}</p>}
        {updated && <p className="mt-2 text-sm text-muted">Dernière mise à jour : {updated}</p>}
      </header>
      <div className="prose-lumo mt-10 max-w-3xl">{children}</div>
    </Container>
  );
}
