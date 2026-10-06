"use client";

import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { parseConsent, readConsentRaw, subscribeConsent, writeConsent, type Consent } from "@/lib/consent";

type ConsentContextValue = {
  /** false during server render / first paint, so the banner never flashes or mismatches. */
  ready: boolean;
  /** true once the visitor has made a choice (accept, reject or custom). */
  decided: boolean;
  consent: Consent;
  settingsOpen: boolean;
  openSettings: () => void;
  closeSettings: () => void;
  save: (consent: Consent) => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export function ConsentProvider({ children }: { children: ReactNode }) {
  // null on the server → "not ready"; "" or a string on the client.
  const raw = useSyncExternalStore<string | null>(subscribeConsent, readConsentRaw, () => null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const parsed = parseConsent(raw);
  const openSettings = useCallback(() => setSettingsOpen(true), []);
  const closeSettings = useCallback(() => setSettingsOpen(false), []);
  const save = useCallback((c: Consent) => {
    writeConsent(c);
    setSettingsOpen(false);
  }, []);

  const value = useMemo<ConsentContextValue>(
    () => ({
      ready: raw !== null,
      decided: parsed !== null,
      consent: parsed ?? { security: false },
      settingsOpen,
      openSettings,
      closeSettings,
      save,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps -- `parsed` is derived from `raw`
    [raw, settingsOpen, openSettings, closeSettings, save],
  );

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>;
}

export function useConsent() {
  const ctx = useContext(ConsentContext);
  if (!ctx) throw new Error("useConsent must be used inside <ConsentProvider>");
  return ctx;
}
