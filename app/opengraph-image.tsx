import { renderOgImage } from "@/lib/og";

export const alt = "Ervin Gorospe — Full-Stack Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: "Full-Stack Developer",
    title: "Ervin Gorospe",
    subtitle: "React, Next.js, NestJS, PostgreSQL & React Native — web and mobile products end to end.",
    chips: ["Next.js", "React Native", "NestJS", "SEO"],
    image: "/images/ervin.jpg",
  });
}
