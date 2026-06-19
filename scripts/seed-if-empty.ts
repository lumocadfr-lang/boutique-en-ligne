/**
 * Lance le seed UNIQUEMENT si la base est vide (aucun produit).
 * Utilisé au build pour qu'un déploiement neuf affiche le catalogue démo,
 * sans jamais écraser des données existantes (commandes, import Shopify…).
 */
import { PrismaClient } from "@prisma/client";
import { execSync } from "node:child_process";

const prisma = new PrismaClient();

async function main() {
  let count = 0;
  try {
    count = await prisma.product.count();
  } catch {
    // Table absente / DB pas encore migrée : on tentera le seed.
    count = 0;
  }

  if (count > 0) {
    console.log(`ℹ️  Base déjà peuplée (${count} produits) — seed ignoré.`);
    return;
  }

  console.log("🌱 Base vide — lancement du seed de démonstration…");
  execSync("tsx prisma/seed.ts", { stdio: "inherit" });
}

main()
  .catch((e) => {
    console.error("Seed-if-empty :", e);
    // On ne bloque pas le build pour autant.
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
