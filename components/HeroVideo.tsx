"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowRight, Car, Compass, MessageCircle } from "lucide-react";
import { useState } from "react";
import { images } from "@/data/images";
import { useTranslation } from "@/components/LanguageProvider";

export function HeroVideo({ hasVideo }: { hasVideo: boolean }) {
  const { dictionary } = useTranslation();
  const [videoFailed, setVideoFailed] = useState(false);
  const routeNotes = [
    { label: "Private route", value: "Skopje / Matka / Ohrid", icon: Compass },
    { label: "Local contact", value: "Planning from Skopje", icon: MessageCircle },
    { label: "Transfer ready", value: "Airport and day routes", icon: Car },
  ];

  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-[var(--ink)] text-white">
      <Image
        src={images.heroPoster}
        alt="Mountain landscape in North Macedonia"
        fill
        priority
        sizes="100vw"
        className="hero-poster-motion object-cover"
      />
      {hasVideo && !videoFailed ? (
        <video
          className="hero-video absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          poster={images.heroPoster}
          aria-hidden="true"
          onError={() => setVideoFailed(true)}
        >
          <source src="/videos/north-macedonia-hero.mp4" type="video/mp4" onError={() => setVideoFailed(true)} />
        </video>
      ) : null}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.68),rgba(0,0,0,0.24)_46%,rgba(0,0,0,0.42))]" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#070706] via-[#070706]/35 to-transparent" aria-hidden="true" />

      <div className="container-shell relative z-10 pb-10 pt-32 md:pb-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_360px] lg:items-end">
          <div className="motion-reveal motion-reveal--soft max-w-4xl">
            <h1 className="font-display text-5xl leading-[0.94] text-balance md:text-7xl lg:text-8xl">{dictionary.home.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/78 md:text-xl">{dictionary.home.heroSubtitle}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/tours"
                className="hero-cta inline-flex min-h-12 items-center justify-center border border-[var(--gold)] bg-[var(--gold)] px-6 text-xs font-extrabold uppercase tracking-[0.18em] text-[var(--ink)] transition hover:bg-transparent hover:text-[var(--gold)]"
              >
                {dictionary.common.exploreTours}
                <ArrowRight className="ml-3" size={17} aria-hidden="true" />
              </Link>
              <Link
                href="/custom-trip"
                className="hero-cta inline-flex min-h-12 items-center justify-center border border-white/32 px-6 text-xs font-extrabold uppercase tracking-[0.18em] text-white transition hover:border-white hover:bg-white/10"
              >
                {dictionary.common.planTrip}
              </Link>
            </div>
          </div>

          <div className="hero-route-panel motion-reveal motion-reveal--soft hidden border border-white/14 bg-[#090907]/62 p-5 backdrop-blur-md lg:block">
            <p className="fine-label text-[var(--gold)]">Route desk</p>
            <div className="mt-4 border-t border-white/12">
              {routeNotes.map((item) => (
                <div key={item.label} className="grid grid-cols-[34px_1fr] gap-3 border-b border-white/12 py-4">
                  <item.icon size={18} strokeWidth={1.7} className="mt-1 text-[var(--gold)]" aria-hidden="true" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="mt-1 text-sm leading-6 text-white/58">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-white/78 transition hover:text-white">
              Talk to a local planner
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="hero-meta-strip mt-14 hidden gap-6 border-t border-white/16 pt-6 sm:grid md:grid-cols-[auto_1fr] md:items-end">
          <a
            href="#intro"
            className="scroll-cue inline-flex items-center gap-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-white/58 hover:text-white"
          >
            {dictionary.home.scroll}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
          <div className="hidden gap-4 text-sm text-white/66 sm:grid sm:grid-cols-3 md:justify-self-end">
            <span>{dictionary.destinations.skopje}</span>
            <span>{dictionary.destinations.matka}</span>
            <span>{dictionary.destinations.mavrovo}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
