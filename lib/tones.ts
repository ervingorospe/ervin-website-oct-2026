export type Tone = "brand" | "mint" | "sun" | "rose";

export const toneClasses: Record<Tone, { soft: string; text: string; solid: string; ring: string }> = {
  brand: { soft: "bg-brand-soft", text: "text-brand", solid: "bg-brand", ring: "ring-brand/20" },
  mint: { soft: "bg-mint-soft", text: "text-emerald-700", solid: "bg-mint", ring: "ring-mint/25" },
  sun: { soft: "bg-sun-soft", text: "text-amber-700", solid: "bg-sun", ring: "ring-sun/30" },
  rose: { soft: "bg-rose-soft", text: "text-rose-600", solid: "bg-rose", ring: "ring-rose/20" },
};
