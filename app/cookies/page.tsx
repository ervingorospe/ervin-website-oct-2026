import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/profile";
import { PageHero } from "@/components/page-hero";
import { LegalSection, LegalToc, LEGAL_UPDATED } from "@/components/legal";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Which cookies and browser storage this portfolio uses, why, and how to change your choice.",
  alternates: { canonical: "/cookies" },
};

const toc = [
  { id: "what", label: "What cookies are" },
  { id: "used", label: "What this site uses" },
  { id: "recaptcha", label: "Google reCAPTCHA" },
  { id: "manage", label: "Managing your choice" },
  { id: "changes", label: "Changes and contact" },
];

const th = "px-4 py-2.5 text-[11.5px] font-semibold uppercase tracking-wide text-ink-faint";
const td = "px-4 py-3 align-top text-[13.5px] text-ink-muted";

export default function CookiePolicyPage() {
  return (
    <>
      <PageHero
        eyebrow="Cookie Policy"
        title={
          <>
            What this site <span className="text-brand">stores</span> on your device.
          </>
        }
        text="Short version: no ads, no analytics, no tracking. One cookie remembers your choice, your light/dark preference stays in your browser, and Google reCAPTCHA is used only on the contact form, only if you allow it. Last updated: October 6, 2026."
      >
        <CookieSettingsButton className="inline-flex items-center rounded-full bg-strong px-6 py-3 text-sm font-semibold text-on-strong transition hover:bg-brand hover:text-white">
          Change my cookie choice
        </CookieSettingsButton>
      </PageHero>

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6">
        <LegalToc items={toc} />

        <LegalSection id="what" title="1. What cookies are">
          <p>
            Cookies are small text files a website saves in your browser. Similar technologies, such as the
            browser&apos;s local storage, work in a comparable way. They can keep a setting, remember a choice, or (on many
            sites) track you across pages. This site uses them only for the first two.
          </p>
        </LegalSection>

        <LegalSection id="used" title="2. What this site uses">
          <div className="overflow-x-auto rounded-2xl border border-line bg-surface">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-line">
                  <th className={th}>Name</th>
                  <th className={th}>Type</th>
                  <th className={th}>Purpose</th>
                  <th className={th}>Lasts</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-line">
                  <td className={`${td} font-mono text-xs text-brand`}>portfolio_consent</td>
                  <td className={td}>First-party cookie. Strictly necessary.</td>
                  <td className={td}>Remembers your cookie choice. Contains no personal data.</td>
                  <td className={td}>6 months</td>
                </tr>
                <tr className="border-b border-line">
                  <td className={`${td} font-mono text-xs text-brand`}>portfolio_theme</td>
                  <td className={td}>First-party browser storage (not a cookie). Functional.</td>
                  <td className={td}>Remembers light or dark mode. Never sent to any server.</td>
                  <td className={td}>Until you clear site data</td>
                </tr>
                <tr>
                  <td className={`${td} font-mono text-xs text-brand`}>Google reCAPTCHA</td>
                  <td className={td}>Third-party (Google). Optional, needs your consent.</td>
                  <td className={td}>
                    Spam protection on the contact form. Loads only on the Contact page and only if you allow it.
                  </td>
                  <td className={td}>Set by Google</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p>
            Nothing else: no analytics, advertising or social-media trackers. Photos from Unsplash are fetched by this
            site&apos;s server, so your browser doesn&apos;t contact Unsplash. The hosting provider (Vercel) keeps standard
            server logs, which isn&apos;t a cookie; see the <Link href="/privacy">Privacy Policy</Link>.
          </p>
        </LegalSection>

        <LegalSection id="recaptcha" title="3. Google reCAPTCHA">
          <p>
            If you allow it, Google receives technical data such as your IP address and browser details to decide whether
            you&apos;re a person, and may set its own cookies. This is governed by Google&apos;s{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
              Terms of Service
            </a>
            . If you don&apos;t allow it, the contact form stays disabled and you can email me directly instead.
          </p>
        </LegalSection>

        <LegalSection id="manage" title="4. Managing your choice">
          <ul>
            <li>
              Use the button at the top of this page, or <strong className="text-ink">Cookie settings</strong> in the
              footer, to change your choice at any time. Turning reCAPTCHA off takes effect right away.
            </li>
            <li>
              You can also delete the <code className="font-mono text-xs">portfolio_consent</code> cookie in your browser
              settings, and the banner will appear again.
            </li>
            <li>Most browsers let you block or delete cookies and site data entirely; the site still works, but the contact form needs reCAPTCHA.</li>
          </ul>
        </LegalSection>

        <LegalSection id="changes" title="5. Changes and contact">
          <p>
            If I add any new cookie or tracking tool, I&apos;ll update this page and ask for your consent first. Questions:{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>. See also the{" "}
            <Link href="/privacy">Privacy Policy</Link>. Last updated: {LEGAL_UPDATED}.
          </p>
        </LegalSection>
      </div>
    </>
  );
}
