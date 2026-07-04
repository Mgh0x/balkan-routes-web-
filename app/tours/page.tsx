import type { Metadata } from "next";
import { ToursPageClient } from "@/components/pages/ToursPageClient";

export const metadata: Metadata = {
  title: "Tours",
  description: "Explore private tours and day trips across Skopje, Matka Canyon, Ohrid, Mavrovo, Tikves, and North Macedonia.",
};

export default function ToursPage() {
  return <ToursPageClient />;
}
