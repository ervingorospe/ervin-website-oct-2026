import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { navLinks } from "@/lib/nav";
import { siteUrl } from "@/lib/site";


export default function sitemap(): MetadataRoute.Sitemap {
  const pages = navLinks.map((l) => ({
    url: `${siteUrl}${l.href === "/" ? "" : l.href}`,
    changeFrequency: "monthly" as const,
    priority: l.href === "/" ? 1 : 0.8,
  }));
  const docs = projects.map((p) => ({
    url: `${siteUrl}/projects/${p.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));
  const legal = [{ url: `${siteUrl}/cookies`, changeFrequency: "yearly" as const, priority: 0.2 }];
  return [...pages, ...docs, ...legal];
}
