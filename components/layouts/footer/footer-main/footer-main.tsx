// components/feature/layout/footer/footer-main/footer-main.tsx

import FooterBrand from "../footer-brand/footer-brand";
import FooterContact from "../footer-contact/footer-contact";
import FooterLinks from "../footer-links/footer-links";

interface Props {
  translations: {
    brand: {
      name: string;
      description: string;
    };
    links: {
      title: string;
      home: string;
      patientSignIn: string;
      createAccount: string;
    };
    contact: {
      title: string;
    };
  };
}

const FooterMain = ({ translations }: Props) => {
  return (
    <div className="grid gap-16 lg:grid-cols-[1.4fr_0.8fr_1fr]">
      <FooterBrand translations={translations.brand} />

      <FooterLinks translations={translations.links} />

      <FooterContact title={translations.contact.title} />
    </div>
  );
};

export default FooterMain;
