"use client";

import { PageHero } from "@/components/PageHero";
import { useTranslation } from "@/components/LanguageProvider";
import { images } from "@/data/images";

export function PolicyPageClient({ type }: { type: "privacy" | "cookie" }) {
  const { dictionary } = useTranslation();
  const page = type === "privacy" ? dictionary.pages.privacy : dictionary.pages.cookiePolicy;

  return (
    <>
      <PageHero title={page.title} intro={page.intro} image={images.mapTexture} />
      <section className="section-pad bg-[var(--paper)]">
        <div className="container-shell max-w-3xl">
          <div className="motion-list border-t border-[var(--line)]">
            {page.sections.map((section) => (
              <p key={section} className="motion-reveal motion-reveal--line border-b border-[var(--line)] py-6 text-base leading-8 text-[var(--muted)]">
                {section}
              </p>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
