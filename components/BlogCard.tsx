"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";
import { formatDate, text } from "@/lib/localize";
import type { BlogPost } from "@/types";

export function BlogCard({ post }: { post: BlogPost }) {
  const { dictionary, language } = useTranslation();

  return (
    <article className="blog-card-motion motion-reveal motion-reveal--line group border-t border-[var(--line)] pt-5">
      <div className="media-frame relative aspect-[16/10]">
        <Image
          src={post.coverImage}
          alt={text(post.title, language)}
          fill
          sizes="(min-width: 1024px) 33vw, 100vw"
          className="object-cover transition duration-700 group-hover:scale-[1.035]"
        />
      </div>
      <div className="pt-5">
        <div className="fine-label text-[var(--stone-dark)]">
          {text(post.category, language)} / {formatDate(post.date, language)}
        </div>
        <h3 className="blog-card-title mt-3 font-display text-2xl leading-tight text-[var(--ink)] transition-colors md:text-3xl">
          {text(post.title, language)}
        </h3>
        <p className="mt-3 text-sm leading-7 text-[var(--muted)]">{text(post.excerpt, language)}</p>
        <Link
          href={`/blog/${post.slug}`}
          className="mt-5 inline-flex items-center gap-2 border-b border-[var(--forest)] pb-1 text-[0.72rem] font-extrabold uppercase tracking-[0.16em] text-[var(--forest)] transition hover:gap-3"
        >
          {dictionary.common.readArticle}
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
