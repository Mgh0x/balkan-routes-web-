"use client";

import { Quote } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";
import { text } from "@/lib/localize";
import type { Testimonial } from "@/types";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { language } = useTranslation();

  return (
    <article className="border-t border-white/14 py-6 text-white">
      <Quote className="text-[var(--gold)]" size={28} aria-hidden="true" />
      <p className="mt-5 text-lg leading-8 text-white/82">&quot;{text(testimonial.quote, language)}&quot;</p>
      <p className="mt-7 font-semibold">{testimonial.name}</p>
      <p className="mt-1 text-sm text-white/52">{text(testimonial.origin, language)}</p>
    </article>
  );
}
