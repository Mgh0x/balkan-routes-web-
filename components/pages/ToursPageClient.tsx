"use client";

import { PageHero } from "@/components/PageHero";
import { TourGrid } from "@/components/TourGrid";
import { useTranslation } from "@/components/LanguageProvider";
import { images } from "@/data/images";
import { tours } from "@/data/tours";

export function ToursPageClient() {
  const { dictionary } = useTranslation();

  return (
    <>
      <PageHero title={dictionary.pages.tours.title} intro={dictionary.pages.tours.intro} image={images.destinations.matka} />
      <section className="bg-[var(--warm-white)] section-pad">
        <div className="container-shell">
          <TourGrid tours={tours} />
        </div>
      </section>
    </>
  );
}
