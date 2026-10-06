import { getProject, projects } from "@/lib/projects";
import { renderOgImage } from "@/lib/og";

export const alt = "Project documentation";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  return renderOgImage({
    eyebrow: project ? `${project.kind} · ${project.industry}` : "Project",
    title: project?.title ?? "Project",
    subtitle: project?.tagline ?? "Project documentation by Ervin Gorospe",
    chips: project?.stack,
    image: project?.image.startsWith("/") ? project.image : undefined,
    shape: project?.kind === "Mobile app" ? "portrait" : "landscape",
    tone: project?.accent,
  });
}
