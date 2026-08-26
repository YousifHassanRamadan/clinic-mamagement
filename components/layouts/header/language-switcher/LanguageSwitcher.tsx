// components/LanguageSwitcher.tsx

"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { type Locale } from "@/i18n/config";
import { setDocumentDirection } from "@/i18n/direction";
import { Button } from "@/components/ui/button";

interface LanguageSwitcherProps {
  currentLocale: Locale;
}

export default function LanguageSwitcher({
  currentLocale,
}: LanguageSwitcherProps) {
  const router = useRouter();
  const [selectedLocale, setSelectedLocale] = useState<Locale>(currentLocale);
  const [isPending, startTransition] = useTransition();

  const changeLanguage = () => {
    const locale: Locale = selectedLocale === "ar" ? "en" : "ar";

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
    <Button
      type="button"
      variant="outline"
      size="sm"
      disabled={isPending}
      onClick={changeLanguage}
      className="h-9 min-w-20 rounded-lg border-border/60 px-3 font-medium transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
    >
      {selectedLocale === "ar" ? "English" : "العربية"}
    </Button>
  );
}
