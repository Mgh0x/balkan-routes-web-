"use client";

import Image from "next/image";
import { useTranslation } from "@/components/LanguageProvider";
import { text } from "@/lib/localize";
import type { TeamMember } from "@/types";

export function TeamCard({ member }: { member: TeamMember }) {
  const { dictionary, language } = useTranslation();

  return (
    <article className="motion-reveal motion-reveal--line grid gap-5 border-t border-[var(--line)] py-7 md:grid-cols-[220px_1fr] md:items-center">
      <div className="media-frame relative aspect-[16/10] md:aspect-[4/3]">
        <Image src={member.image} alt="" fill sizes="(min-width: 1024px) 220px, 100vw" className="object-cover" />
      </div>
      <div className="grid gap-5 md:grid-cols-[0.75fr_1fr] md:items-start">
        <div>
          <h3 className="font-display text-3xl leading-tight text-[var(--ink)]">{member.name}</h3>
          <p className="mt-2 fine-label text-[var(--stone-dark)]">{text(member.role, language)}</p>
        </div>
        <div>
          <p className="text-sm leading-7 text-[var(--muted)]">{text(member.bio, language)}</p>
          <p className="mt-4 fine-label text-[var(--forest)]">{dictionary.pages.team.languages}</p>
          <p className="mt-2 text-sm text-[var(--muted)]">{member.languages.join(", ")}</p>
        </div>
      </div>
    </article>
  );
}
