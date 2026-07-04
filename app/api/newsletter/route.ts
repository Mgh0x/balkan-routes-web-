import { mkdir, readFile, writeFile } from "fs/promises";
import { dirname, join } from "path";
import { NextResponse } from "next/server";
import { sendNewsletterConfirmationEmail } from "@/lib/newsletter-email";
import type { NewsletterEmailResult } from "@/lib/newsletter-email";
import type { Language } from "@/types";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const subscribersPath = join(process.cwd(), "data", "newsletter-subscribers.json");
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const languages: Language[] = ["en", "mk", "tr"];

type NewsletterSubscriber = {
  id: string;
  email: string;
  createdAt: string;
  source: "website-footer";
  language: Language;
};

type NewsletterRequest = {
  email?: unknown;
  language?: unknown;
};

async function readSubscribers(): Promise<NewsletterSubscriber[]> {
  try {
    const raw = await readFile(subscribersPath, "utf8");
    const parsed = JSON.parse(raw) as NewsletterSubscriber[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function writeSubscribers(subscribers: NewsletterSubscriber[]) {
  await mkdir(dirname(subscribersPath), { recursive: true });
  await writeFile(subscribersPath, `${JSON.stringify(subscribers, null, 2)}\n`, "utf8");
}

function parseLanguage(language: unknown): Language {
  if (typeof language === "string" && languages.includes(language as Language)) {
    return language as Language;
  }

  return "en";
}

export async function POST(request: Request) {
  let body: NewsletterRequest;

  try {
    body = (await request.json()) as NewsletterRequest;
  } catch {
    return NextResponse.json({ ok: false, code: "invalid_request" }, { status: 400 });
  }

  const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
  const language = parseLanguage(body.language);

  if (!emailPattern.test(email)) {
    return NextResponse.json({ ok: false, code: "invalid_email" }, { status: 400 });
  }

  const subscribers = await readSubscribers();
  const alreadySubscribed = subscribers.some((subscriber) => subscriber.email === email);

  if (alreadySubscribed) {
    return NextResponse.json({ ok: false, code: "already_subscribed", email }, { status: 409 });
  }

  const nextSubscriber: NewsletterSubscriber = {
    id: crypto.randomUUID(),
    email,
    createdAt: new Date().toISOString(),
    source: "website-footer",
    language,
  };

  await writeSubscribers([...subscribers, nextSubscriber]);

  const confirmationEmail: NewsletterEmailResult = await sendNewsletterConfirmationEmail({ email, language });

  return NextResponse.json(
    {
      ok: true,
      code: "subscribed",
      email,
      confirmationEmail: confirmationEmail.status,
      confirmationProvider: confirmationEmail.provider ?? null,
    },
    { status: 201 },
  );
}
