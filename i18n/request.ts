import i18next from "i18next";
import Backend from "i18next-resources-to-backend";

import { defaultLocale, isLocale, type Locale } from "./config";

export async function getTranslations(locale: string) {
  const currentLocale: Locale = isLocale(locale) ? locale : defaultLocale;

  const instance = i18next.createInstance();

  await instance
    .use(
      Backend(
        (language: string, namespace: string) =>
          import(`@/locales/${language}/${namespace}.json`),
      ),
    )
    .init({
      lng: currentLocale,
      fallbackLng: defaultLocale,

      ns: ["common"],
      defaultNS: "common",

      interpolation: {
        escapeValue: false,
      },
    });

  return instance.t.bind(instance);
}
