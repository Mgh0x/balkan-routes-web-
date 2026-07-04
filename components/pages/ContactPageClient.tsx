"use client";

import Image from "next/image";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ContactForm } from "@/components/forms/ContactForm";
import { useTranslation } from "@/components/LanguageProvider";
import { images } from "@/data/images";

export function ContactPageClient() {
  const { dictionary } = useTranslation();

  const info = [
    { icon: Mail, label: dictionary.common.email, value: "hello@skopjeroutes.mk" },
    { icon: Phone, label: dictionary.common.phone, value: "+389 70 555 210" },
    { icon: MapPin, label: dictionary.common.address, value: "Macedonia Street 12, 1000 Skopje" },
    { icon: Clock, label: dictionary.common.hours, value: "Mon-Sat 09:00-18:00" },
  ];

  return (
    <>
      <PageHero title={dictionary.pages.contact.title} intro={dictionary.pages.contact.intro} image={images.destinations.skopje} />
      <section className="bg-[var(--paper)] section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.8fr_1fr]">
          <div>
            <div className="motion-list grid gap-0 border-t border-[var(--line)]">
              {info.map((item) => (
                <div key={item.label} className="motion-reveal motion-reveal--line grid grid-cols-[34px_1fr] gap-4 border-b border-[var(--line)] py-5">
                  <item.icon className="mt-1 text-[var(--gold)]" size={18} strokeWidth={1.7} aria-hidden="true" />
                  <div>
                    <p className="fine-label text-[var(--forest)]">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://wa.me/38970555210"
              className="editorial-link motion-reveal motion-reveal--soft mt-6 text-[var(--forest)]"
            >
              {dictionary.common.whatsapp}
            </a>

            <div className="motion-reveal motion-reveal--image relative mt-10 overflow-hidden border border-[var(--line)] bg-[var(--ink)] p-8 text-white">
              <Image src={images.mapTexture} alt="" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover opacity-30" />
              <div className="relative z-10">
                <h2 className="font-display text-4xl">{dictionary.pages.contact.mapTitle}</h2>
                <p className="mt-4 text-sm leading-7 text-white/72">{dictionary.pages.contact.mapText}</p>
              </div>
            </div>
          </div>
          <div className="motion-reveal motion-reveal--soft">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
