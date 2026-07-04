import type { Metadata } from "next";
import { TeamPageClient } from "@/components/pages/TeamPageClient";

export const metadata: Metadata = {
  title: "Our Team",
  description: "Meet the Skopje Routes team: travel designers, operations coordinators, local guides, and guest experience support.",
};

export default function TeamPage() {
  return <TeamPageClient />;
}
