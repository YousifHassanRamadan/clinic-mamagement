"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { locales, type Locale } from "@/i18n/config";
import { setDocumentDirection } from "@/i18n/direction";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();

  const [selectedLocale, setSelectedLocale] = useState<Locale>(currentLocale);

  const [isPending, startTransition] = useTransition();

  const changeLanguage = (locale: Locale) => {
    if (locale === selectedLocale) return;

    document.cookie = [
      `locale=${locale}`,
      "path=/",
      "max-age=31536000",
      "samesite=lax",
    ].join("; ");

    setSelectedLocale(locale);
    setDocumentDirection(locale);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <select
      value={selectedLocale}
      disabled={isPending}
      onChange={(event) => changeLanguage(event.target.value as Locale)}
      className="
        cursor-pointer appearance-none
        rounded-lg border border-border
        bg-background
        px-4 py-2.5 pe-9
        text-sm font-medium
        text-foreground
        shadow-sm
        outline-none
        transition-all
        hover:bg-muted/50
        focus:border-primary
        focus:ring-2 focus:ring-primary/20
        disabled:cursor-not-allowed
        disabled:opacity-50
      "
    >
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale === "ar" ? "العربية" : "English"}
        </option>
      ))}
    </select>
  );
}
