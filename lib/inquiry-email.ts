import { getNotificationRecipient, sendTransactionalEmail } from "@/lib/email-delivery";
import type { EmailDeliveryResult } from "@/lib/email-delivery";
import type { Language } from "@/types";

export type ContactInquiryEmailPayload = {
  id: string;
  createdAt: string;
  language: Language;
  name: string;
  email: string;
  phone: string;
  country: string;
  travelDates: string;
  travelers: string;
  interestedTour: string;
  message: string;
};

export type TripRequestEmailPayload = {
  id: string;
  createdAt: string;
  language: Language;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  arrivalDate: string;
  departureDate: string;
  travelers: string;
  preferredDestinations: string;
  travelStyle: string;
  budgetRange: string;
  accommodation: string;
  specialRequests: string;
};

export type InquiryEmailResults = {
  notificationEmail: EmailDeliveryResult;
  confirmationEmail: EmailDeliveryResult;
};

export async function sendContactInquiryEmails(
  inquiry: ContactInquiryEmailPayload,
): Promise<InquiryEmailResults> {
  const notificationEmail = await sendTransactionalEmail({
    to: getNotificationRecipient(),
    subject: `New Skopje Routes inquiry - ${inquiry.name}`,
    html: buildAdminEmail({
      title: "New contact inquiry",
      intro: "A visitor submitted the contact form on Skopje Routes.",
      fields: [
        ["Reference", inquiry.id],
        ["Submitted", inquiry.createdAt],
        ["Language", inquiry.language.toUpperCase()],
        ["Name", inquiry.name],
        ["Email", inquiry.email],
        ["Phone", inquiry.phone || "-"],
        ["Country", inquiry.country],
        ["Travel dates", inquiry.travelDates],
        ["Travelers", inquiry.travelers],
        ["Interested tour", inquiry.interestedTour || "-"],
        ["Message", inquiry.message],
      ],
    }),
    text: buildPlainText([
      ["Reference", inquiry.id],
      ["Submitted", inquiry.createdAt],
      ["Name", inquiry.name],
      ["Email", inquiry.email],
      ["Phone", inquiry.phone || "-"],
      ["Country", inquiry.country],
      ["Travel dates", inquiry.travelDates],
      ["Travelers", inquiry.travelers],
      ["Interested tour", inquiry.interestedTour || "-"],
      ["Message", inquiry.message],
    ]),
    replyTo: inquiry.email,
  });

  const confirmationEmail = await sendTransactionalEmail({
    to: inquiry.email,
    subject: "We received your Skopje Routes message / Го добивме вашето барање",
    html: buildVisitorConfirmationEmail({
      reference: inquiry.id,
      headingEn: "We received your message.",
      bodyEn:
        "Thank you for contacting Skopje Routes. Our team will review your message and reply with the next practical steps.",
      headingMk: "Ја добивме вашата порака.",
      bodyMk:
        "Ви благодариме што го контактиравте Skopje Routes. Нашиот тим ќе ја прегледа пораката и ќе ви одговори со следните практични чекори.",
    }),
    text: [
      "We received your message.",
      "Thank you for contacting Skopje Routes. Our team will reply with the next practical steps.",
      "",
      "Ја добивме вашата порака.",
      "Ви благодариме што го контактиравте Skopje Routes. Нашиот тим ќе ви одговори.",
      "",
      `Reference: ${inquiry.id}`,
    ].join("\n"),
  });

  return { notificationEmail, confirmationEmail };
}

export async function sendTripRequestEmails(request: TripRequestEmailPayload): Promise<InquiryEmailResults> {
  const notificationEmail = await sendTransactionalEmail({
    to: getNotificationRecipient(),
    subject: `New custom trip request - ${request.fullName}`,
    html: buildAdminEmail({
      title: "New custom trip request",
      intro: "A visitor submitted the custom trip planner form on Skopje Routes.",
      fields: [
        ["Reference", request.id],
        ["Submitted", request.createdAt],
        ["Language", request.language.toUpperCase()],
        ["Full name", request.fullName],
        ["Email", request.email],
        ["Phone", request.phone || "-"],
        ["Country", request.country],
        ["Arrival date", request.arrivalDate],
        ["Departure date", request.departureDate],
        ["Travelers", request.travelers],
        ["Preferred destinations", request.preferredDestinations],
        ["Travel style", request.travelStyle],
        ["Budget range", request.budgetRange],
        ["Accommodation", request.accommodation || "-"],
        ["Special requests", request.specialRequests || "-"],
      ],
    }),
    text: buildPlainText([
      ["Reference", request.id],
      ["Submitted", request.createdAt],
      ["Full name", request.fullName],
      ["Email", request.email],
      ["Phone", request.phone || "-"],
      ["Country", request.country],
      ["Arrival date", request.arrivalDate],
      ["Departure date", request.departureDate],
      ["Travelers", request.travelers],
      ["Preferred destinations", request.preferredDestinations],
      ["Travel style", request.travelStyle],
      ["Budget range", request.budgetRange],
      ["Accommodation", request.accommodation || "-"],
      ["Special requests", request.specialRequests || "-"],
    ]),
    replyTo: request.email,
  });

  const confirmationEmail = await sendTransactionalEmail({
    to: request.email,
    subject: "We received your custom trip request / Го добивме вашето барање за патување",
    html: buildVisitorConfirmationEmail({
      reference: request.id,
      headingEn: "Your custom trip request is in.",
      bodyEn:
        "Thank you for sharing your dates and travel preferences. Skopje Routes will review the details and reply with a personal route proposal.",
      headingMk: "Вашето барање за патување е примено.",
      bodyMk:
        "Ви благодариме што ги споделивте датумите и желбите за патување. Skopje Routes ќе ги разгледа деталите и ќе ви одговори со личен предлог-маршрут.",
    }),
    text: [
      "Your custom trip request is in.",
      "Skopje Routes will review the details and reply with a personal route proposal.",
      "",
      "Вашето барање за патување е примено.",
      "Skopje Routes ќе ги разгледа деталите и ќе ви одговори со личен предлог-маршрут.",
      "",
      `Reference: ${request.id}`,
    ].join("\n"),
  });

  return { notificationEmail, confirmationEmail };
}

function buildAdminEmail({
  title,
  intro,
  fields,
}: {
  title: string;
  intro: string;
  fields: Array<[string, string]>;
}) {
  const rows = fields
    .map(
      ([label, value]) => `<tr>
        <td style="padding:10px 12px;border-bottom:1px solid #ece4d6;color:#806d4c;font-size:12px;text-transform:uppercase;letter-spacing:1.6px;vertical-align:top;width:190px;">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;border-bottom:1px solid #ece4d6;color:#17140f;font-size:14px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(value)}</td>
      </tr>`,
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4efe4;color:#17140f;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4efe4;padding:28px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:720px;background:#fffaf0;border:1px solid #d3ad5b;">
            <tr>
              <td style="padding:26px 28px;background:#11100d;color:#fff8e7;">
                <p style="margin:0 0 10px;color:#d3ad5b;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Skopje Routes</p>
                <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.1;font-weight:400;">${escapeHtml(title)}</h1>
                <p style="margin:14px 0 0;color:#d9cfbc;font-size:15px;line-height:1.6;">${escapeHtml(intro)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 20px 22px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                  ${rows}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildVisitorConfirmationEmail({
  reference,
  headingEn,
  bodyEn,
  headingMk,
  bodyMk,
}: {
  reference: string;
  headingEn: string;
  bodyEn: string;
  headingMk: string;
  bodyMk: string;
}) {
  return `<!doctype html>
<html lang="en">
  <body style="margin:0;background:#f4efe4;color:#17140f;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4efe4;padding:32px 14px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:640px;background:#11100d;border:1px solid #d3ad5b;">
            <tr>
              <td style="padding:28px 30px 18px;border-bottom:1px solid rgba(211,173,91,.35);">
                <p style="margin:0;color:#d3ad5b;font-size:12px;letter-spacing:3px;text-transform:uppercase;">Skopje Routes</p>
                <h1 style="margin:12px 0 0;color:#fff8e7;font-family:Georgia,'Times New Roman',serif;font-size:32px;line-height:1.08;font-weight:400;">Request received / Барањето е примено</h1>
              </td>
            </tr>
            <tr>
              <td lang="en" style="padding:28px 30px;color:#e7dcc8;">
                <p style="margin:0 0 12px;color:#d3ad5b;font-size:11px;letter-spacing:2px;text-transform:uppercase;">English</p>
                <h2 style="margin:0 0 18px;color:#fff8e7;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.12;font-weight:400;">${escapeHtml(headingEn)}</h2>
                <p style="margin:0;font-size:16px;line-height:1.7;">${escapeHtml(bodyEn)}</p>
              </td>
            </tr>
            <tr>
              <td lang="mk" style="padding:24px 30px 28px;color:#e7dcc8;border-top:1px solid rgba(255,255,255,.12);">
                <p style="margin:0 0 12px;color:#d3ad5b;font-size:11px;letter-spacing:2px;text-transform:uppercase;">Македонски</p>
                <h2 style="margin:0 0 18px;color:#fff8e7;font-family:Georgia,'Times New Roman',serif;font-size:28px;line-height:1.12;font-weight:400;">${escapeHtml(headingMk)}</h2>
                <p style="margin:0;font-size:16px;line-height:1.7;">${escapeHtml(bodyMk)}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:18px 30px 26px;border-top:1px solid rgba(255,255,255,.1);color:#9d9485;font-size:12px;line-height:1.6;">
                Reference: ${escapeHtml(reference)}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildPlainText(fields: Array<[string, string]>) {
  return fields.map(([label, value]) => `${label}: ${value}`).join("\n");
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
