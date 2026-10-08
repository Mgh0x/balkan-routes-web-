"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, MapPin } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";
import { text } from "@/lib/localize";
import type { Tour } from "@/types";

export function TourCard({ tour, index = 0 }: { tour: Tour; index?: number }) {
  const { dictionary, language } = useTranslation();

  return (
    <article className="tour-card-motion motion-reveal motion-reveal--line group grid gap-5 border-b border-[var(--line)] bg-[var(--paper)] py-7 transition duration-300 hover:bg-white md:grid-cols-[74px_260px_1fr_170px] md:items-center md:pr-6">
      <div className="hidden h-full border-r border-[var(--line)] pr-5 md:flex md:items-start">
        <span className="font-display text-4xl leading-none text-[var(--gold-ink)]">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="media-frame relative aspect-[16/10] md:aspect-[5/4]">
        <Image
          src={tour.image}
          alt={text(tour.title, language)}
          fill
          sizes="(min-width: 1024px) 260px, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />
      </div>
      <div className="md:px-2">
        <div className="flex flex-wrap gap-4 text-[0.68rem] font-bold uppercase tracking-[0.16em] text-[var(--stone-dark)]">
          <span className="inline-flex items-center gap-1.5">
            <MapPin size={13} aria-hidden="true" />
            {text(tour.location, language)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Clock size={13} aria-hidden="true" />
            {text(tour.duration, language)}
          </span>
        </div>
        <h3 className="mt-3 font-display text-3xl leading-tight text-[var(--ink)] md:text-4xl">{text(tour.title, language)}</h3>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-[var(--muted)]">{text(tour.description, language)}</p>
      </div>
      <div className="flex items-center justify-between gap-4 md:block md:justify-self-end md:text-right">
        <div>
          <p className="text-[0.66rem] font-bold uppercase tracking-[0.18em] text-[var(--muted)]">{dictionary.common.startingAt}</p>
          <p className="mt-1 font-display text-2xl text-[var(--forest)]">{tour.price}</p>
        </div>
        <Link href={`/tours/${tour.slug}`} className="mt-0 inline-flex items-center gap-2 border-b border-[var(--ink)] pb-1 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[var(--ink)] transition hover:text-[var(--forest)] md:mt-7">
          {dictionary.common.viewDetails}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
