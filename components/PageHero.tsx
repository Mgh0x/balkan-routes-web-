"use client";

import Image from "next/image";
import { images } from "@/data/images";

export function PageHero({
  title,
  intro,
  image = images.intro,
}: {
  title: string;
  intro: string;
  image?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-[var(--ink)] pt-24 text-white">
      <Image src={image} alt="" fill priority sizes="100vw" className="hero-poster-motion object-cover opacity-42" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78),rgba(0,0,0,0.42)_58%,rgba(0,0,0,0.62))]" aria-hidden="true" />
      <div className="container-shell relative z-10 flex min-h-[38vh] items-end pb-10">
        <div className="motion-reveal motion-reveal--soft grid w-full gap-8 border-b border-white/14 pb-8 md:grid-cols-[0.9fr_1fr] md:items-end">
          <h1 className="font-display text-5xl leading-[0.98] text-balance md:text-7xl">{title}</h1>
          <p className="max-w-2xl text-base leading-8 text-white/72 md:justify-self-end">{intro}</p>
        </div>
      </div>
    </section>
  );
}
