"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Cookie, ShieldCheck, X } from "lucide-react";
import { useConsent } from "./consent-provider";

const btnBase =
  "inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
// Accept and Reject get identical visual weight on purpose (no dark-pattern nudging).
const btnPrimary = `${btnBase} border border-ink bg-ink text-white hover:bg-brand hover:border-brand`;
const btnSecondary = `${btnBase} border border-ink bg-surface text-ink hover:bg-sand`;
const btnGhost = `${btnBase} text-ink-muted underline-offset-4 hover:text-brand hover:underline`;

export function CookieBanner() {
  const { ready, decided, settingsOpen, openSettings, save } = useConsent();

  if (!ready) return null;

  return (
    <>
      {!decided && !settingsOpen && (
        <div
          role="region"
          aria-label="Cookie notice"
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-3xl rounded-3xl border border-line bg-surface p-5 shadow-2xl sm:bottom-5 sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-sun-soft text-amber-600 sm:flex">
              <Cookie size={22} />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-base font-semibold text-ink">Your privacy choices</h2>
              <p className="mt-1 text-sm leading-relaxed text-ink-muted">
                This site has no ads or analytics. The only optional cookie comes from Google reCAPTCHA, which
                protects the contact form from spam and loads only on the Contact page. Choose whether to allow it.{" "}
                <Link href="/cookies" className="font-medium text-brand underline underline-offset-2">
                  Cookies &amp; privacy
                </Link>
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-2.5">
                <button type="button" className={btnSecondary} onClick={() => save({ security: false })}>
                  Reject non-essential
                </button>
                <button type="button" className={btnPrimary} onClick={() => save({ security: true })}>
                  Accept all
                </button>
                <button type="button" className={btnGhost} onClick={openSettings}>
                  Customize
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {settingsOpen && <PreferencesDialog />}
    </>
  );
}

function PreferencesDialog() {
  const { consent, decided, save, closeSettings } = useConsent();
  const [security, setSecurity] = useState(consent.security);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeSettings();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [closeSettings]);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/40 p-3 backdrop-blur-sm sm:items-center">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-title"
        tabIndex={-1}
        className="w-full max-w-lg rounded-3xl border border-line bg-surface p-6 shadow-2xl outline-none"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-title" className="font-display text-xl font-semibold text-ink">
              Cookie preferences
            </h2>
            <p className="mt-1 text-sm text-ink-muted">
              {decided ? "Update your choice at any time." : "Pick what you're comfortable with."}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={closeSettings}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-line text-ink-muted hover:text-ink"
          >
            <X size={16} />
          </button>
        </div>

        <ul className="mt-5 space-y-3">
          <li className="rounded-2xl border border-line bg-background p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold text-ink">Strictly necessary</p>
              <span className="rounded-full bg-sand px-2.5 py-1 text-[11px] font-semibold text-ink-muted">
                Always on
              </span>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              One first-party cookie, <code className="font-mono text-xs">portfolio_consent</code>, remembers this choice
              for 6 months. It holds no personal data.
            </p>
          </li>

          <li className="rounded-2xl border border-line bg-background p-4">
            <div className="flex items-center justify-between gap-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                <ShieldCheck size={16} className="text-brand" /> Spam protection (Google reCAPTCHA)
              </p>
              <button
                type="button"
                role="switch"
                aria-checked={security}
                aria-label="Spam protection (Google reCAPTCHA)"
                onClick={() => setSecurity((v) => !v)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${security ? "bg-brand" : "bg-ink-faint/60"}`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${security ? "left-[22px]" : "left-0.5"}`}
                />
              </button>
            </div>
            <p className="mt-1.5 text-[13px] leading-relaxed text-ink-muted">
              Loads Google&apos;s script on the Contact page to tell people from bots. Google may set cookies and
              receives your IP address and browser details. If you turn this off, the contact form is disabled and
              you can email me directly instead.
            </p>
          </li>
        </ul>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-2.5">
          <button type="button" className={btnSecondary} onClick={() => save({ security: false })}>
            Reject non-essential
          </button>
          <button type="button" className={btnSecondary} onClick={() => save({ security })}>
            Save choices
          </button>
          <button type="button" className={btnPrimary} onClick={() => save({ security: true })}>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
