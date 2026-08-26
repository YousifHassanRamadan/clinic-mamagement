// app/(auth)/login/page.tsx

import AuthLayout from "@/components/feature/auth/AuthLayout";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

export default async function AuthPage() {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <AuthLayout
      translations={{
        brand: t("auth.brand"),

        testimonial: {
          quote: t("auth.testimonial.quote"),
          author: t("auth.testimonial.author"),
          subtitle: t("auth.testimonial.subtitle"),
        },

        stats: {
          experience: {
            value: t("auth.stats.experience.value"),
            label: t("auth.stats.experience.label"),
          },
          clients: {
            value: t("auth.stats.clients.value"),
            label: t("auth.stats.clients.label"),
          },
          rating: {
            value: t("auth.stats.rating.value"),
            label: t("auth.stats.rating.label"),
          },
        },

        card: {
          login: {
            title: t("auth.card.login.title"),
            description: t("auth.card.login.description"),
            email: t("auth.card.login.email"),
            password: t("auth.card.login.password"),
            forgotPassword: t("auth.card.login.forgotPassword"),
            login: t("auth.card.login.login"),
            loggingIn: t("auth.card.login.loggingIn"),
            or: t("auth.card.login.or"),
            noAccount: t("auth.card.login.noAccount"),
            signUp: t("auth.card.login.signUp"),
            invalidCredentials: t("auth.card.login.invalidCredentials"),
            success: t("auth.card.login.success"),
            error: t("auth.card.login.error"),
          },

          register: {
            title: t("auth.card.register.title"),
            firstName: t("auth.card.register.firstName"),
            lastName: t("auth.card.register.lastName"),
            address: t("auth.card.register.address"),
            email: t("auth.card.register.email"),
            gender: t("auth.card.register.gender"),
            male: t("auth.card.register.male"),
            female: t("auth.card.register.female"),
            phone: t("auth.card.register.phone"),
            password: t("auth.card.register.password"),
            confirmPassword: t("auth.card.register.confirmPassword"),
            createAccount: t("auth.card.register.createAccount"),
            creatingAccount: t("auth.card.register.creatingAccount"),
            or: t("auth.card.register.or"),
            alreadyAccount: t("auth.card.register.alreadyAccount"),
            login: t("auth.card.register.login"),
            success: t("auth.card.register.success"),
            error: t("auth.card.register.error"),
            automaticLoginFailed: t("auth.card.register.automaticLoginFailed"),
          },

          tabs: {
            login: t("auth.card.tabs.login"),
            register: t("auth.card.tabs.register"),
          },
        },
      }}
    />
  );
}
