import { Container } from "@/components/common/container/Container";
import AboutDoctor from "@/components/feature/home/about-doctor/about-doctor";
import FAQSection from "@/components/feature/home/faq/faq-section";
import HeroSection from "@/components/feature/home/hero-section/hero-section";
import PsychologicalTests from "@/components/feature/home/psychological-tests/psychological-tests";
import Services from "@/components/feature/home/services/services";
import TestimonialsSection from "@/components/feature/home/testimonials/testimonials-section";
import WhyChooseUs from "@/components/feature/home/why-choose-us/why-choose-us";
import React from "react";

const LandingPage = () => {
  return (
    <div className="bg-gradient-to-br from-primary/15 via-background to-background min-h-screen ">
      <Container>
        {/** hero section */}
        <HeroSection />

        {/** about doctor section */}
        <AboutDoctor />

        {/**services */}
        <Services />

        {/** why choose us */}
        <WhyChooseUs />

        {/** psychological tests */}
        <PsychologicalTests />

        {/** testimonials */}
        <TestimonialsSection />

        {/** faq section */}
        <FAQSection />
      </Container>
    </div>
  );
};

export default LandingPage;
