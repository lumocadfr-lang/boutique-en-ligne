"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      setStatus(res.ok ? "done" : "error");
      if (res.ok) setEmail("");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <p className="inline-flex items-center gap-2 text-sm text-brass-dark">
        <Check size={16} /> Merci ! À très vite dans votre boîte mail.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="flex max-w-xs items-center gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Votre adresse e-mail
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Votre e-mail"
        className="h-11 w-full rounded-full border border-line bg-paper px-4 text-sm text-ink placeholder:text-muted focus:border-brass focus:outline-none"
      />
      <button
        type="submit"
        disabled={status === "loading"}
        className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-paper transition-colors hover:bg-brass disabled:opacity-60 cursor-pointer"
        aria-label="S'inscrire à la newsletter"
      >
        <ArrowRight size={18} />
      </button>
    </form>
  );
}
