import { Container } from "@/components/common/container/Container";
import ClinicInfo from "@/components/feature/contact/clinic-info/clinic-info";
import ContactCard from "@/components/feature/contact/form/contact-card/contact-card";
import ContactHero from "@/components/feature/contact/hero/contact-hero";
import ClinicMap from "@/components/feature/contact/map/clinic-map";
import SocialLinks from "@/components/feature/contact/social/social-links/social-links";

const ContactPage = () => {
  return (
    <main>
      <ContactHero />
      <Container>
        <section className="py-24">
          <div className="container mx-auto grid gap-8 px-6 lg:grid-cols-2">
            {/* Left */}

            <ContactCard />

            {/* Right */}

            <div className="space-y-8">
              <ClinicInfo />

              <ClinicMap />

              <SocialLinks />
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default ContactPage;
