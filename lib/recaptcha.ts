// Server-side reCAPTCHA (Google Cloud, score-based) verification.

const MIN_SCORE = 0.5;
export const RECAPTCHA_ACTION = "contact";

export type RecaptchaResult =
  | { ok: true }
  | { ok: false; reason: "missing-token" | "invalid" | "low-score" | "unavailable" | "not-configured" };

export async function verifyRecaptcha(token: unknown): Promise<RecaptchaResult> {
  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  const projectId = process.env.RECAPTCHA_PROJECT_ID;
  const apiKey = process.env.RECAPTCHA_API_KEY;

  if (!siteKey || !projectId || !apiKey) {
    // Don't block local development; never run unprotected in production.
    if (process.env.NODE_ENV !== "production") {
      console.warn("[recaptcha] Not configured — skipping verification (development only)");
      return { ok: true };
    }
    console.error("[recaptcha] Missing reCAPTCHA environment variables");
    return { ok: false, reason: "not-configured" };
  }

  if (typeof token !== "string" || token.length < 20) return { ok: false, reason: "missing-token" };

  try {
    const res = await fetch(
      `https://recaptchaenterprise.googleapis.com/v1/projects/${encodeURIComponent(projectId)}/assessments?key=${encodeURIComponent(apiKey)}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: { token, siteKey, expectedAction: RECAPTCHA_ACTION } }),
        signal: AbortSignal.timeout(8000),
      },
    );
    if (!res.ok) {
      console.error("[recaptcha] Assessment API error:", res.status, (await res.text()).slice(0, 300));
      return { ok: false, reason: "unavailable" };
    }
    const data = (await res.json()) as {
      tokenProperties?: { valid?: boolean; action?: string; invalidReason?: string };
      riskAnalysis?: { score?: number };
    };
    if (!data.tokenProperties?.valid || data.tokenProperties.action !== RECAPTCHA_ACTION) {
      console.warn("[recaptcha] Invalid token:", data.tokenProperties?.invalidReason ?? "action mismatch");
      return { ok: false, reason: "invalid" };
    }
    const score = data.riskAnalysis?.score ?? 0;
    if (score < MIN_SCORE) {
      console.warn("[recaptcha] Low score:", score);
      return { ok: false, reason: "low-score" };
    }
    return { ok: true };
  } catch (err) {
    console.error("[recaptcha] Verification failed:", err instanceof Error ? err.message : err);
    return { ok: false, reason: "unavailable" };
  }
}
