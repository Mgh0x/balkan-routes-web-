"use client";

import type { LucideIcon } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";
import { text } from "@/lib/localize";
import type { Service } from "@/types";

export function ServiceCard({ service, icon: Icon }: { service: Service; icon: LucideIcon }) {
  const { language } = useTranslation();

  return (
    <article className="service-card-motion motion-reveal motion-reveal--line group border-t border-[var(--line)] py-7">
      <div className="flex items-start gap-5">
        <span className="grid h-10 w-10 flex-none place-items-center border border-[var(--line)] text-[var(--gold)]">
          <Icon size={18} strokeWidth={1.7} aria-hidden="true" />
        </span>
        <div>
          <h3 className="font-display text-2xl leading-tight text-[var(--ink)] md:text-3xl">{text(service.title, language)}</h3>
          <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{text(service.description, language)}</p>
        </div>
      </div>
    </article>
  );
}
