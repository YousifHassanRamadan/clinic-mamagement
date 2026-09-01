// i18n/config.ts

export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const localeConfig: Record<
  Locale,
  {
    direction: "ltr" | "rtl";
    name: string;
  }
> = {
  en: {
    direction: "ltr",
    name: "English",
  },

  ar: {
    direction: "rtl",
    name: "العربية",
  },
};

export const rtlLanguages: Locale[] = ["ar"];

export function getDirection(locale: Locale): "ltr" | "rtl" {
  return rtlLanguages.includes(locale) ? "rtl" : "ltr";
}

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}
