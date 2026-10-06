import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { PageHero } from "@/components/page-hero";
import { ProjectCard } from "@/components/project-card";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Projects",
  description: "Websites, web apps and mobile apps built by Ervin Gorospe — each with its own documentation page.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <>
      <PageHero
        eyebrow={`${projects.length} projects`}
        title={
          <>
            Things I&apos;ve <span className="text-brand">built</span>.
          </>
        }
        text="Client websites, a multi-tenant web app and a mobile app. Open any project for its documentation: features, tech stack, diagrams, screenshots and deployment."
      />
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 90}>
              <ProjectCard project={p} priority={i < 3} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
