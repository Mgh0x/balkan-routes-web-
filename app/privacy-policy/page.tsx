import type { Metadata } from "next";
import { PolicyPageClient } from "@/components/pages/PolicyPageClient";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy for the Skopje Routes website.",
};

export default function PrivacyPolicyPage() {
  return <PolicyPageClient type="privacy" />;
}
