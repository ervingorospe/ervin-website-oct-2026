import type { ReactNode } from "react";

export const LEGAL_UPDATED = "October 6, 2026";

export function LegalSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="font-display text-2xl font-semibold tracking-tight text-ink">{title}</h2>
      <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-ink-muted [&_a]:text-brand [&_a]:underline [&_li]:mt-1.5 [&_ul]:list-disc [&_ul]:pl-5">
        {children}
      </div>
    </section>
  );
}

export function LegalToc({ items }: { items: { id: string; label: string }[] }) {
  return (
    <nav aria-label="On this page" className="rounded-2xl border border-line bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-faint">On this page</p>
      <ol className="mt-3 grid gap-x-6 gap-y-1.5 text-sm sm:grid-cols-2">
        {items.map((i, n) => (
          <li key={i.id}>
            <a href={`#${i.id}`} className="text-ink-muted hover:text-brand">
              <span className="mr-2 font-mono text-xs text-brand">{String(n + 1).padStart(2, "0")}</span>
              {i.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
