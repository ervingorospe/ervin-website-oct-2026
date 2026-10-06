import type { Metadata } from "next";
import Image from "next/image";
import { GraduationCap, Award, Briefcase, Heart, Layers, Search, Database, Compass } from "lucide-react";
import { profile, experience, education, certificates, strengths } from "@/lib/profile";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "About",
  description: "Ervin Gorospe's background, experience, education and what he brings to a team.",
  alternates: { canonical: "/about" },
};

const strengthIcons = [Compass, Layers, Search, Database];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About me"
        title={
          <>
            A developer who cares about <span className="text-brand">clean code</span> and the people who use it.
          </>
        }
        text={profile.about}
      />

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <div className="relative">
            <div className="absolute -inset-3 -rotate-2 rounded-[2rem] bg-gradient-to-br from-sun/30 to-brand/20" />
            <Image
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80"
              alt="Laptop showing code on a desk"
              width={1400}
              height={933}
              className="relative aspect-[4/3] w-full rounded-[1.75rem] border-4 border-surface object-cover shadow-xl"
            />
          </div>
        </Reveal>
        <Reveal delay={100}>
          <SectionHeading eyebrow="The short version" title="Full-stack, end to end" />
          <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
            <p>
              I&apos;ve spent six years across seven teams — from small startups to Accenture — building web and mobile
              products. I started on Vue.js and PHP, moved into React and Next.js, and now spend most of my time on
              NestJS APIs and PostgreSQL.
            </p>
            <p>
              At Modiphy I shipped Next.js websites for US businesses and tuned them for search with server-side
              rendering, metadata and performance work. At MyDesk I led the architecture of an internal HR platform.
              Most recently I&apos;ve been focused on backend services at WhiteCloak.
            </p>
            <p className="flex items-center gap-2 font-medium text-ink">
              <Heart size={18} className="text-rose" /> Currently based in {profile.location}.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="What I bring" title="Strengths you can count on" />
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => {
              const Icon = strengthIcons[i];
              return (
                <Reveal key={s.title} delay={i * 80}>
                  <div className="h-full rounded-3xl border border-line bg-background p-6">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-soft text-brand">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-4 font-display text-lg font-semibold text-ink">{s.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Experience" title="Where I've worked" />
        </Reveal>
        <ol className="relative mt-12 space-y-8 border-l-2 border-line pl-8">
          {experience.map((e, i) => (
            <li key={e.company} className="relative">
              <span className="absolute -left-[41px] top-1.5 flex h-5 w-5 items-center justify-center rounded-full border-2 border-brand bg-background">
                {i === 0 && <span className="h-2 w-2 rounded-full bg-brand" />}
              </span>
              <Reveal>
                <div className="rounded-3xl border border-line bg-surface p-6 shadow-card">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="flex items-center gap-2 font-display text-xl font-semibold text-ink">
                        <Briefcase size={18} className="text-brand" /> {e.company}
                      </h3>
                      <p className="text-sm font-medium text-ink-muted">{e.role}</p>
                    </div>
                    <span className="rounded-full bg-sand px-3 py-1 font-mono text-xs text-ink-muted">{e.period}</span>
                  </div>
                  <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-muted">
                    {e.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {e.stack.map((s) => (
                      <span key={s} className="rounded-md bg-brand-soft px-2 py-1 font-mono text-[11px] font-medium text-brand">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="border-t border-line bg-surface">
        <div className="mx-auto grid max-w-6xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-3xl border border-line bg-background p-7">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                <GraduationCap className="text-brand" /> Education
              </h3>
              <ul className="mt-5 space-y-5">
                {education.map((e) => (
                  <li key={e.school}>
                    <p className="font-semibold text-ink">{e.school}</p>
                    <p className="font-mono text-xs text-ink-faint">{e.period}</p>
                    <p className="mt-1 text-sm text-ink-muted">{e.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="h-full rounded-3xl border border-line bg-background p-7">
              <h3 className="flex items-center gap-2 font-display text-xl font-semibold">
                <Award className="text-sun" /> Certificates &amp; awards
              </h3>
              <ul className="mt-5 space-y-4">
                {certificates.map((c) => (
                  <li key={c} className="flex gap-3 text-sm leading-relaxed text-ink-muted">
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sun" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
