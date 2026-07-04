"use client";

import { languages } from "@/translations";
import { cx } from "@/lib/localize";
import { useTranslation } from "@/components/LanguageProvider";

export function LanguageSwitcher() {
  const { language, setLanguage } = useTranslation();

  return (
    <div className="flex items-center gap-1" aria-label="Language selector">
      {languages.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLanguage(item.code)}
          aria-pressed={language === item.code}
          className={cx(
            "h-9 min-w-10 border px-2 text-xs font-semibold tracking-[0.12em] transition",
            language === item.code ? "border-[var(--gold)] bg-[var(--gold)] text-[var(--ink)]" : "border-white/20 text-white/82 hover:border-white/50 hover:text-white",
          )}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
}
