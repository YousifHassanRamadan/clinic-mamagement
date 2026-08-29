// components/feature/layout/footer/footer.tsx

import { Container } from "@/components/common/container/Container";
import FooterBottom from "./footer-bottom/footer-bottom";
import FooterMain from "./footer-main/footer-main";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

const Footer = async () => {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <footer className="mt-32 border-t">
      <div className="space-y-24 py-20">
        <Container>
          <FooterMain
            translations={{
              brand: {
                name: t("home.footer.brand.name"),
                description: t("home.footer.brand.description"),
              },

              links: {
                title: t("home.footer.links.title"),
                home: t("home.footer.links.home"),
                patientSignIn: t("home.footer.links.patientSignIn"),
              },

              contact: {
                title: t("home.footer.contact.title"),
              },
            }}
          />

          <FooterBottom
            translations={{
              copyright: t("home.footer.bottom.copyright"),
              privacyPolicy: t("home.footer.bottom.privacyPolicy"),
              terms: t("home.footer.bottom.terms"),
              accessibility: t("home.footer.bottom.accessibility"),
            }}
          />
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
