import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans, IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ConsentProvider } from "@/components/consent-provider";
import { CookieBanner } from "@/components/cookie-banner";
import { JsonLd } from "@/components/json-ld";
import { siteUrl } from "@/lib/site";

const plexSans = IBM_Plex_Sans({
  variable: "--font-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});
const plexMono = IBM_Plex_Mono({
  variable: "--font-plex-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});
const space = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Ervin Gorospe — Full-Stack Developer",
    template: "%s · Ervin Gorospe",
  },
  description:
    "Portfolio of Ervin Gorospe — full-stack developer with 6 years of experience in React, Next.js, NestJS, PostgreSQL and React Native.",
  keywords: [
    "Ervin Gorospe",
    "full-stack developer",
    "Next.js developer",
    "React developer",
    "NestJS",
    "React Native",
    "SEO",
    "Philippines",
  ],
  authors: [{ name: "Ervin Gorospe", url: siteUrl }],
  openGraph: {
    type: "website",
    siteName: "Ervin Gorospe",
    title: "Ervin Gorospe — Full-Stack Developer",
    description:
      "Web and mobile products end to end — React, Next.js, NestJS, PostgreSQL and React Native.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ervin Gorospe — Full-Stack Developer",
    description:
      "Web and mobile products end to end — React, Next.js, NestJS, PostgreSQL and React Native.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#fbfaf7",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${plexSans.variable} ${plexMono.variable} ${space.variable} antialiased`}
    >
      <body className="flex min-h-screen flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Ervin Gorospe — Portfolio",
            url: siteUrl,
            inLanguage: "en",
            author: { "@type": "Person", name: "Ervin Gorospe" },
          }}
        />
        <ConsentProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </ConsentProvider>
      </body>
    </html>
  );
}
