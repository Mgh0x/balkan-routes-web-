import { sendTransactionalEmail } from "@/lib/email-delivery";
import type { EmailDeliveryResult } from "@/lib/email-delivery";
import type { Language } from "@/types";

type EmailSectionLanguage = "en" | "mk";

type NewsletterEmailSection = {
  language: EmailSectionLanguage;
  label: string;
  title: string;
  intro: string;
  emailLabel: string;
  cta: string;
  footer: string;
};

export type NewsletterEmailResult = EmailDeliveryResult;

type SendNewsletterConfirmationOptions = {
  email: string;
  language: Language;
};

const englishSection: NewsletterEmailSection = {
  language: "en",
  label: "English",
  title: "You're on the Skopje Routes newsletter.",
  intro:
    "Thanks for joining Skopje Routes. We'll send private North Macedonia tour ideas, local notes, and useful trip planning updates.",
  emailLabel: "Subscribed email",
  cta: "Plan your trip",
  footer: "Skopje Routes, private North Macedonia tours from Skopje.",
};

const macedonianSection: NewsletterEmailSection = {
  language: "mk",
  label: "Македонски",
  title: "Додадени сте во билтенот на Skopje Routes.",
  intro:
    "Ви благодариме што се приклучивте на Skopje Routes. Ќе ви испраќаме идеи за приватни тури во Северна Македонија, локални белешки и корисни новости за планирање патување.",
  emailLabel: "Пријавена е-пошта",
  cta: "Планирај патување",
  footer: "Skopje Routes, приватни тури низ Северна Македонија од Скопје.",
};

const emailSubject = "Skopje Routes newsletter confirmation / Потврда за билтенот";
const emailPreheader =
  "Your newsletter subscription is confirmed. / Вашата претплата за билтенот е потврдена.";

export async function sendNewsletterConfirmationEmail({
  email,
  language,
}: SendNewsletterConfirmationOptions): Promise<NewsletterEmailResult> {
  const message = buildNewsletterConfirmationEmail(email, language);

  return sendTransactionalEmail({
    to: email,
    subject: message.subject,
    html: message.html,
    text: message.text,
  });
}

function buildNewsletterConfirmationEmail(email: string, language: Language) {
  const sections = getEmailSections(language);
  const siteUrl = getSiteUrl();
  const tripUrl = `${siteUrl}/custom-trip`;
  const escapedEmail = escapeHtml(email);
  const escapedTripUrl = escapeHtml(tripUrl);

  const text = sections
    .flatMap((section) => [
      `[${section.label}]`,
      section.title,
      "",
      section.intro,
      "",
      `${section.emailLabel}: ${email}`,
      `${section.cta}: ${tripUrl}`,
      "",
      section.footer,
    ])
    .join("\n");

  const sectionHtml = sections
    .map(
      (section, index) => `<tr>
              <td lang="${section.language}" style="padding:${index === 0 ? "28px 30px" : "24px 30px 28px"};color:#e7dcc8;${index === 0 ? "" : "border-top:1px solid rgba(255,255,255,.12);"}">
                <p style="margin:0 0 12px;color:#d3ad5b;font-size:11px;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(section.label)}</p>
                <h2 style="margin:0 0 18px;color:#fff8e7;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.12;font-weight:400;">${escapeHtml(section.title)}</h2>
                <p style="margin:0 0 22px;font-size:16px;line-height:1.7;">${escapeHtml(section.intro)}</p>
                <div style="margin:0 0 24px;padding:14px 16px;background:#1d1b16;border:1px solid rgba(255,255,255,.12);">
                  <p style="margin:0 0 6px;color:#d3ad5b;font-size:11px;letter-spacing:2px;text-transform:uppercase;">${escapeHtml(section.emailLabel)}</p>
                  <p style="margin:0;color:#fff8e7;font-size:15px;">${escapedEmail}</p>
                </div>
                <a href="${escapedTripUrl}" style="display:inline-block;background:#d3ad5b;color:#11100d;text-decoration:none;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-size:12px;padding:14px 18px;">${escapeHtml(section.cta)}</a>
              </td>
            </tr>`,
    )
    .join("");

  const html = `<!doctype html>
<html lang="${sections[0].language}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(emailSubject)}</title>
  </head>
  <body style="margin:0;background:#f4efe4;color:#17140f;font-family:Arial,Helvetica,sans-serif;">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;">${escapeHtml(emailPreheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4efe4;padding:32px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#11100d;border:1px solid #d3ad5b;">
            <tr>
              <td style="padding:28px 30px 18px;border-bottom:1px solid rgba(211,173,91,.35);">
                <p style="margin:0;color:#d3ad5b;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Skopje Routes</p>
                <h1 style="margin:12px 0 0;color:#fff8e7;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.08;font-weight:400;">${escapeHtml(emailSubject)}</h1>
              </td>
            </tr>
            ${sectionHtml}
            <tr>
              <td style="padding:18px 30px 26px;border-top:1px solid rgba(255,255,255,.1);color:#9d9485;font-size:12px;line-height:1.6;">
                ${sections.map((section) => escapeHtml(section.footer)).join("<br />")}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  return {
    subject: emailSubject,
    html,
    text,
  };
}

function getEmailSections(language: Language): NewsletterEmailSection[] {
  if (language === "mk") {
    return [macedonianSection, englishSection];
  }

  return [englishSection, macedonianSection];
}

function getSiteUrl() {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? "http://127.0.0.1:3000";
  return url.replace(/\/$/, "");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
