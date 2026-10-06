import {
  Globe,
  Smartphone,
  Server,
  SearchCheck,
  Database,
  Cloud,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  icon: LucideIcon;
  tone: "brand" | "mint" | "sun" | "rose";
  blurb: string;
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "web-development",
    title: "Web Development",
    icon: Globe,
    tone: "brand",
    blurb:
      "Fast, responsive websites and web apps built with React and Next.js — from marketing sites to full dashboards.",
    bullets: [
      "Pixel-faithful builds from Figma or other designs",
      "Reusable component libraries in TypeScript",
      "Accessible, mobile-first layouts with Tailwind CSS",
    ],
  },
  {
    slug: "mobile-apps",
    title: "Mobile Apps",
    icon: Smartphone,
    tone: "mint",
    blurb:
      "Cross-platform iOS and Android apps with React Native that share logic with your web product.",
    bullets: [
      "React Native with TypeScript",
      "API integration and offline-friendly state",
      "Hand-off ready for store submission",
    ],
  },
  {
    slug: "backend-apis",
    title: "Backend & APIs",
    icon: Server,
    tone: "sun",
    blurb:
      "Clean, well-structured NestJS and Express services with authentication, validation and role-based access.",
    bullets: [
      "REST APIs with NestJS or Express",
      "Auth: JWT, OAuth2, role-based permissions",
      "Secure API gateways and policies (IBM API Connect)",
    ],
  },
  {
    slug: "seo-performance",
    title: "SEO & Performance",
    icon: SearchCheck,
    tone: "rose",
    blurb:
      "Search-ready sites using server-side rendering, structured metadata and performance tuning — nearly three years of Next.js SEO work.",
    bullets: [
      "Server rendering, metadata and sitemaps",
      "Core Web Vitals and image optimization",
      "Content and CMS structure that ranks",
    ],
  },
  {
    slug: "database-design",
    title: "Database Design",
    icon: Database,
    tone: "brand",
    blurb:
      "Relational schemas, optimized queries and PostgreSQL functions that stay fast as your data grows.",
    bullets: [
      "PostgreSQL, MySQL, MongoDB, Supabase",
      "Prisma schemas and migrations",
      "Query tuning and database functions",
    ],
  },
  {
    slug: "cloud-devops",
    title: "Cloud & CI/CD",
    icon: Cloud,
    tone: "mint",
    blurb:
      "Deployments that run themselves: AWS services, Vercel, and GitHub Actions pipelines that gate every release.",
    bullets: [
      "AWS EC2, Lambda, S3, RDS, SQS, SES",
      "GitHub Actions: lint, test, audit, deploy",
      "Environment and secrets hygiene",
    ],
  },
];

export const process = [
  { step: "01", title: "Discover", text: "We talk goals, users, scope and timeline." },
  { step: "02", title: "Design & plan", text: "Architecture, data model and a clear milestone list." },
  { step: "03", title: "Build", text: "Small, reviewable increments with a live preview link." },
  { step: "04", title: "Launch & support", text: "Deploy, monitor, and keep improving." },
];
