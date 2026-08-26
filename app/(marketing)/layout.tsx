// app/.../layout.tsx

import Footer from "@/components/layouts/footer/footer";
import Header from "@/components/layouts/header/header";
import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";
import { cookies } from "next/headers";
import type { ReactNode } from "react";

export default async function MarketingLayout({
  children,
}: {
  children: ReactNode;
}) {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  const headerTranslations = {
    signIn: t("header.signIn"),
    language: t("header.language"),
    arabic: t("header.arabic"),
    english: t("header.english"),
    appearance: t("header.appearance"),
    dark: t("header.dark"),
    light: t("header.light"),
  };

  return (
    <>
      <Header translations={headerTranslations} />

      <main>{children}</main>

      <Footer />
    </>
  );
}
