"use client";

import { useEffect, useState } from "react";
import { CookiePreferencesModal } from "@/components/CookiePreferencesModal";
import { useTranslation } from "@/components/LanguageProvider";
import type { CookiePreferences } from "@/components/CookiePreferencesModal";

const STORAGE_KEY = "balkan-routes-cookie-preferences-v1";

const defaultPreferences: CookiePreferences = {
  necessary: true,
  analytics: false,
  marketing: false,
};

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>(defaultPreferences);
  const { dictionary } = useTranslation();

  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    if (!saved) {
      window.requestAnimationFrame(() => setVisible(true));
      return;
    }

    try {
      const parsed = JSON.parse(saved) as CookiePreferences;
      window.requestAnimationFrame(() => setPreferences(parsed));
    } catch {
      window.requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  const save = (nextPreferences: CookiePreferences) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextPreferences));
    setPreferences(nextPreferences);
    setVisible(false);
    setModalOpen(false);
  };

  if (!visible && !modalOpen) {
    return null;
  }

  return (
    <>
      {visible ? (
        <aside className="fixed inset-x-0 bottom-0 z-[60] border-t border-white/12 bg-[var(--ink)] p-4 text-white shadow-[0_-20px_70px_rgba(0,0,0,0.25)]">
          <div className="container-shell flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-display text-2xl">{dictionary.cookies.title}</h2>
              <p className="mt-1 text-sm leading-6 text-white/68">{dictionary.cookies.text}</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" onClick={() => save({ necessary: true, analytics: true, marketing: true })} className="min-h-11 bg-[var(--gold)] px-5 text-sm font-bold text-[var(--ink)]">
                {dictionary.cookies.acceptAll}
              </button>
              <button type="button" onClick={() => save(defaultPreferences)} className="min-h-11 border border-white/20 px-5 text-sm font-bold text-white">
                {dictionary.cookies.reject}
              </button>
              <button type="button" onClick={() => setModalOpen(true)} className="min-h-11 border border-white/20 px-5 text-sm font-bold text-white">
                {dictionary.cookies.manage}
              </button>
            </div>
          </div>
        </aside>
      ) : null}

      {modalOpen ? <CookiePreferencesModal preferences={preferences} onChange={setPreferences} onSave={() => save(preferences)} onClose={() => setModalOpen(false)} /> : null}
    </>
  );
}
