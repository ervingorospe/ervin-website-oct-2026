import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/lib/profile";
import { navLinks } from "@/lib/nav";
import { Logo } from "./logo";
import { CookieSettingsButton } from "./cookie-settings-button";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <Logo size={32} />
            <span className="font-display text-lg font-semibold">{profile.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-muted">
            {profile.role} building web and mobile products end to end — React, Next.js, NestJS and
            PostgreSQL.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition hover:border-ink hover:text-ink"
            >
              <FaGithub size={18} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition hover:border-brand hover:text-brand"
            >
              <FaLinkedin size={18} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              aria-label="Email"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink-muted transition hover:border-mint hover:text-emerald-600"
            >
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Pages</h3>
          <ul className="mt-4 space-y-2.5 text-sm">
            {navLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-ink-muted hover:text-brand">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-ink-faint">Contact</h3>
          <ul className="mt-4 space-y-3 text-sm text-ink-muted">
            <li className="flex items-start gap-2.5">
              <Mail size={16} className="mt-0.5 shrink-0 text-brand" />
              <a href={`mailto:${profile.email}`} className="break-all hover:text-brand">
                {profile.email}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <Phone size={16} className="mt-0.5 shrink-0 text-brand" />
              <a href="tel:+639304866849" className="hover:text-brand">
                {profile.phone}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <MapPin size={16} className="mt-0.5 shrink-0 text-brand" />
              {profile.location}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-ink-faint sm:px-6">
          © {new Date().getFullYear()} {profile.name}. Built with Next.js &amp; Tailwind CSS.
          <span className="mx-2 text-line">·</span>
          <Link href="/cookies" className="hover:text-brand">
            Cookies &amp; privacy
          </Link>
          <span className="mx-2 text-line">·</span>
          <CookieSettingsButton className="hover:text-brand" />
        </p>
      </div>
    </footer>
  );
}
