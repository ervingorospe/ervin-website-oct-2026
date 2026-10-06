import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/profile";
import { PageHero } from "@/components/page-hero";
import { LegalSection, LegalToc, LEGAL_UPDATED } from "@/components/legal";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How this portfolio collects, uses and protects your personal data when you contact Ervin Gorospe.",
  alternates: { canonical: "/privacy" },
};

const toc = [
  { id: "who", label: "Who I am" },
  { id: "data", label: "What data I collect" },
  { id: "use", label: "Why and on what basis" },
  { id: "sharing", label: "Who it's shared with" },
  { id: "transfers", label: "International transfers" },
  { id: "retention", label: "How long I keep it" },
  { id: "rights", label: "Your rights" },
  { id: "security", label: "Security" },
  { id: "children", label: "Children" },
  { id: "changes", label: "Changes and contact" },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Privacy Policy"
        title={
          <>
            Your data, <span className="text-brand">explained</span>.
          </>
        }
        text="This site has no accounts, no ads and no analytics. The only personal data I handle is what you send through the contact form. Last updated: October 6, 2026."
      />

      <div className="mx-auto max-w-3xl space-y-10 px-4 py-16 sm:px-6">
        <LegalToc items={toc} />

        <LegalSection id="who" title="1. Who I am">
          <p>
            This portfolio is run by <strong className="text-ink">{profile.name}</strong>, an individual software
            developer based in {profile.location}. For the purposes of data-protection law, I am the person responsible
            for your data (the &ldquo;controller&rdquo;). You can reach me at{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
        </LegalSection>

        <LegalSection id="data" title="2. What data I collect">
          <p>
            <strong className="text-ink">When you use the contact form</strong> I receive the name, email address, topic
            and message you type in. I receive them as an email; the site does not keep them in a database.
          </p>
          <p>
            <strong className="text-ink">Technical data.</strong> When you visit, my hosting provider (Vercel)
            automatically processes standard server logs such as your IP address, browser type, requested page and
            time. To limit spam, the contact form also checks your IP address in memory for a few minutes to count
            repeated submissions; it is not saved.
          </p>
          <p>
            <strong className="text-ink">Google reCAPTCHA (only if you allow it).</strong> On the Contact page,
            Google reCAPTCHA collects technical and behavioural signals, such as your IP address and browser details, to
            decide whether you are a person. It does not load unless you agree in the cookie banner.
          </p>
          <p>
            <strong className="text-ink">On your device.</strong> The site stores your cookie choice (a first-party
            cookie) and your light/dark preference (browser storage). See the{" "}
            <Link href="/cookies">Cookie Policy</Link>.
          </p>
          <p>
            I do <strong className="text-ink">not</strong> use analytics, advertising or social-media tracking, I do not
            sell personal data, and I do not do automated decision-making about you.
          </p>
        </LegalSection>

        <LegalSection id="use" title="3. Why I use it, and on what basis">
          <ul>
            <li>
              <strong className="text-ink">To read and reply to your message</strong>, which is needed to respond to your
              request or take steps you ask for (and my legitimate interest in answering inquiries).
            </li>
            <li>
              <strong className="text-ink">To keep the site and form secure</strong> and prevent spam: my legitimate
              interest. The Google reCAPTCHA part is based on your <em>consent</em>, which you can withdraw at any time.
            </li>
            <li>
              <strong className="text-ink">To run and deliver the website</strong> (hosting and server logs): my
              legitimate interest in operating a working site.
            </li>
          </ul>
          <p>
            Where Philippine law applies (the Data Privacy Act of 2012, RA 10173), I process data for these same
            purposes, based on your consent, your request, or legitimate interests. Where the GDPR or UK GDPR applies, the
            legal bases are those listed above.
          </p>
        </LegalSection>

        <LegalSection id="sharing" title="4. Who it's shared with">
          <p>I don&apos;t sell or rent your data. It is handled by these service providers, only as needed to run the site:</p>
          <ul>
            <li>
              <strong className="text-ink">Vercel</strong>: hosts the website and processes server logs.
            </li>
            <li>
              <strong className="text-ink">Amazon Web Services (Amazon SES)</strong>: sends the contact-form email from
              the site to my inbox.
            </li>
            <li>
              <strong className="text-ink">Google</strong>: provides my mailbox (Gmail), where your message arrives, and,
              if you allow it, reCAPTCHA. See Google&apos;s{" "}
              <a href="https://policies.google.com/privacy" target="_blank" rel="noreferrer">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="https://policies.google.com/terms" target="_blank" rel="noreferrer">
                Terms
              </a>
              .
            </li>
          </ul>
          <p>
            I may also disclose information if the law requires it. Links to other sites (client projects, LinkedIn,
            GitHub) lead to services with their own privacy policies; I&apos;m not responsible for them.
          </p>
        </LegalSection>

        <LegalSection id="transfers" title="5. International transfers">
          <p>
            These providers operate in several countries, so your data may be processed outside the country where you
            live, including in the United States and Singapore. Where required, providers rely on recognised safeguards
            such as standard contractual clauses.
          </p>
        </LegalSection>

        <LegalSection id="retention" title="6. How long I keep it">
          <p>
            Contact-form messages stay in my email inbox for as long as needed to handle your inquiry and any follow-up
            work, and are then deleted. Hosting and security logs are kept by the provider for their standard period. The
            consent cookie lasts 6 months. You can ask me to delete your message at any time.
          </p>
        </LegalSection>

        <LegalSection id="rights" title="7. Your rights">
          <p>Depending on where you live, you may have the right to:</p>
          <ul>
            <li>know what personal data I hold about you and get a copy;</li>
            <li>have inaccurate data corrected, or your data erased or blocked;</li>
            <li>object to or restrict how I use it, and ask for it in a portable format;</li>
            <li>withdraw consent at any time (for example, change your choice with the button below), without affecting earlier use;</li>
            <li>be compensated for damages caused by a data-protection violation, where the law provides this.</li>
          </ul>
          <p>
            To use any of these, email <a href={`mailto:${profile.email}`}>{profile.email}</a>. I may need to confirm it&apos;s
            you. You also have the right to complain to a data-protection authority: in the Philippines, the{" "}
            <a href="https://privacy.gov.ph" target="_blank" rel="noreferrer">
              National Privacy Commission
            </a>
            ; in the EU/UK, your local supervisory authority.
          </p>
          <p>
            <CookieSettingsButton className="rounded-full border border-line bg-surface px-4 py-2 text-sm font-semibold !text-ink !no-underline hover:border-brand hover:!text-brand">
              Change my cookie choice
            </CookieSettingsButton>
          </p>
        </LegalSection>

        <LegalSection id="security" title="8. Security">
          <p>
            The site is served over HTTPS, contact-form messages are validated and rate-limited, and secret keys are kept
            on the server, not in the website code. No method of transmission or storage is perfectly secure, but I take
            reasonable steps to protect your data.
          </p>
        </LegalSection>

        <LegalSection id="children" title="9. Children">
          <p>
            This site is not aimed at children, and I don&apos;t knowingly collect data from anyone under 13 (or the
            minimum age in your country). If you think a child has sent me their data, email me and I&apos;ll delete it.
          </p>
        </LegalSection>

        <LegalSection id="changes" title="10. Changes and contact">
          <p>
            If I add features that change how data is handled (for example analytics), I&apos;ll update this page and the
            date at the top. Questions about this policy:{" "}
            <a href={`mailto:${profile.email}`}>{profile.email}</a>.
          </p>
          <p>
            Last updated: {LEGAL_UPDATED}. Also see the <Link href="/cookies">Cookie Policy</Link>.
          </p>
        </LegalSection>
      </div>
    </>
  );
}
