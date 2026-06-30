import type { LocalizedName, LocalizedEffect, LocalizedFlavorText } from "@/types";
import type { Locale } from "@/lib/constants";

const API_LOCALE_MAP: Record<Locale, string> = {
  en: "en",
  es: "es",
  de: "de",
};

export function getLocalizedName(
  names: LocalizedName[],
  locale: Locale,
  fallback: string,
): string {
  const lang = API_LOCALE_MAP[locale];
  return names.find((n) => n.language.name === lang)?.name ?? fallback;
}

function effectInLang(entries: LocalizedEffect[], lang: string): string | undefined {
  const entry = entries.find((e) => e.language.name === lang);
  const text = entry?.short_effect != null && entry.short_effect !== ""
    ? entry.short_effect
    : entry?.effect;
  return text != null && text !== "" ? text : undefined;
}

function flavorInLang(entries: LocalizedFlavorText[], lang: string): string | undefined {
  const entry = entries.find((e) => e.language.name === lang);
  // Moves expose `flavor_text`; items expose `text`. Both may contain control chars.
  const raw = entry?.flavor_text || entry?.text;
  return raw ? raw.replace(/[\n\f\r]+/g, " ").trim() : undefined;
}

export function getLocalizedEffect(
  entries: LocalizedEffect[],
  locale: Locale,
): string | undefined {
  return effectInLang(entries, API_LOCALE_MAP[locale]) ?? effectInLang(entries, "en");
}

export function getLocalizedFlavorText(
  entries: LocalizedFlavorText[],
  locale: Locale,
): string | undefined {
  return flavorInLang(entries, API_LOCALE_MAP[locale]) ?? flavorInLang(entries, "en");
}

// Prefer any content in the user's locale (effect or flavor) before falling back to English.
export function getLocalizedDescription(
  effectEntries: LocalizedEffect[],
  flavorEntries: LocalizedFlavorText[],
  locale: Locale,
): string | undefined {
  const lang = API_LOCALE_MAP[locale];
  return (
    effectInLang(effectEntries, lang) ??
    flavorInLang(flavorEntries, lang) ??
    effectInLang(effectEntries, "en") ??
    flavorInLang(flavorEntries, "en")
  );
}
