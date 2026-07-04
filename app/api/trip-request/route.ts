import { NextResponse } from "next/server";
import { appendJsonItem } from "@/lib/json-store";
import { sendTripRequestEmails } from "@/lib/inquiry-email";
import type { TripRequestEmailPayload } from "@/lib/inquiry-email";
import type { Language } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const languages: Language[] = ["en", "mk", "tr"];
const storeFile = "trip-requests.json";

type TripRequest = Partial<Record<keyof TripRequestEmailPayload, unknown>>;

export async function POST(request: Request) {
  let body: TripRequest;

  try {
    body = (await request.json()) as TripRequest;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }

  const tripRequest: TripRequestEmailPayload = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    language: parseLanguage(body.language),
    fullName: asString(body.fullName),
    email: asString(body.email).toLowerCase(),
    phone: asString(body.phone),
    country: asString(body.country),
    arrivalDate: asString(body.arrivalDate),
    departureDate: asString(body.departureDate),
    travelers: asString(body.travelers),
    preferredDestinations: asString(body.preferredDestinations),
    travelStyle: asString(body.travelStyle),
    budgetRange: asString(body.budgetRange),
    accommodation: asString(body.accommodation),
    specialRequests: asString(body.specialRequests),
  };

  const missingRequiredField = [
    tripRequest.fullName,
    tripRequest.email,
    tripRequest.country,
    tripRequest.arrivalDate,
    tripRequest.departureDate,
    tripRequest.travelers,
    tripRequest.preferredDestinations,
    tripRequest.travelStyle,
    tripRequest.budgetRange,
  ].some((value) => !value);

  if (missingRequiredField) {
    return NextResponse.json({ ok: false, code: "missing_required_fields" }, { status: 400 });
  }

  if (!emailPattern.test(tripRequest.email)) {
    return NextResponse.json({ ok: false, code: "invalid_email" }, { status: 400 });
  }

  await appendJsonItem(storeFile, tripRequest);

  const emailResults = await sendTripRequestEmails(tripRequest);

  return NextResponse.json(
    {
      ok: true,
      code: "trip_request_submitted",
      id: tripRequest.id,
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
