import type { Metadata } from "next";
import { TripRequestPageClient } from "@/components/pages/TripRequestPageClient";

export const metadata: Metadata = {
  title: "Custom Trip Request",
  description: "Request a custom private itinerary across North Macedonia with Skopje Routes.",
};

export default function CustomTripPage() {
  return <TripRequestPageClient />;
}
