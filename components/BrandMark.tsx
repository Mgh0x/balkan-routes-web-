"use client";

import { useTranslation } from "@/components/LanguageProvider";
import { cx } from "@/lib/localize";

export function BrandMark({
  variant = "nav",
  className,
}: {
  variant?: "nav" | "footer" | "mobile";
  className?: string;
}) {
  const { dictionary } = useTranslation();

  return (
    <span className={cx("brand-mark", `brand-mark--${variant}`, className)}>
      <span className="brand-seal" aria-hidden="true">
        <svg className="brand-compass" viewBox="0 0 64 64" focusable="false">
          <circle className="brand-compass-outer" cx="32" cy="32" r="27.5" />
          <circle className="brand-compass-inner" cx="32" cy="32" r="19" />
          <path className="brand-compass-mountains" d="M13.5 42.5 24.4 30.8l8 8.7 5.2-6.2 12.9 9.2" />
          <path className="brand-compass-needle brand-compass-needle--north" d="M32 7.8 38.3 31.8 32 56.2 25.7 31.8Z" />
          <path className="brand-compass-needle brand-compass-needle--east" d="M56.2 32 32.1 38.2 7.8 32 32.1 25.8Z" />
          <circle className="brand-compass-center" cx="32" cy="32" r="5.1" />
          <path className="brand-compass-star" d="M32 23.4 34.1 29.9 40.6 32 34.1 34.1 32 40.6 29.9 34.1 23.4 32 29.9 29.9Z" />
        </svg>
      </span>
      <span className="brand-word">
        <span className="brand-name">{dictionary.brand.name}</span>
        <span className="brand-meta">Private North Macedonia Tours</span>
      </span>
    </span>
  );
}
