import "server-only";
import { cache } from "react";
import { GENERATION_PREFIX, LOCALES, DEFAULT_LOCALE } from "@/lib/constants";
import type { Locale } from "@/lib/constants";

export type { Locale };
export const locales = LOCALES;
export const defaultLocale = DEFAULT_LOCALE;

type Messages = typeof import("@/messages/en.json");
type Params = Record<string, string | number>;

const dictionaries: Record<Locale, () => Promise<Messages>> = {
  en: () => import("@/messages/en.json").then((m) => m.default),
  es: () => import("@/messages/es.json").then((m) => m.default),
  de: () => import("@/messages/de.json").then((m) => m.default),
};

export const getDictionary = cache(async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]();
});

export function t(dict: Messages, key: string, params?: Params): string {
  const value = key.split(".").reduce<unknown>((acc, k) => {
    if (acc && typeof acc === "object" && k in acc) {
      return (acc as Record<string, unknown>)[k];
    }
    return undefined;
  }, dict as unknown as Record<string, unknown>);

  let message = typeof value === "string" ? value : key;

  if (params) {
    for (const [name, val] of Object.entries(params)) {
      message = message.replaceAll(`{${name}}`, String(val));
    }
  }
  return message;
}

export function formatGenerationLabel(dict: Messages, name: string): string {
  const suffix = name.replace(GENERATION_PREFIX, "").toUpperCase();
  return t(dict, "generationFilter.generation", { suffix });
}
