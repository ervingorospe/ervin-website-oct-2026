// Email-safe HTML: table layout + inline styles only (Gmail/Outlook strip <style> and ignore flexbox/grid).

export type ContactEmailInput = {
  name: string;
  email: string;
  topic: string;
  message: string;
  receivedAt?: Date;
  siteUrl?: string;
};

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const TOPIC_COLORS: Record<string, { bg: string; fg: string }> = {
  Website: { bg: "#eef0ff", fg: "#4f46e5" },
  "Web app": { bg: "#e3f7ee", fg: "#047857" },
  "Mobile app": { bg: "#fff4dc", fg: "#b45309" },
  "Backend / API": { bg: "#ffe8ec", fg: "#e11d48" },
  "Something else": { bg: "#f3f1ea", fg: "#475569" },
};

export function contactEmailSubject({ topic, name }: Pick<ContactEmailInput, "topic" | "name">) {
  return `[Portfolio] ${topic} — ${name}`.replace(/[\r\n]+/g, " ");
}

export function contactEmailText({ name, email, topic, message }: ContactEmailInput) {
  return [
    "New message from your portfolio contact form",
    "",
    `Name:  ${name}`,
    `Email: ${email}`,
    `Topic: ${topic}`,
    "",
    "Message:",
    message,
    "",
    `Reply to this email to respond to ${name}.`,
  ].join("\n");
}

export function contactEmailHtml(input: ContactEmailInput) {
  const { name, email, topic, message } = input;
  const siteUrl = input.siteUrl ?? "https://ervin-gorospe.vercel.app";
  const when = (input.receivedAt ?? new Date()).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    dateStyle: "medium",
    timeStyle: "short",
  });
  const tone = TOPIC_COLORS[topic] ?? TOPIC_COLORS["Something else"];
  const initial = escapeHtml(name.trim().charAt(0).toUpperCase() || "?");
  const replySubject = encodeURIComponent(`Re: ${topic} — your message`);
  const font = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light only">
<title>New portfolio message from ${escapeHtml(name)}</title>
</head>
<body style="margin:0;padding:0;background:#fbfaf7;">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(
    message.slice(0, 90),
  )}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fbfaf7;">
  <tr><td align="center" style="padding:32px 12px;">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;font-family:${font};color:#0f172a;">

      <!-- brand bar -->
      <tr><td style="padding:0 4px 16px 4px;">
        <table role="presentation" cellpadding="0" cellspacing="0"><tr>
          <td width="36" height="36" align="center" valign="middle" style="width:36px;height:36px;background:#0f172a;border-radius:10px;color:#a5b4fc;font-size:18px;font-weight:700;font-family:${font};">E</td>
          <td style="padding-left:10px;font-size:16px;font-weight:700;color:#0f172a;">Ervin<span style="color:#4f46e5;">.dev</span></td>
        </tr></table>
      </td></tr>

      <!-- card -->
      <tr><td style="background:#ffffff;border:1px solid #e7e5df;border-radius:20px;overflow:hidden;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">

          <!-- header -->
          <tr><td style="background:#0f172a;padding:28px 32px;">
            <p style="margin:0 0 6px 0;font-size:11px;letter-spacing:1.5px;text-transform:uppercase;color:#a5b4fc;font-weight:600;">Portfolio contact form</p>
            <h1 style="margin:0;font-size:24px;line-height:1.25;color:#ffffff;font-weight:700;">You have a new message</h1>
            <p style="margin:8px 0 0 0;font-size:13px;color:#94a3b8;">${escapeHtml(when)} (Manila time)</p>
          </td></tr>

          <!-- sender -->
          <tr><td style="padding:28px 32px 8px 32px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
              <td width="48" height="48" align="center" valign="middle" style="width:48px;height:48px;background:#eef0ff;border-radius:24px;color:#4f46e5;font-size:20px;font-weight:700;">${initial}</td>
              <td style="padding-left:14px;">
                <div style="font-size:17px;font-weight:700;color:#0f172a;">${escapeHtml(name)}</div>
                <div style="font-size:14px;"><a href="mailto:${escapeHtml(email)}" style="color:#4f46e5;text-decoration:none;">${escapeHtml(email)}</a></div>
              </td>
              <td align="right" valign="middle">
                <span style="display:inline-block;padding:5px 12px;border-radius:999px;background:${tone.bg};color:${tone.fg};font-size:12px;font-weight:700;">${escapeHtml(topic)}</span>
              </td>
            </tr></table>
          </td></tr>

          <!-- message -->
          <tr><td style="padding:16px 32px 8px 32px;">
            <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:1.2px;text-transform:uppercase;color:#94a3b8;font-weight:600;">Message</p>
            <div style="background:#fbfaf7;border-left:4px solid #4f46e5;border-radius:0 12px 12px 0;padding:16px 18px;font-size:15px;line-height:1.65;color:#1e293b;white-space:pre-wrap;word-wrap:break-word;">${escapeHtml(
              message,
            )}</div>
          </td></tr>

          <!-- reply button -->
          <tr><td align="left" style="padding:24px 32px 32px 32px;">
            <table role="presentation" cellpadding="0" cellspacing="0"><tr>
              <td style="background:#4f46e5;border-radius:999px;">
                <a href="mailto:${escapeHtml(email)}?subject=${replySubject}" style="display:inline-block;padding:12px 26px;font-size:14px;font-weight:700;color:#ffffff;text-decoration:none;font-family:${font};">Reply to ${escapeHtml(
                  name.split(" ")[0],
                )} &rarr;</a>
              </td>
            </tr></table>
            <p style="margin:14px 0 0 0;font-size:12px;color:#94a3b8;">Or just hit reply — this email's Reply-To is set to ${escapeHtml(email)}.</p>
          </td></tr>

        </table>
      </td></tr>

      <!-- footer -->
      <tr><td align="center" style="padding:20px 8px 0 8px;font-size:12px;line-height:1.6;color:#94a3b8;">
        Sent from the contact form at <a href="${escapeHtml(siteUrl)}" style="color:#64748b;">${escapeHtml(
    siteUrl.replace(/^https?:\/\//, ""),
  )}</a><br>
        Delivered with Amazon SES
      </td></tr>

    </table>
  </td></tr>
</table>
</body>
</html>`;
}
