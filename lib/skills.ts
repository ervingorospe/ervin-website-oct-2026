import type { IconType } from "react-icons";
import {
  SiReact,
  SiNextdotjs,
  SiNestjs,
  SiTypescript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiMysql,
  SiMongodb,
  SiVuedotjs,
  SiPhp,
  SiLaravel,
  SiSupabase,
  SiFirebase,
  SiGithubactions,
  SiPostman,
  SiJira,
  SiTrello,
  SiNotion,
  SiGit,
  SiJavascript,
  SiClaude,
} from "react-icons/si";
import { FaAws, FaJava, FaGithub } from "react-icons/fa6";
import { Cloud, Gauge, Network, SearchCheck, Server, Tags, Terminal } from "lucide-react";

export type Skill = {
  name: string;
  icon: IconType | typeof Cloud;
  color: string; // brand color (or a CSS var) used for the icon tile
};

export type SkillGroup = {
  title: string;
  blurb: string;
  skills: Skill[];
};

export const mainStack: Skill[] = [
  { name: "React", icon: SiReact, color: "#0ea5e9" },
  { name: "React Native", icon: SiReact, color: "#6366f1" },
  { name: "Next.js", icon: SiNextdotjs, color: "var(--ink)" },
  { name: "Node.js", icon: SiNodedotjs, color: "#16a34a" },
  { name: "Express.js", icon: SiExpress, color: "var(--ink-muted)" },
  { name: "NestJS", icon: SiNestjs, color: "#e11d48" },
  { name: "TypeScript", icon: SiTypescript, color: "#2563eb" },
  { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06b6d4" },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Main tech stack",
    blurb: "The tools I reach for first, and ship with every week.",
    skills: mainStack,
  },
  {
    title: "Also experienced in",
    blurb: "Other stacks I've worked in professionally.",
    skills: [
      { name: "Vue.js", icon: SiVuedotjs, color: "#16a34a" },
      { name: "JavaScript", icon: SiJavascript, color: "#ca8a04" },
      { name: "Java", icon: FaJava, color: "#dc2626" },
      { name: "PHP", icon: SiPhp, color: "#6366f1" },
      { name: "Laravel", icon: SiLaravel, color: "#ef4444" },
      { name: "ServiceNow", icon: Network, color: "#16a34a" },
      { name: "IBM API Connect", icon: Network, color: "#2563eb" },
    ],
  },
  {
    title: "SEO & performance",
    blurb: "Nearly three years of Next.js SEO work at Modiphy.",
    skills: [
      { name: "SEO", icon: SearchCheck, color: "#f43f5e" },
      { name: "Server-side rendering", icon: Server, color: "#4f46e5" },
      { name: "SEO metadata", icon: Tags, color: "#10b981" },
      { name: "Performance tuning", icon: Gauge, color: "#f59e0b" },
    ],
  },
  {
    title: "Databases",
    blurb: "Schema design, query tuning and PostgreSQL functions.",
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql, color: "#2563eb" },
      { name: "MySQL", icon: SiMysql, color: "#0369a1" },
      { name: "MongoDB", icon: SiMongodb, color: "#16a34a" },
      { name: "Supabase", icon: SiSupabase, color: "#10b981" },
      { name: "Firebase", icon: SiFirebase, color: "#f59e0b" },
    ],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Deploying, automating and keeping it running.",
    skills: [
      { name: "AWS EC2 · Lambda", icon: FaAws, color: "#f59e0b" },
      { name: "AWS S3 · RDS", icon: Cloud, color: "#f59e0b" },
      { name: "AWS SQS · SES", icon: Cloud, color: "#f59e0b" },
      { name: "API Gateway · IAM", icon: Cloud, color: "#f59e0b" },
      { name: "GitHub Actions CI/CD", icon: SiGithubactions, color: "#2563eb" },
    ],
  },
  {
    title: "Tools & workflow",
    blurb: "How the work gets planned, built with AI, reviewed and shipped.",
    skills: [
      { name: "Claude AI", icon: SiClaude, color: "#d97757" },
      { name: "Git & GitHub", icon: SiGit, color: "#ea580c" },
      { name: "VS Code", icon: Terminal, color: "#2563eb" },
      { name: "Postman", icon: SiPostman, color: "#f97316" },
      { name: "MySQL Workbench", icon: SiMysql, color: "#0369a1" },
      { name: "Jira", icon: SiJira, color: "#2563eb" },
      { name: "Trello", icon: SiTrello, color: "#0ea5e9" },
      { name: "Notion", icon: SiNotion, color: "var(--ink)" },
      { name: "GitHub", icon: FaGithub, color: "var(--ink)" },
    ],
  },
];
