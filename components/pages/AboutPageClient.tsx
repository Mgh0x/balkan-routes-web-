"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Leaf, Target, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { TeamCard } from "@/components/TeamCard";
import { useTranslation } from "@/components/LanguageProvider";
import { images } from "@/data/images";
import { team } from "@/data/team";

export function AboutPageClient() {
  const { dictionary } = useTranslation();
  const page = dictionary.pages.about;

  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.intro} />
      <section className="bg-[var(--paper)] section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.85fr_1fr]">
          <div className="media-frame motion-reveal motion-reveal--image relative aspect-[4/5]">
            <Image src={images.intro} alt="North Macedonia landscape" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
          </div>
          <div className="motion-list space-y-10">
            <StoryBlock icon={Users} title={page.storyTitle} text={page.story} />
            <StoryBlock icon={Target} title={page.missionTitle} text={page.mission} />
            <StoryBlock icon={Leaf} title={page.sustainabilityTitle} text={page.sustainability} />
          </div>
        </div>
      </section>

      <section className="bg-[var(--forest-deep)] section-pad text-white">
        <div className="container-shell grid gap-10 lg:grid-cols-[0.8fr_1fr]">
          <SectionTitle title={page.valuesTitle} subtitle={page.teamPreview} inverse />
          <div>
            <div className="motion-list grid gap-0 border-t border-white/14 sm:grid-cols-2">
              {page.values.map((value) => (
                <div key={value} className="motion-reveal motion-reveal--line border-b border-white/14 py-6 font-display text-2xl sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
                  {value}
                </div>
              ))}
            </div>
            <div className="motion-list mt-8 grid gap-4 sm:grid-cols-4">
              {page.stats.map((stat) => (
                <div key={stat} className="motion-reveal motion-reveal--line border-t border-white/15 pt-4 text-sm font-semibold uppercase tracking-[0.12em] text-white/70">
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--warm-white)] section-pad">
        <div className="container-shell">
          <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionTitle title={dictionary.pages.team.title} subtitle={dictionary.pages.team.intro} />
            <Link href="/team" className="editorial-link text-[var(--forest)]">
              {dictionary.nav.team}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div>
            {team.slice(0, 2).map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function StoryBlock({ icon: Icon, title, text }: { icon: typeof Users; title: string; text: string }) {
  return (
    <article className="motion-reveal motion-reveal--line grid gap-5 border-b border-[var(--line)] pb-8 sm:grid-cols-[44px_1fr]">
      <div className="mt-1 text-[var(--gold)]">
        <Icon size={19} strokeWidth={1.7} aria-hidden="true" />
      </div>
      <div>
        <h2 className="font-display text-4xl leading-tight text-[var(--ink)]">{title}</h2>
        <p className="mt-4 text-base leading-8 text-[var(--muted)]">{text}</p>
      </div>
    </article>
  );
}
