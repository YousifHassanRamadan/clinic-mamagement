// components/layouts/header/header.tsx

import LogoSection from "./logo/logo";
import ButtonsSection from "./btns/btns";
import { cookies } from "next/headers";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

interface HeaderTranslations {
  signIn: string;
  language: string;
  arabic: string;
  english: string;
  appearance: string;
  dark: string;
  light: string;
}

interface HeaderProps {
  translations: HeaderTranslations;
}

const Header = async ({ translations }: HeaderProps) => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  return (
    <div className="w-full bg-background">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3 px-3 py-2 sm:gap-4 sm:px-6 lg:px-8">
        <LogoSection />

        <ButtonsSection locale={locale} translations={translations} />
      </header>
    </div>
  );
};

export default Header;
