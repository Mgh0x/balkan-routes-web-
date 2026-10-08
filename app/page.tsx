import { existsSync } from "fs";
import { join } from "path";
import { HomePageClient } from "@/components/home/HomePageClient";

export default function Home() {
  const hasHeroVideo = existsSync(join(process.cwd(), "public", "videos", "north-macedonia-hero.mp4"));
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Skopje Routes",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Macedonia Street 12",
      addressLocality: "Skopje",
      addressCountry: "North Macedonia",
    },
    email: "hello@skopjeroutes.mk",
    telephone: "+389 70 555 210",
    areaServed: "North Macedonia",
    url: "https://balkan-routes.vercel.app",
  };

  return (
    <>
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <HomePageClient hasHeroVideo={hasHeroVideo} />
    </>
  );
}
