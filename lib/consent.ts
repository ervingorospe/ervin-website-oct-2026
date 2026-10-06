// Cookie-consent storage. The choice itself lives in one first-party cookie so it survives reloads
// and can be re-asked after 6 months. Only categories this site truly uses are listed.

export const CONSENT_COOKIE = "portfolio_consent";
const MAX_AGE_DAYS = 180;

export type Consent = {
  /** Google reCAPTCHA (spam protection on the contact form). Off until the visitor agrees. */
  security: boolean;
};

const listeners = new Set<() => void>();

export function subscribeConsent(cb: () => void) {
  listeners.add(cb);
  return () => {
    listeners.delete(cb);
  };
}

/** Raw cookie value ("" when the visitor hasn't decided). */
export function readConsentRaw(): string {
  const match = document.cookie.split("; ").find((c) => c.startsWith(`${CONSENT_COOKIE}=`));
  return match ? match.slice(CONSENT_COOKIE.length + 1) : "";
}

export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const data = JSON.parse(decodeURIComponent(raw));
    if (data?.v !== 1 || typeof data.security !== "boolean") return null;
    return { security: data.security };
  } catch {
    return null;
  }
}

export function writeConsent(consent: Consent) {
  const secure = location.protocol === "https:" ? "; Secure" : "";
  document.cookie =
    `${CONSENT_COOKIE}=${encodeURIComponent(JSON.stringify({ v: 1, ...consent }))}` +
    `; Max-Age=${MAX_AGE_DAYS * 86400}; Path=/; SameSite=Lax${secure}`;
  listeners.forEach((l) => l());
}
