import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { services, process } from "@/lib/services";
import { toneClasses } from "@/lib/tones";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/section-heading";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Services",
  description: "Web development, mobile apps, backend APIs, SEO, database design and cloud/CI-CD services.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Services offered by Ervin Gorospe",
          itemListElement: services.map((s, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: s.title,
              description: s.blurb,
              url: absoluteUrl("/services"),
              provider: { "@type": "Person", name: "Ervin Gorospe", url: absoluteUrl("/") },
            },
          })),
        }}
      />
      <PageHero
        eyebrow="Services"
        title={
          <>
            How I can <span className="text-brand">help</span> your product.
          </>
        }
        text="Hire me for a single piece of the puzzle or the whole thing — interface, API, database, deployment."
      >
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
        >
          Start a project <ArrowRight size={16} />
        </Link>
      </PageHero>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const t = toneClasses[s.tone];
            return (
              <Reveal key={s.slug} delay={(i % 3) * 90}>
                <article className="flex h-full flex-col rounded-3xl border border-line bg-surface p-7 shadow-card transition hover:-translate-y-1 hover:shadow-lift">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${t.soft} ${t.text}`}>
                    <s.icon size={26} />
                  </span>
                  <h2 className="mt-5 font-display text-xl font-semibold text-ink">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.blurb}</p>
                  <ul className="mt-5 space-y-2.5 border-t border-line pt-5 text-sm text-ink-muted">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex gap-2.5">
                        <Check size={16} className={`mt-0.5 shrink-0 ${t.text}`} />
                        {b}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </section>

      <section className="border-y border-line bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
          <Reveal>
            <SectionHeading eyebrow="Process" title="How we'd work together" align="center" />
          </Reveal>
          <ol className="mt-12 grid gap-4 md:grid-cols-4">
            {process.map((p, i) => (
              <Reveal key={p.step} delay={i * 90}>
                <li className="relative h-full list-none rounded-3xl border border-line bg-background p-6">
                  <span className="font-mono text-sm font-semibold text-brand">{p.step}</span>
                  <h3 className="mt-3 font-display text-lg font-semibold text-ink">{p.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">{p.text}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
