"use client";

import { useEffect, useId, useState, useSyncExternalStore } from "react";
import { getTheme, subscribeTheme, type Theme } from "@/lib/theme";

export function MermaidDiagram({ chart }: { chart: string }) {
  const id = useId().replace(/:/g, "");
  const theme = useSyncExternalStore<Theme>(subscribeTheme, getTheme, () => "light");
  const [svg, setSvg] = useState("");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        mermaid.initialize({
          startOnLoad: false,
          theme: theme === "dark" ? "dark" : "neutral",
          securityLevel: "strict",
          fontFamily: "inherit",
        });
        const { svg } = await mermaid.render(`m-${id}-${theme}`, chart);
        if (!cancelled) setSvg(svg);
      } catch {
        if (!cancelled) setFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [chart, id, theme]);

  if (failed) {
    return (
      <pre className="overflow-x-auto rounded-lg bg-sand p-4 font-mono text-xs text-ink-muted">
        {chart}
      </pre>
    );
  }

  if (!svg) {
    return (
      <div className="flex h-40 items-center justify-center text-sm text-ink-faint">
        Rendering diagram…
      </div>
    );
  }

  return (
    <div
      className="flex min-w-fit justify-center [&_svg]:h-auto [&_svg]:max-w-none"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
