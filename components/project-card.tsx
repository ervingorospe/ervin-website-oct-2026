import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/projects";
import { toneClasses } from "@/lib/tones";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  const tone = toneClasses[project.accent];
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-sand">
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw"
          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${tone.soft} ${tone.text}`}
        >
          {project.kind}
        </span>
        {project.status !== "Live" && (
          <span className="absolute right-3 top-3 rounded-full bg-strong px-2.5 py-1 text-[11px] font-semibold text-on-strong">
            {project.status}
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-faint">
          {project.industry}
        </p>
        <h3 className="mt-1.5 flex items-start justify-between gap-3 font-display text-xl font-semibold leading-snug text-ink">
          {project.title}
          <ArrowUpRight
            size={20}
            className="mt-1 shrink-0 text-ink-faint transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-brand"
          />
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{project.tagline}</p>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-4">
          {project.stack.slice(0, 3).map((s) => (
            <span key={s} className="rounded-md bg-sand px-2 py-1 font-mono text-[11px] text-ink-muted">
              {s}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
