import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  text,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  text: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-dots">
      <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 animate-blob bg-brand/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 left-1/4 h-64 w-64 animate-blob bg-mint/20 blur-3xl" />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink-muted">
          <span className="h-1.5 w-1.5 rounded-full bg-mint" />
          {eyebrow}
        </span>
        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-ink-muted">{text}</p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
