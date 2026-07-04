"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { SectionTitle } from "@/components/SectionTitle";
import { useTranslation } from "@/components/LanguageProvider";
import { formatDate, list, text } from "@/lib/localize";
import type { BlogPost } from "@/types";

export function BlogDetailClient({ post, relatedPosts }: { post: BlogPost; relatedPosts: BlogPost[] }) {
  const { dictionary, language } = useTranslation();

  return (
    <>
      <section className="relative min-h-[58vh] overflow-hidden bg-[var(--ink)] pt-28 text-white">
        <Image src={post.coverImage} alt={text(post.title, language)} fill priority sizes="100vw" className="hero-poster-motion object-cover opacity-70" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,7,6,0.86),rgba(7,7,6,0.42)),linear-gradient(0deg,rgba(7,7,6,0.8),transparent_55%)]" aria-hidden="true" />
        <div className="container-shell relative z-10 flex min-h-[48vh] items-end pb-12">
          <div className="motion-reveal motion-reveal--soft max-w-4xl">
            <Link href="/blog" className="editorial-link mb-8 border-white/35 text-white/72 hover:text-white">
              <ArrowLeft size={16} aria-hidden="true" />
              {dictionary.common.backToBlog}
            </Link>
            <p className="fine-label text-[var(--gold)]">
              {text(post.category, language)} / {formatDate(post.date, language)} / {text(post.readingTime, language)}
            </p>
            <h1 className="mt-5 font-display text-5xl leading-[0.98] text-balance md:text-7xl">{text(post.title, language)}</h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-white/72 md:text-lg">{text(post.excerpt, language)}</p>
          </div>
        </div>
      </section>

      <article className="section-pad bg-[var(--paper)]">
        <div className="container-shell max-w-3xl">
          <p className="motion-reveal motion-reveal--line fine-label border-b border-[var(--line)] pb-5 text-[var(--stone-dark)]">
            {dictionary.pages.blog.published}: {formatDate(post.date, language)} / {post.author}
          </p>
          <div className="motion-list mt-8 space-y-7">
            {list(post.content, language).map((paragraph) => (
              <p key={paragraph} className="motion-reveal motion-reveal--line text-xl leading-10 text-[var(--muted)]">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </article>

      <section className="section-pad section-rule bg-[var(--warm-white)]">
        <div className="container-shell">
          <SectionTitle title={dictionary.common.relatedArticles} />
          <div className="motion-list mt-10 grid gap-6 md:grid-cols-3">
            {relatedPosts.map((related) => (
              <BlogCard key={related.slug} post={related} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
