"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { getTheme, setTheme, subscribeTheme, type Theme } from "@/lib/theme";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme, () => "light");
  const dark = theme === "dark";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={dark}
      aria-label="Dark mode"
      title={dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(dark ? "light" : "dark")}
      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink-muted transition hover:border-brand hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${className}`}
    >
      {/* Both icons render so server HTML matches; CSS picks one from data-theme (no hydration mismatch). */}
      <Moon size={18} className="dark:hidden" aria-hidden="true" />
      <Sun size={18} className="hidden dark:block" aria-hidden="true" />
    </button>
  );
}
