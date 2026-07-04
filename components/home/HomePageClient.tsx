"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Car,
  Compass,
  Globe2,
  Languages,
  Map,
  MapPinned,
  MessageCircle,
  Plane,
  Route,
  ShieldCheck,
  Users,
} from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { HeroVideo } from "@/components/HeroVideo";
import { SectionTitle } from "@/components/SectionTitle";
import { ServiceCard } from "@/components/ServiceCard";
import { TourGrid } from "@/components/TourGrid";
import { useTranslation } from "@/components/LanguageProvider";
import { blogPosts } from "@/data/blog";
import { images } from "@/data/images";
import { services } from "@/data/services";
import { testimonials } from "@/data/testimonials";
import { featuredTours } from "@/data/tours";
import { text } from "@/lib/localize";

const serviceIcons = [Compass, Map, Plane, Building2, Users, Globe2];

const routeDesk = [
  { label: "Private car", value: "Door to door routes", icon: Car },
  { label: "Local guide", value: "Licensed city and nature hosts", icon: ShieldCheck },
  { label: "Languages", value: "English, Turkish, Macedonian and more", icon: Languages },
];

const planningSteps = [
  {
    title: "Tell us the shape of your trip",
    text: "Dates, pace, interests, group size, comfort level, and the places you already have in mind.",
  },
  {
    title: "We build a local route file",
    text: "Driving times, seasonal access, guide availability, food stops, tickets, and realistic buffers are checked before we propose the route.",
  },
  {
    title: "Your day stays flexible",
    text: "The plan is structured, but the guide can slow down, change focus, or add local stops when the day asks for it.",
  },
];

const conciergeNotes = [
  { title: "Private, not pooled", text: "Your vehicle, guide, stops, and timing are arranged for your group only.", icon: Users },
  { title: "Built from Skopje", text: "A local contact handles pickups, delays, route changes, and last-minute questions.", icon: MessageCircle },
  { title: "Made for real travel days", text: "We balance headline sights with road rhythm, meals, weather, and quiet time.", icon: Route },
];

export function HomePageClient({ hasHeroVideo }: { hasHeroVideo: boolean }) {
  const { dictionary, language } = useTranslation();

  const destinations = [
    { title: dictionary.destinations.skopje, image: images.destinations.skopje, video: "/videos/skopje-loop.mp4" },
    { title: dictionary.destinations.matka, image: images.destinations.matka, video: "/videos/matka-loop.mp4" },
    { title: dictionary.destinations.mavrovo, image: images.destinations.mavrovo, video: "/videos/mavrovo-loop.mp4" },
    { title: dictionary.destinations.lakeRoutes, image: images.tours.tikves, video: "/videos/tikvesh-loop.mp4" },
  ];

  return (
    <>
      <HeroVideo hasVideo={hasHeroVideo} />

      <section id="intro" className="bg-[var(--paper)] section-pad">
        <div className="container-shell grid items-start gap-14 lg:grid-cols-[0.86fr_1.14fr]">
          <div className="motion-reveal motion-reveal--soft lg:sticky lg:top-28">
            <p className="fine-label text-[var(--stone-dark)]">{dictionary.home.introMeta}</p>
            <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1.03] text-balance text-[var(--ink)] md:text-6xl">
              A private travel desk for the country behind the postcards.
            </h2>
            <p className="mt-7 max-w-xl text-base leading-8 text-[var(--muted)]">
              We pair cinematic landscapes with practical planning: route timing, trusted drivers, guide availability, seasonal stops, and a real local contact in Skopje.
            </p>
            <Link href="/about" className="editorial-link mt-8 text-[var(--forest)]">
              {dictionary.nav.about}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>

          <div className="grid gap-5">
            <div className="media-frame motion-reveal motion-reveal--image relative aspect-[16/11]">
              <Image src={images.intro} alt="Kozjak Lake in North Macedonia" fill sizes="(min-width: 1024px) 56vw, 100vw" className="object-cover" />
            </div>
            <div className="motion-list grid gap-0 border-y border-[var(--line)] md:grid-cols-3">
              {routeDesk.map((item) => (
                <div key={item.label} className="motion-reveal motion-reveal--line border-b border-[var(--line)] py-5 md:border-b-0 md:border-r md:px-5 md:last:border-r-0">
                  <item.icon size={18} className="text-[var(--gold)]" strokeWidth={1.7} aria-hidden="true" />
                  <p className="mt-4 fine-label text-[var(--forest)]">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--warm-white)] section-pad section-rule">
        <div className="container-shell">
          <div className="mb-12 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <div className="motion-reveal motion-reveal--soft max-w-3xl">
              <h2 className="font-display text-4xl leading-[1.02] text-balance text-[var(--ink)] md:text-6xl">Signature private tours</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
                Our core routes are designed as private days first: clean logistics, strong local context, and room to adjust the rhythm.
              </p>
            </div>
            <Link href="/tours" className="editorial-link motion-reveal motion-reveal--soft text-[var(--forest)]">
              {dictionary.common.allTours}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <TourGrid tours={featuredTours.slice(0, 4)} />
        </div>
      </section>

      <section className="planning-section section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="motion-reveal motion-reveal--image grid gap-5">
            <div className="media-frame relative aspect-[4/5]">
              <Image src={images.tours.grand} alt="Private route through North Macedonia" fill sizes="(min-width: 1024px) 42vw, 100vw" className="object-cover" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="border-t border-[var(--line)] pt-4">
                <MapPinned size={18} className="text-[var(--gold)]" aria-hidden="true" />
                <p className="mt-3 fine-label text-[var(--forest)]">Route file</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Stops, timings, alternates, meal windows, and pickup details.</p>
              </div>
              <div className="border-t border-[var(--line)] pt-4">
                <CalendarDays size={18} className="text-[var(--gold)]" aria-hidden="true" />
                <p className="mt-3 fine-label text-[var(--forest)]">Season aware</p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">Weather, access, holidays, and local opening times are checked.</p>
              </div>
            </div>
          </div>

          <div>
            <div className="motion-reveal motion-reveal--soft max-w-3xl">
              <h2 className="font-display text-4xl leading-[1.02] text-balance text-[var(--ink)] md:text-6xl">How we shape the route</h2>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--muted)]">
                This is the difference between a pretty itinerary and a day that actually works on the ground.
              </p>
            </div>
            <div className="motion-list mt-10 border-t border-[var(--line)]">
              {planningSteps.map((step, index) => (
                <article key={step.title} className="motion-reveal motion-reveal--line grid gap-5 border-b border-[var(--line)] py-7 sm:grid-cols-[74px_1fr]">
                  <span className="font-display text-4xl text-[var(--gold)]">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-3xl leading-tight text-[var(--ink)]">{step.title}</h3>
                    <p className="mt-3 max-w-xl text-sm leading-7 text-[var(--muted)]">{step.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[var(--forest-deep)] section-pad text-white">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.78fr_1fr]">
          <div className="motion-reveal motion-reveal--soft max-w-3xl">
            <h2 className="font-display text-4xl leading-[1.02] text-balance md:text-6xl">{dictionary.home.whyTitle}</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/66">{dictionary.home.whySubtitle}</p>
          </div>
          <div className="motion-list grid gap-0 border-t border-white/14">
            {conciergeNotes.map((item) => (
              <article key={item.title} className="motion-reveal motion-reveal--line grid gap-5 border-b border-white/14 py-7 sm:grid-cols-[52px_1fr]">
                <item.icon size={22} className="mt-1 text-[var(--gold)]" strokeWidth={1.7} aria-hidden="true" />
                <div>
                  <h3 className="font-display text-3xl leading-tight">{item.title}</h3>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-white/58">{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#080807] section-pad text-white">
        <div className="container-shell">
          <div className="motion-reveal motion-reveal--soft max-w-3xl">
            <h2 className="font-display text-4xl leading-[1.02] text-balance md:text-6xl">Places we know by heart</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/66">
              We keep the visual drama, but plan around real distances, quiet windows, and local access.
            </p>
          </div>
          <div className="motion-list mt-12 grid gap-4 md:grid-cols-4">
            {destinations.map((destination) => (
              <article key={destination.title} className="destination-card motion-reveal motion-reveal--image group relative min-h-[420px] overflow-hidden border border-white/10 bg-black">
                <Image src={destination.image} alt={destination.title} fill sizes="(min-width: 1024px) 25vw, 100vw" className="object-cover transition duration-700 group-hover:scale-[1.035]" />
                {destination.video ? (
                  <video
                    className="ambient-video absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.035]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    poster={destination.image}
                    aria-hidden="true"
                  >
                    <source src={destination.video} type="video/mp4" />
                  </video>
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/84 via-black/12 to-transparent" aria-hidden="true" />
                <div className="destination-card-title absolute bottom-6 left-6 right-6">
                  <h3 className="font-display text-3xl leading-tight">{destination.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-white/62">Private timing, local stops, and flexible pace.</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] section-pad">
        <div className="container-shell grid gap-12 lg:grid-cols-[0.78fr_1fr]">
          <SectionTitle title={dictionary.home.servicesTitle} subtitle={dictionary.home.servicesSubtitle} />
          <div className="motion-list grid gap-x-10 md:grid-cols-2">
            {services.map((service, index) => (
              <ServiceCard key={service.title.en} service={service} icon={serviceIcons[index]} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--warm-white)] section-pad section-rule">
        <div className="container-shell">
          <SectionTitle title={dictionary.home.testimonialsTitle} subtitle={dictionary.home.testimonialsSubtitle} />
          <div className="motion-list mt-10 grid gap-0 border-t border-[var(--line)] md:grid-cols-2">
            {testimonials.slice(0, 4).map((testimonial) => (
              <article key={testimonial.name} className="testimonial-card-motion motion-reveal motion-reveal--line border-b border-[var(--line)] py-7 md:odd:border-r md:odd:pr-8 md:even:pl-8">
                <p className="font-display text-2xl leading-snug text-[var(--ink)]">&quot;{text(testimonial.quote, language)}&quot;</p>
                <p className="mt-5 fine-label text-[var(--stone-dark)]">
                  {testimonial.name} / {text(testimonial.origin, language)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[var(--paper)] section-pad section-rule">
        <div className="container-shell">
          <div className="mb-10 grid gap-8 md:grid-cols-[1fr_auto] md:items-end">
            <SectionTitle title={dictionary.home.blogTitle} subtitle={dictionary.home.blogSubtitle} />
            <Link href="/blog" className="editorial-link motion-reveal motion-reveal--soft text-[var(--forest)]">
              {dictionary.nav.blog}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="motion-list grid gap-8 md:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--ink)] py-20 text-white md:py-28">
        <Image src={images.mapTexture} alt="" fill sizes="100vw" className="object-cover opacity-24" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,0.94),rgba(7,7,6,0.72)_54%,rgba(7,7,6,0.88))]" aria-hidden="true" />
        <div className="cta-band motion-reveal motion-reveal--soft container-shell relative z-10 grid gap-10 border-y border-white/14 py-12 lg:grid-cols-[1fr_420px] lg:items-center">
          <div>
            <h2 className="font-display text-4xl leading-tight text-balance md:text-6xl">Tell us the trip you have in mind.</h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/68">
              Send a few dates, interests, and travel style. We will reply with the best route shape, realistic timing, and next steps.
            </p>
            <Link href="/custom-trip" className="editorial-link mt-8 text-white hover:border-[var(--gold)] hover:bg-[var(--gold)] hover:text-[var(--ink)]">
              {dictionary.common.createMyTrip}
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="border border-white/14 bg-white/[0.04] p-6">
            <p className="fine-label text-[var(--gold)]">Route desk</p>
            <div className="mt-5 space-y-4 text-sm leading-7 text-white/68">
              <p className="border-t border-white/12 pt-4">1. Share travel dates and group size.</p>
              <p className="border-t border-white/12 pt-4">2. We check route timing, guide availability, and local stops.</p>
              <p className="border-t border-white/12 pt-4">3. You receive a clear private-trip proposal.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
