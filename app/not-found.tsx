import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-xl flex-col items-center px-4 py-32 text-center">
      <p className="font-mono text-sm font-semibold text-brand">404</p>
      <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-ink">Page not found</h1>
      <p className="mt-3 text-ink-muted">That page doesn&apos;t exist — it may have moved.</p>
      <Link
        href="/"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand"
      >
        <ArrowLeft size={16} /> Back home
      </Link>
    </section>
  );
}
