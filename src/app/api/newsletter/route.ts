import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({ email: z.string().email() });

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Requête invalide." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Adresse e-mail invalide." }, { status: 400 });
  }

  // TODO : connecter un service e-mail (Brevo, Mailchimp, Resend…).
  // Pour l'instant, on journalise simplement l'inscription.
  console.log("[newsletter] inscription:", parsed.data.email);

  return NextResponse.json({ ok: true });
}
