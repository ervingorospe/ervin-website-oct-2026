export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://ervin-gorospe.vercel.app").replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
