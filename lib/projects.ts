export type ProjectKind = "Client website" | "Web app" | "Mobile app";

export type Project = {
  slug: string;
  title: string;
  kind: ProjectKind;
  industry: string;
  tagline: string;
  summary: string;
  url?: string;
  image: string;
  accent: "brand" | "mint" | "sun" | "rose";
  role: string;
  status: "Live" | "In progress" | "Coming soon";
  stack: string[];
  features: { title: string; text: string }[];
  /** Site map rendered as a Mermaid flowchart on the docs page. */
  sitemap?: { title: string; desc: string; chart: string };
  gallery?: { src: string; caption: string }[];
  deploy: string[];
  /** "relay" gets the extended system documentation (RBAC, ERD, flows). */
  extendedDocs?: "relay" | "cheat-library";
};

const clientDeploy = [
  "Hosted on Vercel with automatic deploys on push to the main branch.",
  "Server-rendered pages with per-page metadata for search visibility.",
  "Responsive layout tested from phone to desktop widths.",
];

const siteStack = ["Next.js", "React", "Server-side rendering", "SEO metadata", "Vercel"];

export const projects: Project[] = [
  {
    slug: "relay-ticketing",
    title: "Relay — Ticketing & Task Management",
    kind: "Web app",
    industry: "SaaS / Productivity",
    tagline: "A multi-tenant ticketing platform with granular roles and real auth.",
    summary:
      "Every organization runs its own isolated workspace — members, roles, tags, projects and tickets never leak across tenants. Next.js frontend, NestJS + PostgreSQL backend.",
    url: "https://task-managment-ecru-tau.vercel.app/",
    image: "/images/ticketing/02-dashboard-organization.jpg",
    accent: "mint",
    role: "Design, frontend, backend, CI/CD",
    status: "Live",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Tailwind CSS",
      "NestJS",
      "PostgreSQL",
      "Prisma 7",
      "Passport (Google OAuth2 + JWT)",
      "AWS S3",
      "AWS SES",
      "GitHub Actions",
      "Vercel",
      "Render",
    ],
    features: [
      {
        title: "Dual-mode accounts",
        text: "Work in Personal mode (standalone tickets, no org) or create/join an Organization — chosen once at onboarding.",
      },
      {
        title: "Real auth",
        text: "Email/password signup with mandatory email verification, Google OAuth, and an httpOnly JWT session cookie.",
      },
      {
        title: "Multi-tenant organizations",
        text: "Each org has its own settings, seat/usage capacity limits, roles, tags and projects — isolated from every other org.",
      },
      {
        title: "Granular RBAC",
        text: "Roles are named bundles of fine-grained rules (e.g. ticket.view.included) across 9 categories — not a fixed admin/member split.",
      },
      {
        title: "Tickets & requests",
        text: "Org tickets, personal tickets, and client-submitted requests that a member approves (becomes a ticket) or rejects.",
      },
      {
        title: "Invite-only membership",
        text: "Members join by invite (token + expiry, resend with cooldown). Invited-only accounts can never create their own org.",
      },
      {
        title: "Activity & notifications",
        text: "Every mutation writes an append-only activity-log entry; a notification bell streams live updates over SSE.",
      },
      {
        title: "Attachments & idempotency",
        text: "Ticket attachments go straight to S3, and mutating requests honor an Idempotency-Key header so retries are safe.",
      },
    ],
    gallery: [
      { src: "/images/ticketing/02-dashboard-organization.jpg", caption: "Organization dashboard" },
      { src: "/images/ticketing/03-tickets-list.jpg", caption: "Tickets list with filters" },
      { src: "/images/ticketing/04-ticket-detail.jpg", caption: "Ticket detail, comments and attachments" },
      { src: "/images/ticketing/06-organization-settings-roles.jpg", caption: "Roles & permission rules" },
      { src: "/images/ticketing/07-requests.jpg", caption: "Client requests awaiting review" },
      { src: "/images/ticketing/08-activity-log.jpg", caption: "Append-only activity log" },
      { src: "/images/ticketing/09-reports.jpg", caption: "Reports" },
      { src: "/images/ticketing/10-dashboard-personal.jpg", caption: "Personal-mode dashboard" },
      { src: "/images/ticketing/01-login.jpg", caption: "Login" },
      { src: "/images/ticketing/11-signup.jpg", caption: "Signup" },
    ],
    deploy: [
      "Frontend on Vercel, auto-deploy on push to main. GitHub Actions runs lint, typecheck, tests and build, then calls the Vercel CLI which blocks until the deploy is actually ready.",
      "Backend on Render, auto-deploy on push to main. The pipeline runs a security audit, typecheck, lint, unit tests with a coverage threshold and build, then polls Render for that exact commit's deploy until it is live.",
      "Database: PostgreSQL, migrated via prisma migrate deploy.",
      "Attachments are uploaded directly to S3; the backend never stores files on its own disk.",
    ],
    extendedDocs: "relay",
  },
  {
    slug: "cheat-library",
    title: "Cheat Library — AI Study Notes",
    kind: "Mobile app",
    industry: "Mobile / AI",
    tagline: "Turn screenshots and photos into structured study notes with Gemini.",
    summary:
      "A mobile app (Expo + React Native) that turns screenshots and photos into structured study notes with Gemini, organized in nested folders and backed by Supabase. Every row is private to its owner.",
    image: "/images/cheat-library/01-home.jpg",
    accent: "brand",
    role: "Design, mobile app, Supabase backend",
    status: "In progress",
    stack: [
      "Expo SDK 57",
      "React Native 0.86",
      "React 19",
      "Expo Router",
      "Tamagui",
      "TanStack Query",
      "react-hook-form + Zod",
      "Supabase (Auth, Postgres + RLS, Storage, Edge Functions)",
      "Google Gemini",
    ],
    features: [
      { title: "AI note generation", text: "One or more images become a title, summary, key points and a suggested documentation topic." },
      { title: "Editable notes", text: "Edit title, content, key points, documentation links and image links. Paginated list with skeleton loading." },
      { title: "Nested folders", text: "Folders inside folders, with cycle prevention in the database. Deleting shows how many folders and notes are affected first." },
      { title: "Search", text: "Debounced search across notes, plus a home screen with stats, quick actions and recent notes." },
      { title: "Auth", text: "Email/password with “remember me”, plus Google and Facebook OAuth. Routes are guarded by session." },
      { title: "Profile", text: "Edit name, upload an avatar, and change password (only for accounts that use password auth)." },
    ],
    gallery: [
      { src: "/images/cheat-library/01-home.jpg", caption: "Home — stats, quick actions, recent notes" },
      { src: "/images/cheat-library/02-library.jpg", caption: "Library — all notes with search" },
      { src: "/images/cheat-library/03-note.jpg", caption: "AI-generated note: summary and key points" },
      { src: "/images/cheat-library/04-folders.jpg", caption: "Collections — top-level folders" },
      { src: "/images/cheat-library/05-folder-detail.jpg", caption: "Folder contents — subfolders and notes" },
    ],
    deploy: [
      "App config holds only the Supabase project URL and publishable key; both are safe to ship in the client.",
      "Edge function generate-notes reads GEMINI_API_KEY from Supabase secrets and retries up to 2 times with backoff.",
      "Database migrations live in supabase/migrations and are applied in timestamp order.",
      "Native builds use EAS profiles defined in eas.json.",
    ],
    extendedDocs: "cheat-library",
  },
  {
    slug: "cochran-firm",
    title: "The Cochran Firm Texas",
    kind: "Client website",
    industry: "Legal services",
    tagline: "Personal injury & criminal defense law firm — Dallas, Fort Worth, Houston, Tulsa.",
    summary:
      "A website for a multi-office law firm: practice areas, attorney team, client testimonials and office locations, with 24/7 call support front and center.",
    url: "https://cochran-firm-1332.vercel.app/",
    image: "/images/projects/cochran-firm.jpg",
    accent: "brand",
    role: "Next.js developer",
    status: "Live",
    stack: siteStack,
    features: [
      { title: "Practice areas", text: "Car and truck wrecks, criminal defense, civil rights, dog bites, employment law, mass torts and more." },
      { title: "Attorney team", text: "Profiles that put a face and credentials to the firm." },
      { title: "Testimonials", text: "Client stories that build trust at the moment a visitor is deciding to call." },
      { title: "Office locations", text: "Four offices across Texas and Oklahoma, each easy to find and contact." },
      { title: "Always-on contact", text: "24/7 call center and free-consultation calls to action throughout." },
    ],
    sitemap: {
      title: "Site map",
      desc: "How a visitor moves from landing to contacting the firm.",
      chart: `flowchart LR
    A["Home"] --> B["Cases handled"]
    A --> C["Attorney team"]
    A --> D["Testimonials"]
    A --> E["Office locations"]
    B --> F{"Needs help?"}
    C --> F
    D --> F
    E --> F
    F --> G["Call 24/7 / free consultation"]`,
    },
    deploy: clientDeploy,
  },
  {
    slug: "britt-hill-interiors",
    title: "Britt Hill Interiors",
    kind: "Client website",
    industry: "Interior design",
    tagline: "Award-winning interior design firm in Prairieville, Louisiana.",
    summary:
      "An elegant, portfolio-led site for a full-service design firm — showroom, news and media, testimonials and a coming-soon online boutique.",
    url: "https://britt-hill-1334-git-main-modiphy.vercel.app/",
    image: "/images/projects/britt-hill.jpg",
    accent: "rose",
    role: "Next.js developer at Modiphy",
    status: "Live",
    stack: siteStack,
    features: [
      { title: "Side navigation", text: "A persistent left rail with nested menus for Interior Design, News & Media and Showroom." },
      { title: "Design portfolio", text: "Image-forward galleries that showcase finished rooms." },
      { title: "Showroom", text: "A dedicated section for the 8,000 sq ft showroom." },
      { title: "Online boutique", text: "A coming-soon storefront page, ready to be switched on." },
      { title: "Testimonials", text: "Client quotes on the firm's listening-first approach." },
    ],
    sitemap: {
      title: "Site map",
      desc: "Primary navigation of the site.",
      chart: `flowchart LR
    A["Home"] --> B["About"]
    A --> C["Interior Design"]
    A --> D["News & Media"]
    A --> E["Showroom"]
    A --> F["Online Boutique<br/>(coming soon)"]
    A --> G["Testimonials"]
    A --> H["Contact"]`,
    },
    deploy: clientDeploy,
  },
  {
    slug: "original-cajun-seafood",
    title: "The Original Cajun Seafood",
    kind: "Client website",
    industry: "Restaurant & catering",
    tagline: "Family-owned New Orleans seafood since 1995 — four locations.",
    summary:
      "A menu-first restaurant site with multi-location info, catering and events, and daily promotions such as fresh Louisiana crawfish.",
    url: "https://cajun-seafood-1355-git-main-modiphy.vercel.app/",
    image: "/images/projects/cajun-seafood.jpg",
    accent: "sun",
    role: "Next.js developer at Modiphy",
    status: "Live",
    stack: siteStack,
    features: [
      { title: "Menu & raw menu", text: "Separate, scannable menus for cooked dishes and raw bar." },
      { title: "Four locations", text: "Uptown, Treme, Downtown and East — each with its own details." },
      { title: "Catering & events", text: "Inquiry-driven pages for catering and event hosting." },
      { title: "Promotions", text: "Daily specials and live crawfish availability up front." },
      { title: "Social links", text: "Facebook and Instagram woven into the experience." },
    ],
    sitemap: {
      title: "Site map",
      desc: "Where a hungry visitor can go.",
      chart: `flowchart LR
    A["Home"] --> B["Menu"]
    A --> C["Raw Menu"]
    A --> D["Locations"]
    A --> E["Catering & Events"]
    A --> F["About"]
    A --> G["Promotions"]
    D --> H["Uptown"]
    D --> I["Treme"]
    D --> J["Downtown"]
    D --> K["East"]`,
    },
    deploy: clientDeploy,
  },
  {
    slug: "glbc",
    title: "Greater Louisiana Baptist Convention",
    kind: "Client website",
    industry: "Faith organization",
    tagline: "“Revitalizing today's church to transform the world.”",
    summary:
      "The home of a statewide convention: membership, officers, events, scholarships, donations, a newsletter and a merchandise store.",
    url: "https://glbc-1367.vercel.app/",
    image: "/images/projects/glbc.jpg",
    accent: "sun",
    role: "Next.js developer",
    status: "Live",
    stack: siteStack,
    features: [
      { title: "Membership", text: "Individual and congregational sign-up paths with a prominent Join call to action." },
      { title: "Officers & events", text: "Leadership directory and an events section." },
      { title: "Scholarships & donations", text: "Application and giving pages for the community." },
      { title: "Store", text: "Merchandise store with a dropdown in the main navigation." },
      { title: "Newsletter & cookies", text: "Newsletter subscription and a cookie-consent notice." },
    ],
    sitemap: {
      title: "Site map",
      desc: "Main navigation of the convention site.",
      chart: `flowchart LR
    A["Home"] --> B["About"]
    A --> C["Officers"]
    A --> D["Events"]
    A --> E["Membership"]
    A --> F["Greater Inspiration"]
    A --> G["Store"]
    A --> H["Donations"]
    A --> I["Scholarship"]
    A --> J["Contact"]`,
    },
    deploy: clientDeploy,
  },
  {
    slug: "strategic-communications",
    title: "Strategic Communications",
    kind: "Client website",
    industry: "Consulting",
    tagline: "Communication strategy for corporate, healthcare, university and professional-services clients.",
    summary:
      "A clean consulting site that explains what strategic communication is, what the firm offers, and who leads it — Baton Rouge, serving clients nationwide.",
    url: "https://scbhuey-1234.vercel.app/",
    image: "/images/projects/scbhuey.jpg",
    accent: "brand",
    role: "Next.js developer",
    status: "Live",
    stack: siteStack,
    features: [
      { title: "Clear positioning", text: "A “what is strategic communication” section that frames the firm's approach." },
      { title: "Services", text: "Strategy development, problem solving, marketing programs and consulting." },
      { title: "Leader profile", text: "A dedicated section on the consultant behind the firm." },
      { title: "Sector focus", text: "Messaging for law, banking, insurance, financial planning, healthcare and higher ed." },
    ],
    sitemap: {
      title: "Site map",
      desc: "A short, focused path to the call to action.",
      chart: `flowchart LR
    A["Home"] --> B["About Us"]
    A --> C["Our Services"]
    A --> D["Our Leader"]
    A --> E["What are Strategic Communications"]`,
    },
    deploy: clientDeploy,
  },
  {
    slug: "ironbloom-marketing",
    title: "Ironbloom Digital Marketing",
    kind: "Client website",
    industry: "Marketing agency",
    tagline: "Elevating brands through design, SEO and digital strategy.",
    summary:
      "An agency site covering web design, SEO management, digital campaigns and social media, with the five core values front and center.",
    url: "https://ironbloommarketing.com/",
    image: "/images/projects/ironbloom.jpg",
    accent: "mint",
    role: "Next.js developer",
    status: "Live",
    stack: siteStack,
    features: [
      { title: "Services", text: "Website design, SEO management, digital marketing and social media management." },
      { title: "Values", text: "Integrity, diversity, innovation, excellence and adaptability." },
      { title: "Contact", text: "Email, social links and an online message form." },
      { title: "Custom domain", text: "Served from its own production domain." },
    ],
    sitemap: {
      title: "Site map",
      desc: "Four top-level pages.",
      chart: `flowchart LR
    A["Home"] --> B["Services"]
    A --> C["About Us"]
    A --> D["Contact"]
    D --> E["Message form"]`,
    },
    deploy: clientDeploy,
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
