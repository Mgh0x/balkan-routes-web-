import type { Metadata } from "next";
import { ProjectTeamPageClient } from "@/components/pages/ProjectTeamPageClient";

export const metadata: Metadata = {
  title: "Website Credits",
  description: "Website credits for Skopje Routes.",
};

export default function ProjectTeamPage() {
  return <ProjectTeamPageClient />;
}
