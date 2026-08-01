import { Container } from "@/components/common/container/Container";
import FooterBottom from "./footer-bottom/footer-bottom";
import FooterCTA from "./footer-cta/footer-cta";
import FooterMain from "./footer-main/footer-main";

const Footer = () => {
  return (
    <footer className="mt-32 border-t">
      <div className="space-y-24 py-20">
        {/* <FooterCTA /> */}

        <Container>
          <FooterMain />

          <FooterBottom />
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
