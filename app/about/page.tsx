import type { Metadata } from "next";
import { AboutPageClient } from "@/components/pages/AboutPageClient";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Skopje Routes, a Skopje-based tourism agency designing private journeys across North Macedonia.",
};

export default function AboutPage() {
  return <AboutPageClient />;
}
