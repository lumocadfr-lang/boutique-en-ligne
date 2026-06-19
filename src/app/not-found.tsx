import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { BrandedPlaceholder } from "@/components/ui/BrandedPlaceholder";

export default function NotFound() {
  return (
    <Container className="grid items-center gap-12 py-20 lg:grid-cols-2 lg:py-28">
      <div>
        <p className="eyebrow text-brass">Erreur 404</p>
        <h1 className="mt-3 font-display text-5xl text-ink">Cette page s'est éteinte</h1>
        <p className="mt-4 max-w-md text-muted">
          La page que vous cherchez n'existe pas ou a été déplacée. Mais la lumière, elle,
          est toujours là — explorez nos créations.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/boutique" size="lg">
            Voir la boutique
          </Button>
          <Button href="/" variant="outline" size="lg">
            Retour à l'accueil
          </Button>
        </div>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-2xl">
        <BrandedPlaceholder category="SUSPENSION" label="404" />
      </div>
    </Container>
  );
}
