import type { Locale, Localized } from "@/config/types";
import { en } from "@/content/dictionaries/en";
import { es } from "@/content/dictionaries/es";

export const locales: Locale[] = ["en", "es"];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = { en: "English", es: "Español" };
/** BCP 47 tags used for <html lang>, hreflang and Intl formatting. */
export const localeTags: Record<Locale, string> = { en: "en-US", es: "es-US" };

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, es };

export function hasLocale(value: string): value is Locale {
  return (locales as string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Picks the visitor's language from a Localized value. */
export function t<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

/** Replaces {placeholders} in a dictionary string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}
