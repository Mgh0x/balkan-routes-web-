"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { BrandMark } from "@/components/BrandMark";
import { useTranslation } from "@/components/LanguageProvider";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type NewsletterApiResponse = {
  ok: boolean;
  code: "subscribed" | "already_subscribed" | "invalid_email" | "invalid_request";
  email?: string;
  confirmationEmail?: "sent" | "not_configured" | "failed";
  confirmationProvider?: "resend" | "smtp" | null;
};

export function Footer() {
  const { dictionary, language } = useTranslation();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterMessage, setNewsletterMessage] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const nav = [
    [dictionary.nav.about, "/about"],
    [dictionary.nav.tours, "/tours"],
    [dictionary.nav.services, "/services"],
    [dictionary.nav.team, "/team"],
    [dictionary.nav.blog, "/blog"],
    [dictionary.nav.contact, "/contact"],
  ];

  const handleNewsletterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const normalizedEmail = newsletterEmail.trim().toLowerCase();

    if (!emailPattern.test(normalizedEmail)) {
      setNewsletterStatus("error");
      setNewsletterMessage(dictionary.common.newsletterError);
      return;
    }

    try {
      setNewsletterStatus("submitting");
      setNewsletterMessage(dictionary.common.submitting);

      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: normalizedEmail, language }),
      });
      const result = (await response.json()) as NewsletterApiResponse;
      const responseEmail = result.email ?? normalizedEmail;

      if (response.ok && result.code === "subscribed") {
        setNewsletterStatus("success");
        setNewsletterMessage(dictionary.common.newsletterSuccess.replace("{email}", responseEmail));
        setNewsletterEmail("");
        return;
      }

      if (result.code === "already_subscribed") {
        setNewsletterStatus("success");
        setNewsletterMessage(dictionary.common.newsletterDuplicate.replace("{email}", responseEmail));
        return;
      }

      setNewsletterStatus("error");
      setNewsletterMessage(dictionary.common.newsletterError);
    } catch {
      setNewsletterStatus("error");
      setNewsletterMessage(dictionary.common.newsletterServerError);
    }
  };

  return (
    <footer id="site-footer" className="bg-[var(--ink)] py-14 text-white md:py-20">
      <div className="container-shell grid gap-12 border-y border-white/10 py-10 lg:grid-cols-[1.15fr_0.85fr_1fr]">
        <div>
          <Link href="/" className="flex items-center gap-3">
            <BrandMark variant="footer" />
          </Link>
          <Image
            src="/images/skopje-routes-badge.png"
            alt=""
            width={432}
            height={382}
            aria-hidden="true"
            className="footer-brand-badge"
          />
          <p className="mt-5 max-w-md text-sm leading-7 text-white/68">{dictionary.brand.tagline}</p>
          <div className="mt-7 flex gap-3">
            <a className="grid h-10 w-10 place-items-center border border-white/15 text-white/75 transition hover:border-[var(--gold)] hover:text-white" href="https://www.instagram.com/skopjeroutes/" aria-label="Instagram">
              <InstagramMark />
            </a>
            <a className="grid h-10 w-10 place-items-center border border-white/15 text-white/75 transition hover:border-[var(--gold)] hover:text-white" href="https://www.facebook.com/skopjeroutes/" aria-label="Facebook">
              <FacebookMark />
            </a>
            <a className="grid h-10 w-10 place-items-center border border-white/15 text-white/75 transition hover:border-[var(--gold)] hover:text-white" href="mailto:hello@skopjeroutes.mk" aria-label="Email">
              <Mail size={18} aria-hidden="true" />
            </a>
          </div>
        </div>

        <div>
          <h2 className="fine-label text-[var(--gold)]">Navigation</h2>
          <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-white/10 pt-5 text-sm text-white/72">
            {nav.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-white">
                {label}
              </Link>
            ))}
            <Link href="/privacy-policy" className="transition hover:text-white">
              {dictionary.pages.privacy.title}
            </Link>
            <Link href="/cookie-policy" className="transition hover:text-white">
              {dictionary.pages.cookiePolicy.title}
            </Link>
            <Link href="/project-team" className="transition hover:text-white">
              Website Credits
            </Link>
          </div>
        </div>

        <div>
          <h2 className="fine-label text-[var(--gold)]">{dictionary.common.newsletter}</h2>
          <form className="mt-5 space-y-3" onSubmit={handleNewsletterSubmit} noValidate>
            <label className="sr-only" htmlFor="newsletter-email">
              {dictionary.common.newsletterPlaceholder}
            </label>
            <div className="flex gap-2">
              <input
                id="newsletter-email"
                type="email"
                value={newsletterEmail}
                onChange={(event) => {
                  setNewsletterEmail(event.target.value);
                  if (newsletterStatus !== "idle" && newsletterStatus !== "submitting") {
                    setNewsletterStatus("idle");
                    setNewsletterMessage("");
                  }
                }}
                aria-describedby="newsletter-feedback"
                aria-invalid={newsletterStatus === "error"}
                placeholder={dictionary.common.newsletterPlaceholder}
                className="min-h-12 min-w-0 flex-1 border border-white/15 bg-white/8 px-4 text-sm text-white outline-none placeholder:text-white/42 focus:border-[var(--gold)]"
              />
              <button
                type="submit"
                aria-label={dictionary.common.newsletterButton}
                disabled={newsletterStatus === "submitting"}
                className="grid h-12 w-12 place-items-center bg-[var(--gold)] text-[var(--ink)] transition hover:bg-white disabled:cursor-wait disabled:opacity-70"
              >
                <Send size={18} aria-hidden="true" />
              </button>
            </div>
            <p
              id="newsletter-feedback"
              aria-live="polite"
              className={newsletterStatus === "error" ? "min-h-5 text-sm text-red-300" : "min-h-5 text-sm text-[var(--gold)]"}
            >
              {newsletterMessage}
            </p>
          </form>
          <div className="mt-7 space-y-2 text-sm text-white/68">
            <p>{dictionary.common.email}: hello@skopjeroutes.mk</p>
            <p>{dictionary.common.phone}: +389 70 555 210</p>
            <p>{dictionary.common.address}: Macedonia Street 12, Skopje</p>
          </div>
        </div>
      </div>
      <div className="container-shell mt-10 text-xs text-white/45">
        &copy; {new Date().getFullYear()} Skopje Routes. 0xmgh. {dictionary.common.copyright}
      </div>
    </footer>
  );
}

function InstagramMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none">
      <rect x="5" y="5" width="14" height="14" rx="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3.2" stroke="currentColor" strokeWidth="2" />
      <circle cx="16.4" cy="7.7" r="1" fill="currentColor" />
    </svg>
  );
}

function FacebookMark() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="currentColor">
      <path d="M13.7 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.3-1.5 1.6-1.5h1.7V3.6c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.1v2.3H7.9V13h2.7v8h3.1Z" />
    </svg>
  );
}
