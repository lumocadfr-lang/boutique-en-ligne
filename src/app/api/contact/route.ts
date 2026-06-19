import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  subject: z.string().max(160).optional(),
  message: z.string().min(10).max(4000),
  // Honeypot anti-spam : doit rester vide
  company: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Merci de vérifier les champs du formulaire." },
      { status: 400 },
    );
  }

  // TODO : envoyer l'e-mail (Resend, Brevo…) vers contact@lumocad.fr
  // et/ou enregistrer le message. Pour l'instant : journalisation.
  const { name, email, subject } = parsed.data;
  console.log("[contact] message:", { name, email, subject });

  return NextResponse.json({ ok: true });
}
