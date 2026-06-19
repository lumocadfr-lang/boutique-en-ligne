/**
 * Règle le `provider` du datasource dans prisma/schema.prisma selon
 * la variable d'environnement DATABASE_PROVIDER (défaut : postgresql).
 *
 * Prisma n'autorise pas env() dans `provider` ; on réécrit donc la ligne
 * avant `prisma generate`. Cela garde le projet portable :
 *   - local : DATABASE_PROVIDER=sqlite
 *   - prod  : DATABASE_PROVIDER=postgresql (défaut)
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const provider = process.env.DATABASE_PROVIDER || "postgresql";
const allowed = ["postgresql", "sqlite", "mysql"];
if (!allowed.includes(provider)) {
  console.error(`DATABASE_PROVIDER invalide : ${provider} (attendu : ${allowed.join(", ")})`);
  process.exit(1);
}

const schemaPath = resolve(process.cwd(), "prisma/schema.prisma");
const schema = readFileSync(schemaPath, "utf8");
const updated = schema.replace(
  /(datasource\s+db\s*\{[^}]*?provider\s*=\s*)"[^"]*"/,
  `$1"${provider}"`,
);

if (updated !== schema) {
  writeFileSync(schemaPath, updated);
  console.log(`🔧 Prisma provider → ${provider}`);
} else {
  console.log(`ℹ️  Prisma provider déjà à ${provider}`);
}
