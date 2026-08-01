import FooterBrand from "../footer-brand/footer-brand";
import FooterContact from "../footer-contact/footer-contact";
import FooterLinks from "../footer-links/footer-links";

const FooterMain = () => {
  return (
    <div className="grid gap-16 lg:grid-cols-[1.4fr_0.8fr_1fr]">
      <FooterBrand />

      <FooterLinks />

      <FooterContact />
    </div>
  );
};

export default FooterMain;
