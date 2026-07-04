import type { Metadata } from "next";
import { ContactPageClient } from "@/components/pages/ContactPageClient";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Skopje Routes for private tours, transfers, custom itineraries, and local experiences in North Macedonia.",
};

export default function ContactPage() {
  return <ContactPageClient />;
}
