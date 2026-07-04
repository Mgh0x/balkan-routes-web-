"use client";

import { PageHero } from "@/components/PageHero";
import { TripRequestForm } from "@/components/forms/TripRequestForm";
import { useTranslation } from "@/components/LanguageProvider";
import { images } from "@/data/images";

export function TripRequestPageClient() {
  const { dictionary } = useTranslation();

  return (
    <>
      <PageHero title={dictionary.pages.trip.title} intro={dictionary.pages.trip.intro} image={images.tours.grand} />
      <section className="bg-[var(--warm-white)] section-pad">
        <div className="motion-reveal motion-reveal--soft container-shell max-w-5xl">
          <TripRequestForm />
        </div>
      </section>
    </>
  );
}
