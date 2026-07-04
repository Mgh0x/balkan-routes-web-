import { NextResponse } from "next/server";
import { appendJsonItem } from "@/lib/json-store";
import { sendContactInquiryEmails } from "@/lib/inquiry-email";
import type { ContactInquiryEmailPayload } from "@/lib/inquiry-email";
import type { Language } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const languages: Language[] = ["en", "mk", "tr"];
const storeFile = "contact-submissions.json";

type ContactRequest = Partial<Record<keyof ContactInquiryEmailPayload | "consent", unknown>>;

export async function POST(request: Request) {
  let body: ContactRequest;

  try {
    body = (await request.json()) as ContactRequest;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }

  const submission: ContactInquiryEmailPayload & { consent: boolean } = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    language: parseLanguage(body.language),
    name: asString(body.name),
    email: asString(body.email).toLowerCase(),
    phone: asString(body.phone),
    country: asString(body.country),
    travelDates: asString(body.travelDates),
    travelers: asString(body.travelers),
    interestedTour: asString(body.interestedTour),
    message: asString(body.message),
    consent: body.consent === true,
  };

  const missingRequiredField = [
    submission.name,
    submission.email,
    submission.country,
    submission.travelDates,
    submission.travelers,
    submission.message,
  ].some((value) => !value);

  if (missingRequiredField || !submission.consent) {
    return NextResponse.json({ ok: false, code: "missing_required_fields" }, { status: 400 });
  }

  if (!emailPattern.test(submission.email)) {
    return NextResponse.json({ ok: false, code: "invalid_email" }, { status: 400 });
  }

  await appendJsonItem(storeFile, submission);

  const emailResults = await sendContactInquiryEmails(submission);

  return NextResponse.json(
    {
      ok: true,
      code: "contact_submitted",
      id: submission.id,
      notificationEmail: emailResults.notificationEmail.status,
      confirmationEmail: emailResults.confirmationEmail.status,
    },
    { status: 201 },
  );
}

function asString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function parseLanguage(language: unknown): Language {
  if (typeof language === "string" && languages.includes(language as Language)) {
    return language as Language;
  }

  return "en";
}
