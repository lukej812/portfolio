"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

import { ease } from "@/lib/motion";

const ENDPOINT = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

type Status = "idle" | "sending" | "sent" | "mailto";

/**
 * Posts to NEXT_PUBLIC_FORM_ENDPOINT (e.g. Formspree) when it's set.
 * Otherwise, or if that request fails, it opens a pre-filled email.
 */
export function ContactForm({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  function openMail(name: string, from: string, message: string) {
    const subject = encodeURIComponent(`Hello from ${name || "your portfolio"}`);
    const body = encodeURIComponent(`${message}\n\n${name}${from ? ` (${from})` : ""}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
    setStatus("mailto");
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const from = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    if (!name || !from || !message) {
      setError("Please fill in all three fields.");
      return;
    }
    setError("");

    if (!ENDPOINT) {
      openMail(name, from, message);
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ name, email: from, message }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
      form.reset();
    } catch {
      openMail(name, from, message);
    }
  }

  const field =
    "mt-2 w-full rounded-2xl border border-line-strong bg-ink-950/60 px-4 py-3 text-[0.95rem] text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-300 focus:border-signal/60 focus:shadow-[0_0_0_4px_rgb(67_226_255/0.12)] focus:outline-none";

  return (
    <form onSubmit={onSubmit} noValidate className="glass rounded-3xl p-6 sm:p-8" aria-describedby="form-status">
      <p className="font-display text-xl font-semibold">Send a quick note</p>
      <p className="mt-1.5 text-sm text-fg-muted">Recruiters, collaborators, and fellow builders all welcome.</p>

      <div className="mt-7 grid gap-5 sm:grid-cols-2">
        <label className="block text-sm text-fg-muted">
          Name
          <input name="name" type="text" autoComplete="name" required className={field} placeholder="Your name" />
        </label>
        <label className="block text-sm text-fg-muted">
          Email
          <input name="email" type="email" autoComplete="email" required className={field} placeholder="you@company.com" />
        </label>
      </div>
      <label className="mt-5 block text-sm text-fg-muted">
        Message
        <textarea name="message" required rows={5} className={`${field} resize-y`} placeholder="What are you working on?" />
      </label>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <button
          type="submit"
          disabled={status === "sending"}
          className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-fg px-6 text-[0.95rem] font-medium text-ink-950 transition-[background-color,box-shadow,opacity] duration-300 hover:bg-white hover:shadow-[0_10px_40px_-10px_rgb(255_255_255/0.6)] disabled:opacity-60"
        >
          {status === "sending" ? "Sending..." : "Send message"}
          <Send className="size-4 transition-transform duration-300 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-1" aria-hidden />
        </button>
        <p className="text-xs text-fg-subtle">{ENDPOINT ? "Sends directly to my inbox." : "Opens your email app, pre-filled."}</p>
      </div>

      <div id="form-status" aria-live="polite" className="min-h-6">
        <AnimatePresence mode="wait">
          {error && (
            <motion.p key="err" className="mt-4 text-sm text-alert" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              {error}
            </motion.p>
          )}
          {!error && (status === "sent" || status === "mailto") && (
            <motion.p
              key={status}
              className="mt-4 flex items-center gap-2 text-sm text-ion"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease: ease.outExpo }}
            >
              <Check className="size-4" aria-hidden />
              {status === "sent"
                ? "Thanks, your message is on its way."
                : <>Your email app should open now. If it doesn&apos;t, write to {email}.</>}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
