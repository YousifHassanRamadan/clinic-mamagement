// components/layouts/header/btns/btns.tsx

"use client";

import { useEffect, useState, useTransition } from "react";
import { Languages, LogIn, Menu, Moon, Sun } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { locales, type Locale } from "@/i18n/config";
import { setDocumentDirection } from "@/i18n/direction";

interface Props {
  locale: Locale;
  translations: {
    signIn: string;
    language: string;
    arabic: string;
    english: string;
    appearance: string;
    dark: string;
    light: string;
  };
}

const ButtonsSection = ({ locale, translations }: Props) => {
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [currentLocale, setCurrentLocale] = useState<Locale>(locale);
  const [isPending, startTransition] = useTransition();

  const isArabic = currentLocale === "ar";

  useEffect(() => {
    const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);
    const cookieLocale = match?.[1] as Locale | undefined;

    if (cookieLocale && locales.includes(cookieLocale)) {
      setCurrentLocale(cookieLocale);
    } else {
      setCurrentLocale(locale);
    }
  }, [locale]);

  const changeLanguage = () => {
    const newLocale: Locale = currentLocale === "ar" ? "en" : "ar";

    document.cookie = [
      `locale=${newLocale}`,
      "path=/",
      "max-age=31536000",
      "samesite=lax",
    ].join("; ");

    setCurrentLocale(newLocale);
    setDocumentDirection(newLocale);

    startTransition(() => {
      router.refresh();
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          dir={isArabic ? "rtl" : "ltr"}
          className="h-10 w-10 rounded-xl border-border/60 bg-background shadow-sm transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
        >
          <Menu className="h-5 w-5" />

          <span className="sr-only">
            {isArabic ? "فتح القائمة" : "Open menu"}
          </span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={isArabic ? "start" : "end"}
        sideOffset={8}
        className="w-64 rounded-xl border-border/60 bg-background/95 p-2 shadow-lg backdrop-blur"
      >
        {/* Sign In */}
        <DropdownMenuItem
          asChild
          className="cursor-pointer rounded-lg px-3 py-2.5"
        >
          <Link
            href="/login"
            dir={isArabic ? "rtl" : "ltr"}
            className="flex w-full items-center gap-3"
          >
            <LogIn className="mr-2 h-4 w-4 shrink-0" />

            <div className="flex flex-1 items-center justify-between gap-3">
              <span
                className={`font-medium ${
                  isArabic ? "text-right" : "text-left"
                }`}
              >
                {translations.signIn}
              </span>
            </div>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Language */}
        <DropdownMenuItem
          disabled={isPending}
          onClick={changeLanguage}
          className="cursor-pointer rounded-lg px-3 py-2.5"
        >
          <Languages className="mr-2 h-4 w-4 shrink-0" />

          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="flex flex-1 items-center justify-between gap-3"
          >
            <span
              className={`font-medium ${isArabic ? "text-right" : "text-left"}`}
            >
              {translations.language}
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              {currentLocale === "ar"
                ? translations.arabic
                : translations.english}
            </span>
          </div>
        </DropdownMenuItem>

        {/* Appearance */}
        <DropdownMenuItem
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="cursor-pointer rounded-lg px-3 py-2.5"
        >
          {theme === "dark" ? (
            <Moon className="mr-2 h-4 w-4 shrink-0" />
          ) : (
            <Sun className="mr-2 h-4 w-4 shrink-0" />
          )}

          <div
            dir={isArabic ? "rtl" : "ltr"}
            className="flex flex-1 items-center justify-between gap-3"
          >
            <span
              className={`font-medium ${isArabic ? "text-right" : "text-left"}`}
            >
              {translations.appearance}
            </span>

            <span className="text-xs font-medium text-muted-foreground">
              {theme === "dark" ? translations.dark : translations.light}
            </span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ButtonsSection;
