/**
 * Règle le `provider` du datasource dans prisma/schema.prisma.
 *
 * Prisma n'autorise pas env() dans `provider` ; on réécrit donc la ligne
 * avant `prisma generate`. Le provider est déterminé ainsi :
 *   1. variable DATABASE_PROVIDER si présente, sinon
 *   2. déduit de DATABASE_URL : "file:" → sqlite, sinon postgresql.
 *
 * On charge .env manuellement car ce script tourne hors du contexte Prisma.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

// ── Chargement minimal de .env (sans dépendance) ───────────────────────────
const envPath = resolve(process.cwd(), ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const m = line.match(/^\s*([\w.]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) {
      process.env[m[1]] = m[2].trim().replace(/^["']|["']$/g, "");
    }
  }
}

// ── Détermination du provider ──────────────────────────────────────────────
let provider = process.env.DATABASE_PROVIDER;
if (!provider) {
  const url = process.env.DATABASE_URL || "";
  provider = url.startsWith("file:") ? "sqlite" : "postgresql";
}

const allowed = ["postgresql", "sqlite", "mysql"];
if (!allowed.includes(provider)) {
  console.error(`DATABASE_PROVIDER invalide : ${provider} (attendu : ${allowed.join(", ")})`);
  process.exit(1);
}

// ── Réécriture du schéma ───────────────────────────────────────────────────
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
