"use client";

import { PageHero } from "@/components/PageHero";
import { TeamCard } from "@/components/TeamCard";
import { useTranslation } from "@/components/LanguageProvider";
import { images } from "@/data/images";
import { team } from "@/data/team";

export function TeamPageClient() {
  const { dictionary } = useTranslation();

  return (
    <>
      <PageHero title={dictionary.pages.team.title} intro={dictionary.pages.team.intro} image={images.destinations.mavrovo} />
      <section className="bg-[var(--warm-white)] section-pad">
        <div className="motion-list container-shell">
          {team.map((member) => (
            <TeamCard key={member.name} member={member} />
          ))}
        </div>
      </section>
    </>
  );
}
