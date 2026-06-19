/** Injecte un bloc de données structurées Schema.org (JSON-LD). */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON contrôlé par l'application — pas d'entrée utilisateur non échappée.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
