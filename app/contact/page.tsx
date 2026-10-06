import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile } from "@/lib/profile";
import { PageHero } from "@/components/page-hero";
import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Ervin Gorospe about a website, web app, mobile app or backend project.",
  alternates: { canonical: "/contact" },
};

const channels = [
  { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, tone: "bg-brand-soft text-brand" },
  { icon: Phone, label: "Phone", value: profile.phone, href: "tel:+639304866849", tone: "bg-mint-soft text-emerald-600" },
  { icon: FaLinkedin, label: "LinkedIn", value: "ervin-gorospe-dev0109", href: profile.linkedin, tone: "bg-brand-soft text-brand" },
  { icon: FaGithub, label: "GitHub", value: "ervingorospe", href: profile.github, tone: "bg-sand text-ink" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s <span className="text-brand">talk</span> about your project.
          </>
        }
        text="Send a message and I'll reply as soon as I can. Prefer email or LinkedIn? Those work too."
      />

      <section className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="rounded-3xl border border-line bg-surface p-6 shadow-card sm:p-9">
            <h2 className="font-display text-2xl font-semibold text-ink">Send a message</h2>
            <p className="mb-7 mt-1 text-sm text-ink-muted">All fields are required.</p>
            <ContactForm />
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="space-y-4">
            {channels.map((c) => (
              <a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${c.tone}`}>
                  <c.icon size={20} />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-wider text-ink-faint">{c.label}</span>
                  <span className="block truncate text-sm font-medium text-ink">{c.value}</span>
                </span>
              </a>
            ))}
            <div className="flex items-start gap-4 rounded-2xl border border-dashed border-line bg-sand/60 p-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-sun-soft text-amber-600">
                <MapPin size={20} />
              </span>
              <div>
                <p className="text-sm font-medium text-ink">{profile.location}</p>
                <p className="mt-1 flex items-center gap-1.5 text-xs text-ink-muted">
                  <Clock size={13} /> Available for remote work worldwide
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
