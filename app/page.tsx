import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  MapPin,
  Sparkles,
  Code2,
  Smartphone,
  Server,
  SearchCheck,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { profile, stats, experience } from "@/lib/profile";
import { mainStack } from "@/lib/skills";
import { projects } from "@/lib/projects";
import { services } from "@/lib/services";
import { toneClasses } from "@/lib/tones";
import { ProjectCard } from "@/components/project-card";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: { absolute: "Ervin Gorospe — Full-Stack Developer · React, Next.js, NestJS" },
  description:
    "Ervin Gorospe is a full-stack developer with 6+ years of experience building SEO-ready Next.js websites, React Native apps and NestJS + PostgreSQL backends. See projects and get in touch.",
  alternates: { canonical: "/" },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  jobTitle: profile.role,
  email: profile.email,
  address: { "@type": "PostalAddress", addressRegion: "Metro Manila", addressCountry: "PH" },
  image: absoluteUrl(profile.photo),
  url: absoluteUrl("/"),
  sameAs: [profile.github, profile.linkedin],
  knowsAbout: ["Next.js", "React", "React Native", "NestJS", "PostgreSQL", "TypeScript", "SEO"],
};

export default function HomePage() {
  const featured = projects.filter((p) => p.slug !== "cheat-library").slice(0, 3);
  const tickerStack = [...mainStack, { name: "SEO", icon: SearchCheck, color: "#f43f5e" }];
  const tickerItems = [...tickerStack, ...tickerStack];

  return (
    <>
      <JsonLd data={personJsonLd} />
      {/* HERO */}
      <section className="relative overflow-hidden bg-dots">
        <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 animate-blob bg-brand/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-96 w-96 animate-blob bg-mint/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink-muted shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-mint" />
              </span>
              Open to new opportunities
            </span>
            <h1 className="mt-6 font-display text-5xl font-bold leading-[1.04] tracking-tight text-ink sm:text-6xl lg:text-7xl">
              Hi, I&apos;m <span className="text-brand">Ervin</span>.
              <br />
              I build things for the{" "}
              <span className="relative whitespace-nowrap">
                <span className="relative z-10">web &amp; mobile</span>
                <span className="absolute inset-x-0 bottom-1 -z-0 h-3 rounded-sm bg-sun/50 sm:h-4" />
              </span>
              .
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{profile.summary}</p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 rounded-full bg-strong px-6 py-3 text-sm font-semibold text-on-strong shadow-lg shadow-night/20 transition hover:bg-brand hover:text-white"
              >
                View my work <ArrowRight size={16} />
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:border-ink"
              >
                Let&apos;s talk
              </Link>
              <a
                href="/Ervin_Gorospe_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-2 py-3 text-sm font-semibold text-ink-muted transition hover:text-brand"
              >
                <Download size={16} /> Resume
              </a>
            </div>

            <div className="mt-8 flex items-center gap-4 text-sm text-ink-muted">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} className="text-brand" /> {profile.location}
              </span>
              <span className="h-4 w-px bg-line" />
              <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-ink">
                <FaGithub size={18} />
              </a>
              <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-brand">
                <FaLinkedin size={18} />
              </a>
            </div>
          </div>

          {/* portrait */}
          <div className="relative mx-auto w-full max-w-sm">
            <div className="absolute -inset-3 rotate-3 rounded-[2.5rem] bg-gradient-to-br from-brand/30 via-mint/30 to-sun/30" />
            <div className="relative overflow-hidden rounded-[2.25rem] border-4 border-surface bg-sand shadow-2xl">
              <Image
                src={profile.photo}
                alt="Portrait of Ervin Gorospe"
                width={1500}
                height={2000}
                priority
                sizes="(min-width: 1024px) 380px, 80vw"
                className="aspect-[4/5] w-full object-cover object-top"
              />
            </div>
            <div className="animate-floaty absolute -left-4 top-10 flex items-center gap-2 rounded-2xl border border-line bg-surface px-3.5 py-2.5 shadow-card sm:-left-10" style={{ ["--r" as string]: "-4deg" }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-soft text-brand">
                <Code2 size={17} />
              </span>
              <div className="text-xs">
                <p className="font-semibold text-ink">6+ years</p>
                <p className="text-ink-faint">shipping code</p>
              </div>
            </div>
            <div className="animate-floaty absolute -right-3 bottom-16 flex items-center gap-2 rounded-2xl border border-line bg-surface px-3.5 py-2.5 shadow-card sm:-right-8" style={{ ["--r" as string]: "3deg", animationDelay: "1.2s" }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-mint-soft text-mint-fg">
                <Smartphone size={17} />
              </span>
              <div className="text-xs">
                <p className="font-semibold text-ink">Web + Mobile</p>
                <p className="text-ink-faint">end to end</p>
              </div>
            </div>
            <div className="animate-floaty absolute -bottom-4 left-6 flex items-center gap-2 rounded-2xl border border-line bg-surface px-3.5 py-2.5 shadow-card" style={{ ["--r" as string]: "-2deg", animationDelay: "2.2s" }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sun-soft text-sun-fg">
                <Server size={17} />
              </span>
              <div className="text-xs">
                <p className="font-semibold text-ink">NestJS · Postgres</p>
                <p className="text-ink-faint">currently at WhiteCloak</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TECH TICKER */}
      <section className="marquee overflow-hidden border-y border-line bg-surface py-5" aria-label="Main tech stack">
        <div className="animate-marquee flex w-max gap-4">
          {tickerItems.map((s, i) => (
            <span
              key={`${s.name}-${i}`}
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-background px-4 py-2 text-sm font-medium text-ink-muted"
            >
              <s.icon size={18} style={{ color: s.color }} />
              {s.name}
            </span>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 80}>
              <div className="h-full rounded-3xl border border-line bg-surface p-6 shadow-card">
                <p className="font-display text-4xl font-bold tracking-tight text-ink">{s.value}</p>
                <p className="mt-2 text-sm leading-snug text-ink-muted">{s.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FEATURED PROJECTS */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="Selected work"
              title="Projects I'm proud of"
              text="Live websites and apps — each one has its own documentation page with features, stack, diagrams and screenshots."
            />
            <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
              All projects <ArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p, i) => (
            <Reveal key={p.slug} delay={i * 90}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES TEASER */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="What I do"
            title="From idea to production"
            text="A single developer who can own the interface, the API, the database and the deployment."
          />
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.filter((x) => ["web-development", "mobile-apps", "seo-performance"].includes(x.slug)).map((s, i) => {
            const t = toneClasses[s.tone];
            return (
              <Reveal key={s.slug} delay={i * 90}>
                <div className="h-full rounded-3xl border border-line bg-surface p-6 shadow-card">
                  <span className={`flex h-12 w-12 items-center justify-center rounded-2xl ${t.soft} ${t.text}`}>
                    <s.icon size={22} />
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.blurb}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
        <div className="mt-8">
          <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            See all services <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* EXPERIENCE SNAPSHOT */}
      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Where I've worked" title="Seven teams, one through-line: ship it well" />
          </Reveal>
          <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {experience.slice(0, 4).map((e, i) => (
              <Reveal key={e.company} delay={i * 80}>
                <div className="h-full rounded-2xl border border-line bg-background p-5">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">{e.period}</p>
                  <p className="mt-2 font-display text-lg font-semibold text-ink">{e.company}</p>
                  <p className="text-sm text-ink-muted">{e.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/about" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
              Full experience <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-night px-8 py-14 text-center text-white sm:px-14">
            <div className="pointer-events-none absolute -left-10 -top-10 h-56 w-56 rounded-full bg-brand/40 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full bg-mint/30 blur-3xl" />
            <Sparkles className="relative mx-auto text-sun" size={28} />
            <h2 className="relative mx-auto mt-4 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
              Have a project in mind? Let&apos;s build it together.
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-slate-300">
              Websites, web apps, APIs or mobile apps — tell me what you need and I&apos;ll get back to you.
            </p>
            <Link
              href="/contact"
              className="relative mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3 text-sm font-semibold text-night transition hover:bg-mint hover:text-white"
            >
              Get in touch <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
