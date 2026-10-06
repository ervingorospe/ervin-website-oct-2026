import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";
import { verifyRecaptcha } from "@/lib/recaptcha";
import { contactEmailHtml, contactEmailSubject, contactEmailText } from "@/lib/email-templates";

export const runtime = "nodejs";

const TOPICS = ["Website", "Web app", "Mobile app", "Backend / API", "Something else"];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Best-effort per-instance throttle: 3 messages / 10 minutes per IP.
const hits = new Map<string, number[]>();
function tooMany(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 3;
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot: real visitors never fill this hidden field.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return Response.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const topic = String(body.topic ?? "").trim();
  const message = String(body.message ?? "").trim();

  if (!name || name.length > 100) return Response.json({ error: "Please enter your name." }, { status: 400 });
  if (!EMAIL_RE.test(email) || email.length > 200)
    return Response.json({ error: "Please enter a valid email address." }, { status: 400 });
  if (!TOPICS.includes(topic)) return Response.json({ error: "Please choose a topic." }, { status: 400 });
  if (message.length < 10 || message.length > 5000)
    return Response.json({ error: "Message must be between 10 and 5000 characters." }, { status: 400 });

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (tooMany(ip)) {
    return Response.json({ error: "Too many messages. Please try again later." }, { status: 429 });
  }

  const captcha = await verifyRecaptcha(body.recaptchaToken);
  if (!captcha.ok) {
    if (captcha.reason === "unavailable" || captcha.reason === "not-configured") {
      return Response.json(
        { error: "Couldn't verify that you're human right now. Please try again in a moment." },
        { status: 503 },
      );
    }
    return Response.json(
      { error: "Spam check failed. Please refresh the page and try again." },
      { status: 403 },
    );
  }

  const accessKeyId = process.env.AWS_SES_ACCESS_KEY;
  const secretAccessKey = process.env.AWS_SES_SECRET_ACCESS_KEY;
  const sender = process.env.AWS_SES_SENDER;
  const to = process.env.CONTACT_TO_EMAIL ?? sender;
  if (!accessKeyId || !secretAccessKey || !sender || !to) {
    console.error("[contact] Missing AWS SES environment variables");
    return Response.json({ error: "Email isn't configured yet. Please email me directly." }, { status: 500 });
  }

  const mail = { name, email, topic, message, siteUrl: process.env.NEXT_PUBLIC_SITE_URL };

  const ses = new SESClient({
    region: process.env.AWS_REGION ?? "ap-southeast-1",
    credentials: { accessKeyId, secretAccessKey },
  });

  try {
    await ses.send(
      new SendEmailCommand({
        Source: sender,
        Destination: { ToAddresses: [to] },
        ReplyToAddresses: [email],
        Message: {
          Subject: { Data: contactEmailSubject({ topic, name }), Charset: "UTF-8" },
          Body: {
            Text: { Data: contactEmailText(mail), Charset: "UTF-8" },
            Html: { Data: contactEmailHtml(mail), Charset: "UTF-8" },
          },
        },
      }),
    );
    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact] SES send failed:", err instanceof Error ? err.message : err);
    return Response.json({ error: "Couldn't send your message. Please try again or email me directly." }, { status: 502 });
  }
}
