import { Container } from "@/components/common/container/Container";
import Experience from "@/components/feature/about/experience/Experience";
import Expertise from "@/components/feature/about/expertise/Expertise";
import AboutHero from "@/components/feature/about/hero/about-hero/AboutHero";
import Qualifications from "@/components/feature/about/qualifications/Qualifications";

const AboutPage = () => {
  return (
    <main className="bg-gradient-to-br from-primary/10 via-background to-background">
      <Container>
        <AboutHero />
        <Qualifications />
        <Experience />
        <Expertise />
      </Container>
    </main>
  );
};

export default AboutPage;
