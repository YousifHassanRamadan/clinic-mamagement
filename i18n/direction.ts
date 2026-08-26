// i18n/direction.ts

import type { Locale } from "./config";
import { getDirection } from "./config";

export function setDocumentDirection(locale: Locale) {
  if (typeof document === "undefined") return;

  const direction = getDirection(locale);
  const isRTL = direction === "rtl";

  document.documentElement.dir = direction;
  document.documentElement.lang = locale;
  document.body.classList.toggle("rtl", isRTL);
}
