// i18n/settings.ts

import { defaultLocale, locales, type Locale } from "./config";

export const i18nSettings = {
  defaultLocale,
  locales,
  defaultNamespace: "common",
  fallbackLocale: defaultLocale,
} as const;
