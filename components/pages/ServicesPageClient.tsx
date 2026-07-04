"use client";

import { Building2, Compass, Globe2, Map, Plane, Users } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { useTranslation } from "@/components/LanguageProvider";
import { images } from "@/data/images";
import { services } from "@/data/services";

const icons = [Compass, Map, Plane, Building2, Users, Globe2];

export function ServicesPageClient() {
  const { dictionary } = useTranslation();

  return (
    <>
      <PageHero title={dictionary.pages.services.title} intro={dictionary.pages.services.intro} image={images.tours.tikves} />
      <section className="bg-[var(--paper)] section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.78fr_1fr]">
          <SectionTitle title={dictionary.home.servicesTitle} subtitle={dictionary.home.servicesSubtitle} />
          <div className="motion-list grid gap-x-10 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.title.en} service={service} icon={icons[index]} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
