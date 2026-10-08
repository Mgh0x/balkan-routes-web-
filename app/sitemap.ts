import type { MetadataRoute } from "next";
import { tours } from "@/data/tours";
import { blogPosts } from "@/data/blog";

const siteUrl = "https://balkan-routes.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/tours",
    "/services",
    "/team",
    "/blog",
    "/contact",
    "/custom-trip",
    "/project-team",
    "/privacy-policy",
    "/cookie-policy",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const tourRoutes = tours.map((tour) => ({
    url: `${siteUrl}/tours/${tour.slug}`,
    lastModified: new Date(),
  }));

  const blogRoutes = blogPosts.map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...tourRoutes, ...blogRoutes];
}
