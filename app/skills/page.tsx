import type { Metadata } from "next";
import { skillGroups } from "@/lib/skills";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Skills",
  description: "The languages, frameworks, databases, cloud services and tools Ervin Gorospe works with.",
  alternates: { canonical: "/skills" },
};

export default function SkillsPage() {
  return (
    <>
      <PageHero
        eyebrow="Skills & tools"
        title={
          <>
            The stack I <span className="text-brand">ship</span> with.
          </>
        }
        text="React and Next.js on the front, NestJS and PostgreSQL behind it, deployed on AWS and Vercel — plus a handful of other stacks from past teams."
      />

      <div className="mx-auto max-w-6xl space-y-16 px-4 py-20 sm:px-6">
        {skillGroups.map((g, gi) => (
          <section key={g.title}>
            <Reveal>
              <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-line pb-4">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{g.title}</h2>
                <p className="text-sm text-ink-muted">{g.blurb}</p>
              </div>
            </Reveal>
            <div
              className={`mt-6 grid gap-4 ${
                gi === 0 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4"
              }`}
            >
              {g.skills.map((s, i) => (
                <Reveal key={s.name} delay={(i % 4) * 70}>
                  <div
                    className={`group flex h-full items-center gap-4 rounded-2xl border border-line bg-surface shadow-card transition hover:-translate-y-0.5 hover:shadow-lift ${
                      gi === 0 ? "flex-col p-6 text-center" : "p-4"
                    }`}
                  >
                    <span
                      className={`flex shrink-0 items-center justify-center rounded-xl transition group-hover:scale-110 dark:brightness-[1.45] dark:saturate-[1.15] ${
                        gi === 0 ? "h-14 w-14" : "h-11 w-11"
                      }`}
                      style={{ backgroundColor: `color-mix(in srgb, ${s.color} 9%, transparent)`, color: s.color }}
                    >
                      <s.icon size={gi === 0 ? 28 : 22} />
                    </span>
                    <span className={`font-medium text-ink ${gi === 0 ? "text-base" : "text-sm"}`}>{s.name}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
