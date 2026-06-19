"use client";

import { useState } from "react";
import { Check, Send } from "lucide-react";

const subjects = ["Renseignement produit", "Projet sur-mesure", "Suivi de commande", "Presse & partenariat", "Autre"];

export function ContactForm({ defaultSubject }: { defaultSubject?: string }) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const d = (await res.json()) as { error?: string };
        throw new Error(d.error ?? "Envoi impossible.");
      }
      setStatus("done");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Une erreur est survenue.");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-line bg-cream/50 p-10 text-center">
        <Check size={40} className="mx-auto text-brass" />
        <h3 className="mt-4 font-display text-2xl text-ink">Message envoyé&nbsp;!</h3>
        <p className="mt-2 text-muted">
          Merci de nous avoir écrit. Nous vous répondons sous 24 à 48&nbsp;h ouvrées.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden
      />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Nom" htmlFor="name">
          <input id="name" name="name" required minLength={2} className={inputClass} />
        </Field>
        <Field label="E-mail" htmlFor="email">
          <input id="email" name="email" type="email" required className={inputClass} />
        </Field>
      </div>

      <Field label="Sujet" htmlFor="subject">
        <select id="subject" name="subject" defaultValue={defaultSubject} className={inputClass}>
          {subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </Field>

      <Field label="Message" htmlFor="message">
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          className={`${inputClass} resize-y`}
        />
      </Field>

      {status === "error" && <p className="text-sm text-red-700">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-8 font-medium text-paper transition-colors hover:bg-ink-soft disabled:opacity-60 cursor-pointer"
      >
        {status === "loading" ? "Envoi…" : (<><Send size={17} /> Envoyer le message</>)}
      </button>
    </form>
  );
}

const inputClass =
  "w-full rounded-lg border border-line bg-paper px-4 py-3 text-ink placeholder:text-muted focus:border-brass focus:outline-none";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="mb-1.5 block text-sm font-medium text-ink">{label}</span>
      {children}
    </label>
  );
}
