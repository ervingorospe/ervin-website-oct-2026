import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import { getProject, projects } from "@/lib/projects";
import { relayErd, relayFlows, relayRbac } from "@/lib/relay-docs";
import {
  cheatDbObjects,
  cheatErd,
  cheatErdCaption,
  cheatFlows,
  cheatRoadmap,
  cheatSetup,
  cheatStructure,
} from "@/lib/cheat-docs";
import { toneClasses } from "@/lib/tones";
import { JsonLd } from "@/components/json-ld";
import { absoluteUrl } from "@/lib/site";
import { MermaidDiagram } from "@/components/mermaid-diagram";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: `${project.title} — Documentation`,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.tagline,
      url: `/projects/${project.slug}`,
    },
    twitter: { title: project.title, description: project.tagline },
  };
}

function Section({
  id,
  num,
  title,
  sub,
  children,
}: {
  id: string;
  num: string;
  title: string;
  sub?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-b border-line py-10 last:border-b-0">
      <h2 className="flex items-baseline gap-3 font-display text-2xl font-semibold tracking-tight text-ink">
        <span className="font-mono text-sm font-semibold text-brand">{num}</span>
        {title}
      </h2>
      {sub && <p className="mb-6 mt-1 max-w-2xl text-sm text-ink-muted">{sub}</p>}
      {!sub && <div className="h-5" />}
      {children}
    </section>
  );
}

function DiagramFrame({ chart, caption }: { chart: string; caption?: string }) {
  return (
    <div>
      <div className="overflow-x-auto rounded-2xl border border-line bg-surface p-4 shadow-card">
        <MermaidDiagram chart={chart} />
      </div>
      {caption && <p className="mt-2 text-xs text-ink-faint">{caption}</p>}
    </div>
  );
}

export default async function ProjectDocsPage({ params }: PageProps<"/projects/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const tone = toneClasses[project.accent];
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  const isRelay = project.extendedDocs === "relay";
  const isCheat = project.extendedDocs === "cheat-library";
  const hasGallery = !!project.gallery?.length;
  const erdChart = isRelay ? relayErd : isCheat ? cheatErd : null;
  const flows = isRelay ? relayFlows : isCheat ? cheatFlows : null;

  // Build the section list once so the pill nav and the numbering stay in sync.
  const sections = [
    { id: "summary", label: "Summary" },
    { id: "stack", label: "Tech Stack" },
    ...(hasGallery ? [{ id: "screens", label: "Screens" }] : []),
    ...(isCheat ? [{ id: "structure", label: "Structure" }] : []),
    ...(isRelay ? [{ id: "rbac", label: "RBAC" }] : []),
    ...(erdChart ? [{ id: "erd", label: "Data Model (ERD)" }] : []),
    ...(flows ? [{ id: "flows", label: "Core Flows" }] : []),
    ...(!flows && project.sitemap ? [{ id: "sitemap", label: "Site Map" }] : []),
    { id: "deploy", label: isCheat ? "Setup & Deployment" : "Deployment" },
    ...(isCheat ? [{ id: "roadmap", label: "Roadmap" }] : []),
  ];
  const n = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  return (
    <div className="mx-auto max-w-[880px] px-4 pb-20 sm:px-6">
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
              { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/projects") },
              { "@type": "ListItem", position: 3, name: project.title, item: absoluteUrl(`/projects/${project.slug}`) },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": project.kind === "Client website" ? "CreativeWork" : "SoftwareApplication",
            name: project.title,
            description: project.summary,
            url: absoluteUrl(`/projects/${project.slug}`),
            image: project.image.startsWith("/") ? absoluteUrl(project.image) : project.image,
            keywords: project.stack.join(", "),
            creator: { "@type": "Person", name: "Ervin Gorospe", url: absoluteUrl("/") },
            ...(project.kind !== "Client website" && {
              applicationCategory: project.kind === "Mobile app" ? "MobileApplication" : "WebApplication",
              operatingSystem: project.kind === "Mobile app" ? "iOS, Android" : "Web",
            }),
            ...(project.url && { sameAs: [project.url] }),
          },
        ]}
      />
      <header className="pt-10 pb-6">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-sm text-ink-muted">
          <Link href="/" className="hover:text-brand">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/projects" className="inline-flex items-center gap-1 hover:text-brand">
            <ArrowLeft size={13} /> Projects
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="font-medium text-ink">
            {project.title}
          </span>
        </nav>
        <p className="mt-6 font-mono text-xs font-semibold uppercase tracking-widest text-brand">
          Project Documentation
        </p>
        <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl">{project.title}</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink-muted">{project.summary}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${tone.soft} ${tone.text}`}>{project.kind}</span>
          <span className="rounded-full bg-sand px-3 py-1 text-xs font-semibold text-ink-muted">{project.industry}</span>
          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold ${
              project.status === "Live" ? "bg-mint-soft text-mint-fg" : "bg-sun-soft text-sun-fg"
            }`}
          >
            {project.status}
          </span>
          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-strong px-4 py-1.5 text-xs font-semibold text-on-strong transition hover:bg-brand hover:text-white"
            >
              Visit live site <ExternalLink size={13} />
            </a>
          )}
        </div>
      </header>

      <nav
        aria-label="Documentation sections"
        className="sticky top-16 z-30 -mx-4 flex gap-1.5 overflow-x-auto border-b border-line bg-background/95 px-4 py-3 backdrop-blur sm:mx-0 sm:px-0"
      >
        {sections.map((s) => (
          <a
            key={s.id}
            href={`#${s.id}`}
            className="shrink-0 whitespace-nowrap rounded-full border border-line bg-surface px-3.5 py-1.5 text-[12.5px] font-semibold text-ink-muted transition hover:border-brand hover:text-brand"
          >
            {s.label}
          </a>
        ))}
      </nav>

      {/* hero image */}
      <div className="mt-8 overflow-hidden rounded-3xl border border-line bg-sand shadow-card">
        <Image
          src={project.image}
          alt={`${project.title} screenshot`}
          width={1440}
          height={900}
          priority
          sizes="(min-width: 880px) 840px, 100vw"
          className="h-auto w-full"
        />
      </div>

      <Section
        id="summary"
        num={n("summary")}
        title="What it does"
        sub={`${project.tagline} Role: ${project.role}.`}
      >
        <div className="grid gap-3 sm:grid-cols-2">
          {project.features.map((f) => (
            <div key={f.title} className="rounded-xl border border-line bg-surface p-4">
              <h3 className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                {f.title}
              </h3>
              <p className="mt-1 text-[13px] leading-relaxed text-ink-muted">{f.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="stack" num={n("stack")} title="Tech stack">
        <div className="overflow-x-auto rounded-xl border border-line bg-surface">
          <table className="w-full text-left text-[13.5px]">
            <thead>
              <tr className="border-b border-line text-[11.5px] uppercase tracking-wide text-ink-faint">
                <th className="px-4 py-2.5 font-semibold">#</th>
                <th className="px-4 py-2.5 font-semibold">Technology</th>
              </tr>
            </thead>
            <tbody>
              {project.stack.map((s, i) => (
                <tr key={s} className="border-b border-line last:border-b-0">
                  <td className="px-4 py-2.5 font-mono text-xs text-ink-faint">{String(i + 1).padStart(2, "0")}</td>
                  <td className="px-4 py-2.5 font-mono text-[12.5px] text-brand">{s}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      {hasGallery && (
        <Section id="screens" num={n("screens")} title="Screens" sub="Captured from the running application.">
          <div className={isCheat ? "grid grid-cols-2 gap-4 sm:grid-cols-3" : "grid gap-4 sm:grid-cols-2"}>
            {project.gallery!.map((g) => (
              <figure key={g.src} className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
                <Image
                  src={g.src}
                  alt={g.caption}
                  width={isCheat ? 590 : 1440}
                  height={isCheat ? 1278 : 900}
                  sizes="(min-width: 640px) 420px, 100vw"
                  className="h-auto w-full"
                />
                <figcaption className="border-t border-line px-4 py-2.5 text-xs text-ink-muted">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Section>
      )}

      {isCheat && (
        <Section
          id="structure"
          num={n("structure")}
          title="Structure & navigation"
          sub="The root layout uses Stack.Protected: signed-out users see only (auth); signed-in users see (tabs) and (main). Data access flows screen → component → hook → lib → Supabase."
        >
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-line text-[11.5px] uppercase tracking-wide text-ink-faint">
                  <th className="px-4 py-2.5 font-semibold">Route / path</th>
                  <th className="px-4 py-2.5 font-semibold">Purpose</th>
                </tr>
              </thead>
              <tbody>
                {cheatStructure.map((r) => (
                  <tr key={r.path} className="border-b border-line align-top last:border-b-0">
                    <td className="px-4 py-2.5 font-mono text-[12.5px] text-brand">{r.path}</td>
                    <td className="px-4 py-2.5 text-ink-muted">{r.text}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {isRelay && (
        <Section
          id="rbac"
          num={n("rbac")}
          title="Roles & permission categories"
          sub="A Role is just a named set of Rules. Every org gets its own roles (cloned from org-less templates), so “Superadmin” in one org is independent from “Superadmin” in another."
        >
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-line text-[11.5px] uppercase tracking-wide text-ink-faint">
                  <th className="px-4 py-2.5 font-semibold">Category</th>
                  <th className="px-4 py-2.5 font-semibold">Example rules</th>
                </tr>
              </thead>
              <tbody>
                {relayRbac.map((r) => (
                  <tr key={r.category} className="border-b border-line align-top last:border-b-0">
                    <td className="px-4 py-2.5 font-medium text-ink">{r.category}</td>
                    <td className="px-4 py-2.5 font-mono text-[12.5px] text-brand">{r.rules}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      {erdChart && (
        <Section
          id="erd"
          num={n("erd")}
          title="Data model (ERD)"
          sub={
            isCheat
              ? "From supabase/migrations. All three public tables have RLS: users can only touch rows where their id matches."
              : "Attribute lists are trimmed to the fields that matter for relationships."
          }
        >
          <DiagramFrame
            chart={erdChart}
            caption={
              isCheat
                ? cheatErdCaption
                : "Not pictured: IdempotencyKey — a standalone table backing the Idempotency-Key header pattern."
            }
          />
          {isCheat && (
            <div className="mt-4 overflow-x-auto rounded-xl border border-line bg-surface">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-line text-[11.5px] uppercase tracking-wide text-ink-faint">
                    <th className="px-4 py-2.5 font-semibold">Object</th>
                    <th className="px-4 py-2.5 font-semibold">What it does</th>
                  </tr>
                </thead>
                <tbody>
                  {cheatDbObjects.map((o) => (
                    <tr key={o.name} className="border-b border-line align-top last:border-b-0">
                      <td className="px-4 py-2.5 font-mono text-[12.5px] text-brand">{o.name}</td>
                      <td className="px-4 py-2.5 text-ink-muted">{o.text}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Section>
      )}

      {flows && (
        <Section
          id="flows"
          num={n("flows")}
          title="Core flows"
          sub={
            isCheat
              ? "The journeys that define how the app is used."
              : "The five user journeys that define how the system gets used, in the order a new org typically hits them."
          }
        >
          <div className="space-y-10">
            {flows.map((f) => (
              <div key={f.step}>
                <h3 className="flex items-center gap-2 text-[15px] font-semibold text-ink">
                  <span className="rounded-md bg-sand px-2 py-0.5 font-mono text-[11px] text-ink-muted">{f.step}</span>
                  {f.title}
                </h3>
                <p className="mb-3 mt-1 max-w-2xl text-[13px] text-ink-muted">{f.desc}</p>
                <DiagramFrame chart={f.chart} />
              </div>
            ))}
          </div>
        </Section>
      )}

      {!flows && project.sitemap && (
        <Section id="sitemap" num={n("sitemap")} title={project.sitemap.title} sub={project.sitemap.desc}>
          <DiagramFrame chart={project.sitemap.chart} />
        </Section>
      )}

      <Section id="deploy" num={n("deploy")} title={isCheat ? "Setup & deployment" : "Deployment"}>
        {isCheat && (
          <pre className="mb-4 overflow-x-auto rounded-xl border border-white/10 bg-night p-4 font-mono text-[12.5px] leading-relaxed text-slate-100">
            <code>{cheatSetup}</code>
          </pre>
        )}
        <ul className="space-y-2.5 text-[13.5px] leading-relaxed text-ink-muted">
          {project.deploy.map((d) => (
            <li key={d} className="flex gap-2.5">
              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-mint" />
              {d}
            </li>
          ))}
        </ul>
      </Section>

      {isCheat && (
        <Section id="roadmap" num={n("roadmap")} title="Roadmap" sub="Open items and what's next.">
          <div className="overflow-x-auto rounded-xl border border-line bg-surface">
            <table className="w-full text-left text-[13.5px]">
              <thead>
                <tr className="border-b border-line text-[11.5px] uppercase tracking-wide text-ink-faint">
                  <th className="px-4 py-2.5 font-semibold">Item</th>
                  <th className="px-4 py-2.5 font-semibold">Type</th>
                </tr>
              </thead>
              <tbody>
                {cheatRoadmap.map((r) => (
                  <tr key={r.item} className="border-b border-line align-top last:border-b-0">
                    <td className="px-4 py-2.5 text-ink-muted">{r.item}</td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
                          r.type === "Critical bug" ? "bg-sun-soft text-sun-fg" : "bg-brand-soft text-brand"
                        }`}
                      >
                        {r.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}

      <footer className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-line bg-surface p-5">
        <p className="text-sm text-ink-muted">Next project</p>
        <Link href={`/projects/${next.slug}`} className="inline-flex items-center gap-1.5 font-display text-base font-semibold text-ink hover:text-brand">
          {next.title} <ArrowUpRight size={17} />
        </Link>
      </footer>
    </div>
  );
}
