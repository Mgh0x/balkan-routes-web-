import type { Metadata } from "next";
import { ServicesPageClient } from "@/components/pages/ServicesPageClient";

export const metadata: Metadata = {
  title: "Services",
  description: "Private tours, custom itineraries, airport transfers, corporate travel, group tours, and licensed local guides.",
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
