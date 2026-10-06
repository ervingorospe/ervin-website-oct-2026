import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const OG_SIZE = { width: 1200, height: 630 } as const;

const TONES = {
  brand: { soft: "#eef0ff", text: "#4f46e5" },
  mint: { soft: "#e3f7ee", text: "#047857" },
  sun: { soft: "#fff4dc", text: "#b45309" },
  rose: { soft: "#ffe8ec", text: "#e11d48" },
} as const;

// Keep only the chips that fit on one line (~12.5px per character at 22px + padding/margin).
function fitChips(chips: string[], maxWidth: number) {
  const out: string[] = [];
  let used = 0;
  for (const c of chips) {
    const w = c.length * 12.5 + 32 + 12;
    if (used + w > maxWidth) break;
    out.push(c);
    used += w;
  }
  return out;
}

async function publicImage(path: string) {
  try {
    const buf = await readFile(join(process.cwd(), "public", path));
    const type = path.endsWith(".png") ? "image/png" : "image/jpeg";
    return `data:${type};base64,${buf.toString("base64")}`;
  } catch {
    return null;
  }
}

export async function renderOgImage(opts: {
  eyebrow: string;
  title: string;
  subtitle: string;
  chips?: string[];
  image?: string; // path under /public
  shape?: "portrait" | "landscape";
  tone?: keyof typeof TONES;
}) {
  const tone = TONES[opts.tone ?? "brand"];
  const img = opts.image ? await publicImage(opts.image) : null;
  const titleSize = opts.title.length > 38 ? 56 : opts.title.length > 24 ? 66 : 76;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#fbfaf7",
          fontFamily: "sans-serif",
          color: "#0f172a",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "56px 56px 56px 72px", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: "#0f172a",
                color: "#a5b4fc",
                fontSize: 30,
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              E
            </div>
            <div style={{ marginLeft: 14, fontSize: 28, fontWeight: 700, display: "flex" }}>
              Ervin<span style={{ color: "#4f46e5" }}>.dev</span>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                alignSelf: "flex-start",
                background: tone.soft,
                color: tone.text,
                fontSize: 24,
                fontWeight: 700,
                padding: "8px 20px",
                borderRadius: 999,
              }}
            >
              {opts.eyebrow}
            </div>
            <div style={{ display: "flex", fontSize: titleSize, fontWeight: 800, lineHeight: 1.08, marginTop: 24, letterSpacing: -1.5 }}>
              {opts.title}
            </div>
            <div style={{ display: "flex", fontSize: 30, color: "#475569", marginTop: 20, lineHeight: 1.35 }}>{opts.subtitle}</div>
          </div>

          <div style={{ display: "flex", alignItems: "flex-start", flexShrink: 0 }}>
            {fitChips(opts.chips ?? [], opts.shape === "landscape" ? 600 : 620).slice(0, 4).map((c) => (
              <div
                key={c}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: 42,
                  flexShrink: 0,
                  whiteSpace: "nowrap",
                  background: "#f3f1ea",
                  color: "#475569",
                  fontSize: 22,
                  padding: "0 16px",
                  borderRadius: 10,
                  marginRight: 12,
                }}
              >
                {c}
              </div>
            ))}
          </div>
        </div>

        {img && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: opts.shape === "landscape" ? 470 : 400,
              padding: opts.shape === "landscape" ? "0 56px 0 0" : "56px 56px 56px 0",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders to PNG, not HTML */}
            <img
              src={img}
              alt=""
              width={opts.shape === "landscape" ? 414 : 344}
              height={opts.shape === "landscape" ? 259 : 518}
              style={{
                width: opts.shape === "landscape" ? 414 : 344,
                height: opts.shape === "landscape" ? 259 : 518,
                objectFit: "cover",
                objectPosition: "top",
                borderRadius: 28,
                border: "6px solid #ffffff",
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...OG_SIZE },
  );
}
