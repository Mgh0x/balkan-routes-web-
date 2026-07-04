import en from "@/translations/en";
import mk from "@/translations/mk";
import tr from "@/translations/tr";
import type { Language } from "@/types";

export const dictionaries = {
  en,
  mk,
  tr,
};

export const languages: { code: Language; short: string; label: string }[] = [
  { code: "en", short: "EN", label: "English" },
  { code: "mk", short: "MK", label: "Македонски" },
  { code: "tr", short: "TR", label: "Türkçe" },
];

export type Dictionary = typeof en;
