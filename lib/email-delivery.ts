import nodemailer from "nodemailer";
import { Resend } from "resend";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type EmailProvider = "resend" | "smtp";

export type EmailDeliveryResult = {
  status: "sent" | "not_configured" | "failed";
  provider?: EmailProvider;
  id?: string;
};

type SendTransactionalEmailOptions = {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

let resendClient: Resend | null = null;
let smtpTransporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> | null = null;

export async function sendTransactionalEmail({
  to,
  subject,
  html,
  text,
  replyTo,
}: SendTransactionalEmailOptions): Promise<EmailDeliveryResult> {
  const provider = getPreferredProvider();

  if (!provider) {
    return { status: "not_configured" };
  }

  try {
    const from = getFromAddress(provider);
    const effectiveReplyTo = replyTo ?? process.env.EMAIL_REPLY_TO ?? process.env.MAIL_REPLY_TO;

    if (provider === "resend") {
      if (!process.env.RESEND_API_KEY) {
        return { status: "not_configured", provider };
      }

      const { data, error } = await getResendClient().emails.send({
        from,
        to,
        subject,
        html,
        text,
        ...(effectiveReplyTo ? { replyTo: effectiveReplyTo } : {}),
      });

      if (error) {
        console.error("Transactional email failed", error);
        return { status: "failed", provider };
      }

      return { status: "sent", provider, id: data?.id };
    }

    if (!hasSmtpConfig()) {
      return { status: "not_configured", provider };
    }

    const info = await getSmtpTransporter().sendMail({
      from,
      to,
      subject,
      html,
      text,
      ...(effectiveReplyTo ? { replyTo: effectiveReplyTo } : {}),
    });

    return { status: "sent", provider, id: info.messageId };
  } catch (error) {
    console.error("Transactional email failed", error);
    return { status: "failed", provider };
  }
}

export function getNotificationRecipient() {
  return (
    process.env.CONTACT_TO_EMAIL ??
    process.env.EMAIL_TO ??
    process.env.EMAIL_REPLY_TO ??
    process.env.SMTP_USER ??
    "hello@skopjeroutes.mk"
  );
}

function getPreferredProvider(): EmailProvider | null {
  const requestedProvider = process.env.EMAIL_PROVIDER?.toLowerCase();

  if (requestedProvider === "resend" || requestedProvider === "smtp") {
    return requestedProvider;
  }

  if (process.env.RESEND_API_KEY) {
    return "resend";
  }

  if (hasSmtpConfig()) {
    return "smtp";
  }

  return null;
}

function hasSmtpConfig() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function getResendClient() {
  if (!resendClient) {
    resendClient = new Resend(process.env.RESEND_API_KEY);
  }

  return resendClient;
}

function getSmtpTransporter() {
  if (!smtpTransporter) {
    const port = Number(process.env.SMTP_PORT ?? "465");
    const secure =
      process.env.SMTP_SECURE === undefined ? port === 465 : process.env.SMTP_SECURE === "true";

    smtpTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  return smtpTransporter;
}

function getFromAddress(provider: EmailProvider) {
  const configuredFrom = process.env.EMAIL_FROM ?? process.env.MAIL_FROM ?? process.env.SMTP_FROM;

  if (configuredFrom) {
    return configuredFrom;
  }

  if (provider === "smtp" && process.env.SMTP_USER) {
    return `Skopje Routes <${process.env.SMTP_USER}>`;
  }

  return "Skopje Routes <onboarding@resend.dev>";
}
