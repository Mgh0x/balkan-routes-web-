"use client";

import { X } from "lucide-react";
import { useTranslation } from "@/components/LanguageProvider";

export type CookiePreferences = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
};

export function CookiePreferencesModal({
  preferences,
  onChange,
  onSave,
  onClose,
}: {
  preferences: CookiePreferences;
  onChange: (preferences: CookiePreferences) => void;
  onSave: () => void;
  onClose: () => void;
}) {
  const { dictionary } = useTranslation();

  const toggle = (key: "analytics" | "marketing") => {
    onChange({ ...preferences, [key]: !preferences[key] });
  };

  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/65 p-4" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
      <div className="w-full max-w-xl border border-[var(--line)] bg-[var(--paper)] p-6 shadow-[var(--shadow)]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="cookie-modal-title" className="font-display text-4xl text-[var(--ink)]">
              {dictionary.cookies.title}
            </h2>
            <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{dictionary.cookies.text}</p>
          </div>
          <button type="button" onClick={onClose} className="grid h-10 w-10 place-items-center border border-[var(--line)]" aria-label="Close">
            <X size={18} aria-hidden="true" />
          </button>
        </div>

        <div className="mt-7 border-t border-[var(--line)]">
          <PreferenceRow title={dictionary.cookies.necessary} text={dictionary.cookies.necessaryText} checked disabled />
          <PreferenceRow title={dictionary.cookies.analytics} text={dictionary.cookies.analyticsText} checked={preferences.analytics} onToggle={() => toggle("analytics")} />
          <PreferenceRow title={dictionary.cookies.marketing} text={dictionary.cookies.marketingText} checked={preferences.marketing} onToggle={() => toggle("marketing")} />
        </div>

        <button type="button" onClick={onSave} className="mt-7 min-h-12 w-full bg-[var(--forest)] px-5 text-sm font-bold uppercase tracking-[0.16em] text-white">
          {dictionary.cookies.save}
        </button>
      </div>
    </div>
  );
}

function PreferenceRow({
  title,
  text,
  checked,
  disabled = false,
  onToggle,
}: {
  title: string;
  text: string;
  checked: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}) {
  return (
    <label className="flex items-start justify-between gap-5 border-b border-[var(--line)] py-4">
      <span>
        <span className="block font-semibold text-[var(--ink)]">{title}</span>
        <span className="mt-1 block text-sm leading-6 text-[var(--muted)]">{text}</span>
      </span>
      <input type="checkbox" checked={checked} disabled={disabled} onChange={onToggle} className="mt-1 h-5 w-5 accent-[var(--forest)]" />
    </label>
  );
}
