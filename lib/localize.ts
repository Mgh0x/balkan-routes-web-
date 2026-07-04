import type { Language, LocalizedString, LocalizedStringArray } from "@/types";

export function text(value: LocalizedString, language: Language) {
  return value[language] ?? value.en;
}

export function list(value: LocalizedStringArray, language: Language) {
  return value[language] ?? value.en;
}

export function formatDate(date: string, language: Language) {
  return new Intl.DateTimeFormat(language === "mk" ? "mk-MK" : language === "tr" ? "tr-TR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}
