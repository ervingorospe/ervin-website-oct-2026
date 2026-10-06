import type { Metadata } from "next";
import { profile } from "@/lib/profile";
import { PageHero } from "@/components/page-hero";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

export const metadata: Metadata = {
  title: "Cookies & privacy",
  description: "What cookies and data this portfolio uses, and how to change your choice.",
  alternates: { canonical: "/cookies" },
};

const th = "px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-ink-faint";
const td = "px-4 py-3 align-top text-[13.5px] text-ink-muted";

export default function CookiesPage() {
  return (
    <>
      <PageHero
        eyebrow="Cookies & privacy"
        title={
          <>
            What this site <span className="text-brand">stores</span> and shares.
          </>
        }
        text="Short version: no ads, no analytics, no tracking. One cookie remembers your choice, and Google reCAPTCHA is used only on the contact form, only if you allow it."
      >
        <CookieSettingsButton className="inline-flex items-center rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand">
          Change my cookie choice
        </CookieSettingsButton>
      </PageHero>

      <div className="mx-auto max-w-3xl space-y-12 px-4 py-16 sm:px-6">
        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Cookies</h2>
          <div className="mt-5 overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className={th}>Name</th>
                  <th className={th}>Who</th>
                  <th className={th}>Purpose</th>
                  <th className={th}>Lasts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className={`${td} font-mono text-xs text-brand`}>portfolio_consent</td>
                  <td className={td}>This site (first-party)</td>
                  <td className={td}>Remembers your cookie choice. Always on, contains no personal data.</td>
                  <td className={td}>6 months</td>
                </tr>
                <tr>
                  <td className={`${td} font-mono text-xs text-brand`}>Google reCAPTCHA</td>
                  <td className={td}>Google (third-party)</td>
                  <td className={td}>
                    Spam protection on the contact form. Loads only on the Contact page and only if you allow it. Google
                    may set its own cookies there.
                  </td>
                  <td className={td}>Set by Google</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-ink-muted">
            Nothing else: no analytics, advertising or social-media trackers. Photos from Unsplash are fetched by this
            site&apos;s server, so your browser doesn&apos;t contact Unsplash.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Google reCAPTCHA</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            If you allow it, Google receives technical data such as your IP address and browser details to decide
            whether you&apos;re a person. This is governed by Google&apos;s{" "}
            <a className="text-brand underline" href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a className="text-brand underline" href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
              Terms of Service
            </a>
            . If you don&apos;t allow it, the contact form stays disabled and you can email me directly instead.
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Contact form data</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            When you send a message I receive your name, email address, topic and message by email (delivered through
            Amazon SES). I use it only to reply to you. Your IP address is used briefly in memory to limit repeated
            submissions and is not stored. To have a message deleted, email{" "}
            <a className="text-brand underline" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="font-display text-2xl font-semibold text-ink">Changing your mind</h2>
          <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
            Use the button above or &ldquo;Cookie settings&rdquo; in the footer at any time. You can also delete the{" "}
            <code className="font-mono text-xs">portfolio_consent</code> cookie in your browser and the banner will
            appear again.
          </p>
        </section>
      </div>
    </>
  );
}
