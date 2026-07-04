import type { Metadata } from "next";
import { PolicyPageClient } from "@/components/pages/PolicyPageClient";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "Cookie policy and preference explanation for the Skopje Routes website.",
};

export default function CookiePolicyPage() {
  return <PolicyPageClient type="cookie" />;
}
