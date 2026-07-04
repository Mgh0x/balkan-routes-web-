import type { Metadata } from "next";
import { BlogPageClient } from "@/components/pages/BlogPageClient";

export const metadata: Metadata = {
  title: "Blog",
  description: "Travel articles, local guides, and planning notes for visiting North Macedonia with Skopje Routes.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
