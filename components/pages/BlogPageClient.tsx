"use client";

import { BlogCard } from "@/components/BlogCard";
import { PageHero } from "@/components/PageHero";
import { useTranslation } from "@/components/LanguageProvider";
import { blogPosts } from "@/data/blog";
import { images } from "@/data/images";

export function BlogPageClient() {
  const { dictionary } = useTranslation();

  return (
    <>
      <PageHero title={dictionary.pages.blog.title} intro={dictionary.pages.blog.intro} image={images.tours.grand} />
      <section className="bg-[var(--warm-white)] section-pad">
        <div className="motion-list container-shell grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
