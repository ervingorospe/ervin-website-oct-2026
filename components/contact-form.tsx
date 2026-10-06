"use client";

import Link from "next/link";
import Script from "next/script";
import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { profile } from "@/lib/profile";
import { useConsent } from "./consent-provider";

const SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;

declare global {
  interface Window {
    grecaptcha?: {
      enterprise: {
        ready: (cb: () => void) => void;
        execute: (siteKey: string, opts: { action: string }) => Promise<string>;
      };
    };
  }
}

function getRecaptchaToken(): Promise<string | undefined> {
  const g = window.grecaptcha?.enterprise;
  if (!SITE_KEY || !g) return Promise.resolve(undefined);
  return new Promise((resolve, reject) => {
    g.ready(() => g.execute(SITE_KEY, { action: "contact" }).then(resolve, reject));
  });
}

const topics = ["Website", "Web app", "Mobile app", "Backend / API", "Something else"];

const field =
  "w-full rounded-xl border border-line bg-background px-4 py-3 text-sm text-ink outline-none transition placeholder:text-ink-faint focus:border-brand focus:ring-4 focus:ring-brand/10";

type Status = { kind: "idle" } | { kind: "sending" } | { kind: "sent" } | { kind: "error"; message: string };

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const { ready, consent, save, openSettings } = useConsent();
  const [scriptReady, setScriptReady] = useState(false);
  const [scriptFailed, setScriptFailed] = useState(false);

  // reCAPTCHA is only loaded after the visitor allows it. Without a site key (local dev), skip the gate.
  const needsCaptcha = !!SITE_KEY;
  const allowed = !needsCaptcha || consent.security;
  const canSubmit = ready && allowed && (!needsCaptcha || scriptReady);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    setStatus({ kind: "sending" });
    try {
      const recaptchaToken = await getRecaptchaToken().catch(() => undefined);
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, recaptchaToken }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus({
          kind: "error",
          message: json.error ?? "Something went wrong while sending your message. Please try again.",
        });
        return;
      }
      form.reset();
      setStatus({ kind: "sent" });
    } catch {
      // fetch itself failed — offline, DNS, server unreachable
      setStatus({
        kind: "error",
        message: "Couldn't reach the server. Please check your connection and try again.",
      });
    }
  }

  const sending = status.kind === "sending";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      {SITE_KEY && consent.security && (
        <Script
          src={`https://www.google.com/recaptcha/enterprise.js?render=${SITE_KEY}`}
          strategy="afterInteractive"
          onLoad={() => setScriptReady(true)}
          onReady={() => setScriptReady(true)}
          onError={() => setScriptFailed(true)}
        />
      )}
      {ready && needsCaptcha && !consent.security && (
        <div role="note" className="rounded-xl border border-sun/40 bg-sun-soft px-4 py-3 text-sm text-sun-fg">
          <p>
            The contact form uses Google reCAPTCHA to block spam, and you haven&apos;t allowed it. Enable it to send a
            message, or email me directly at{" "}
            <a className="font-semibold underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => save({ security: true })}
              className="rounded-full bg-strong px-4 py-2 text-xs font-semibold text-on-strong hover:bg-brand hover:text-white"
            >
              Enable spam protection
            </button>
            <button
              type="button"
              onClick={openSettings}
              className="rounded-full border border-ink/30 px-4 py-2 text-xs font-semibold text-ink hover:bg-surface/60"
            >
              Cookie settings
            </button>
          </div>
        </div>
      )}
      {scriptFailed && (
        <p role="alert" className="rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose-fg">
          The spam check couldn&apos;t load. An ad blocker or privacy extension may be blocking it. Disable it for this
          page, or email me directly at{" "}
          <a className="font-semibold underline" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      )}
      {/* honeypot — hidden from people, bots fill it in */}
      <input
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium text-ink">
          Name
          <input name="name" required maxLength={100} placeholder="Jane Doe" className={`${field} mt-1.5`} />
        </label>
        <label className="block text-sm font-medium text-ink">
          Email
          <input
            name="email"
            type="email"
            required
            maxLength={200}
            placeholder="jane@company.com"
            className={`${field} mt-1.5`}
          />
        </label>
      </div>
      <label className="block text-sm font-medium text-ink">
        What do you need?
        <select name="topic" defaultValue={topics[0]} className={`${field} mt-1.5`}>
          {topics.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </label>
      <label className="block text-sm font-medium text-ink">
        Message
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder="Tell me a bit about your project, timeline and goals…"
          className={`${field} mt-1.5 resize-y`}
        />
      </label>
      <button
        type="submit"
        disabled={sending || !canSubmit}
        className="inline-flex items-center gap-2 rounded-full bg-strong px-7 py-3 text-sm font-semibold text-on-strong transition hover:bg-brand hover:text-white disabled:cursor-not-allowed disabled:opacity-60"
      >
        {sending ? (
          <>
            Sending… <Loader2 size={16} className="animate-spin" />
          </>
        ) : (
          <>
            Send message <Send size={16} />
          </>
        )}
      </button>
      <p className="text-xs leading-relaxed text-ink-faint">
        I use your details only to reply to you. See the{" "}
        <Link className="underline" href="/privacy">
          Privacy Policy
        </Link>
        .
      </p>
      {SITE_KEY && (
        <p className="text-xs leading-relaxed text-ink-faint">
          Protected by reCAPTCHA. Google&apos;s{" "}
          <a className="underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a className="underline" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
            Terms of Service
          </a>{" "}
          apply.
        </p>
      )}
      {status.kind === "sent" && (
        <p role="status" className="rounded-xl bg-mint-soft px-4 py-3 text-sm text-mint-fg">
          Thanks for reaching out, I&apos;ll reply soon
        </p>
      )}
      {status.kind === "error" && (
        <p role="alert" className="rounded-xl bg-rose-soft px-4 py-3 text-sm text-rose-fg">
          {status.message} You can also write me at{" "}
          <a className="font-semibold underline" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
          .
        </p>
      )}
    </form>
  );
}
