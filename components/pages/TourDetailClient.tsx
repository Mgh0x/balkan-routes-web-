"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";
import { SectionTitle } from "@/components/SectionTitle";
import { TourGrid } from "@/components/TourGrid";
import { useTranslation } from "@/components/LanguageProvider";
import { list, text } from "@/lib/localize";
import type { Tour } from "@/types";

export function TourDetailClient({ tour, relatedTours }: { tour: Tour; relatedTours: Tour[] }) {
  const { dictionary, language } = useTranslation();
  const facts = [
    [dictionary.common.location, text(tour.location, language)],
    [dictionary.common.duration, text(tour.duration, language)],
    [dictionary.common.price, tour.price],
    [dictionary.common.groupSize, text(tour.groupSize, language)],
    [dictionary.common.difficulty, text(tour.difficulty, language)],
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-[var(--ink)] pt-28 text-white">
        <Image src={tour.image} alt={text(tour.title, language)} fill priority sizes="100vw" className="hero-poster-motion object-cover opacity-58" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.34)_52%,rgba(0,0,0,0.62))]" aria-hidden="true" />
        <div className="container-shell relative z-10 flex min-h-[64vh] items-end pb-12">
          <div className="motion-reveal motion-reveal--soft max-w-4xl border-b border-white/16 pb-9">
            <Link href="/tours" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-white/72 hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" />
              {dictionary.common.backToTours}
            </Link>
            <h1 className="font-display text-5xl leading-[0.96] text-balance md:text-7xl lg:text-8xl">{text(tour.title, language)}</h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/76 md:text-lg">{text(tour.description, language)}</p>
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-12">
        <div className="motion-list container-shell grid gap-0 border-y border-[var(--line)] md:grid-cols-5">
          {facts.map(([label, value]) => (
            <div key={label} className="motion-reveal motion-reveal--line border-b border-[var(--line)] py-5 md:border-b-0 md:border-r md:px-5 md:last:border-r-0">
              <p className="fine-label text-[var(--stone-dark)]">{label}</p>
              <p className="mt-2 font-display text-2xl leading-tight text-[var(--ink)]">{value}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[var(--warm-white)] section-pad">
        <div className="container-shell grid gap-14 lg:grid-cols-[1fr_420px]">
          <article className="space-y-14">
            <TextSection title={dictionary.common.overview} body={text(tour.overview, language)} />
            <ListSection title={dictionary.common.highlights} items={list(tour.highlights, language)} ordered={false} />
            <ListSection title={dictionary.common.itinerary} items={list(tour.itinerary, language)} ordered />
            <div className="grid gap-6 md:grid-cols-2">
              <ListSection title={dictionary.common.included} items={list(tour.included, language)} ordered={false} compact />
              <ListSection title={dictionary.common.notIncluded} items={list(tour.notIncluded, language)} ordered={false} compact />
            </div>
          </article>

          <aside className="space-y-8">
            <div className="motion-reveal motion-reveal--soft border border-[var(--line)] bg-[var(--paper)] p-6">
              <h2 className="mb-4 font-display text-4xl text-[var(--ink)]">{dictionary.common.inquiry}</h2>
              <ContactForm compact />
            </div>
            <div className="motion-reveal motion-reveal--soft border border-[var(--line)] bg-[var(--ink)] p-6 text-white">
              <h2 className="font-display text-3xl">{dictionary.common.map}</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">{tour.mapQuery}</p>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(tour.mapQuery)}`}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-2 border border-[var(--gold)] bg-[var(--gold)] px-5 py-3 text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--ink)]"
              >
                {dictionary.common.openMap}
                <ExternalLink size={15} aria-hidden="true" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[var(--paper)] section-pad section-rule">
        <div className="container-shell">
          <SectionTitle title={dictionary.common.gallery} />
          <div className="motion-list mt-10 grid gap-5 md:grid-cols-3">
            {tour.gallery.map((image, index) => (
              <div key={`${image}-${index}`} className="media-frame motion-reveal motion-reveal--image relative aspect-[4/3]">
                <Image src={image} alt={`${text(tour.title, language)} gallery ${index + 1}`} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--warm-white)] section-pad section-rule">
        <div className="container-shell">
          <SectionTitle title={dictionary.common.relatedTours} />
          <div className="mt-10">
            <TourGrid tours={relatedTours} />
          </div>
        </div>
      </section>
    </>
  );
}

function TextSection({ title, body }: { title: string; body: string }) {
  return (
    <section className="motion-reveal motion-reveal--line border-t border-[var(--line)] pt-7">
      <h2 className="font-display text-4xl leading-tight text-[var(--ink)]">{title}</h2>
      <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--muted)]">{body}</p>
    </section>
  );
}

function ListSection({ title, items, ordered, compact = false }: { title: string; items: string[]; ordered: boolean; compact?: boolean }) {
  const Tag = ordered ? "ol" : "ul";

  return (
    <section className={compact ? "motion-reveal motion-reveal--line border-t border-[var(--line)] pt-6" : "motion-reveal motion-reveal--line border-t border-[var(--line)] pt-7"}>
      <h2 className="font-display text-4xl leading-tight text-[var(--ink)]">{title}</h2>
      <Tag className="mt-5 space-y-3 text-base leading-7 text-[var(--muted)]">
        {items.map((item, index) => (
          <li key={`${item}-${index}`} className={ordered ? "ml-5 list-decimal pl-2" : "ml-5 list-disc pl-2"}>
            {item}
          </li>
        ))}
      </Tag>
    </section>
  );
}
