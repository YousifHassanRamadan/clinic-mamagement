// app/(landing)/page.tsx

import { Container } from "@/components/common/container/Container";
import AboutDoctor from "@/components/feature/home/about-doctor/about-doctor";
import FAQSection from "@/components/feature/home/faq/faq-section";
import HeroSection from "@/components/feature/home/hero-section/hero-section";
import PsychologicalTests from "@/components/feature/home/psychological-tests/psychological-tests";
import Services from "@/components/feature/home/services/services";
import TestimonialsSection from "@/components/feature/home/testimonials/testimonials-section";
import WhyChooseUs from "@/components/feature/home/why-choose-us/why-choose-us";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

export default async function Page() {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/15 via-background to-background">
      <Container>
        {/* Hero */}
        <HeroSection
          locale={locale}
          translations={{
            workTime: t("home.hero.workTime"),

            header: {
              line1: t("home.hero.header.line1"),
              line2: t("home.hero.header.line2"),
              line3: t("home.hero.header.line3"),
            },

            description: t("home.hero.description"),

            buttons: {
              bookAppointment: t("home.hero.buttons.bookAppointment"),
              meetDoctor: t("home.hero.buttons.meetDoctor"),
            },

            experience: {
              years: {
                title: t("home.hero.experience.years.title"),
                subtitle: t("home.hero.experience.years.subtitle"),
              },
              clients: {
                title: t("home.hero.experience.clients.title"),
                subtitle: t("home.hero.experience.clients.subtitle"),
              },
              rating: {
                title: t("home.hero.experience.rating.title"),
                subtitle: t("home.hero.experience.rating.subtitle"),
              },
            },

            image: {
              alt: t("home.hero.image.alt"),
              nextOpening: t("home.hero.image.nextOpening"),
              nextOpeningDetails: t("home.hero.image.nextOpeningDetails"),
            },
          }}
        />

        {/* About Doctor */}
        <AboutDoctor
          translations={{
            brief: {
              badge: t("home.aboutDoctor.brief.badge"),
              name: t("home.aboutDoctor.brief.name"),
              subtitle: t("home.aboutDoctor.brief.subtitle"),
              description: t("home.aboutDoctor.brief.description"),

              specialties: {
                mentalHealth: t(
                  "home.aboutDoctor.brief.specialties.mentalHealth",
                ),
                familyEducational: t(
                  "home.aboutDoctor.brief.specialties.familyEducational",
                ),
                marriageRelationship: t(
                  "home.aboutDoctor.brief.specialties.marriageRelationship",
                ),
                selfDevelopment: t(
                  "home.aboutDoctor.brief.specialties.selfDevelopment",
                ),
                traumaSupport: t(
                  "home.aboutDoctor.brief.specialties.traumaSupport",
                ),
                womensMentalHealth: t(
                  "home.aboutDoctor.brief.specialties.womensMentalHealth",
                ),
              },

              credentials: {
                professionalDoctorate: t(
                  "home.aboutDoctor.brief.credentials.professionalDoctorate",
                ),
                professionalMasters: t(
                  "home.aboutDoctor.brief.credentials.professionalMasters",
                ),
                lifeCoach: t("home.aboutDoctor.brief.credentials.lifeCoach"),
                internationalTraining: t(
                  "home.aboutDoctor.brief.credentials.internationalTraining",
                ),
                doctorateValue: t(
                  "home.aboutDoctor.brief.credentials.doctorateValue",
                ),
                mastersValue: t(
                  "home.aboutDoctor.brief.credentials.mastersValue",
                ),
                lifeCoachValue: t(
                  "home.aboutDoctor.brief.credentials.lifeCoachValue",
                ),
                internationalTrainingValue: t(
                  "home.aboutDoctor.brief.credentials.internationalTrainingValue",
                ),
              },
            },
          }}
        />

        {/* Services */}
        <Services
          translations={{
            header: {
              eyebrow: t("home.services.header.eyebrow"),
              title: t("home.services.header.title"),
              description: t("home.services.header.description"),
            },

            cards: {
              individualTherapy: {
                title: t("home.services.cards.individualTherapy.title"),
                description: t(
                  "home.services.cards.individualTherapy.description",
                ),
              },
              couplesFamily: {
                title: t("home.services.cards.couplesFamily.title"),
                description: t("home.services.cards.couplesFamily.description"),
              },
              adolescentCare: {
                title: t("home.services.cards.adolescentCare.title"),
                description: t(
                  "home.services.cards.adolescentCare.description",
                ),
              },
              psychologicalAssessment: {
                title: t("home.services.cards.psychologicalAssessment.title"),
                description: t(
                  "home.services.cards.psychologicalAssessment.description",
                ),
              },
              burnoutRecovery: {
                title: t("home.services.cards.burnoutRecovery.title"),
                description: t(
                  "home.services.cards.burnoutRecovery.description",
                ),
              },
              followUpAftercare: {
                title: t("home.services.cards.followUpAftercare.title"),
                description: t(
                  "home.services.cards.followUpAftercare.description",
                ),
              },
            },
          }}
        />

        {/* Why Choose Us */}
        <WhyChooseUs
          translations={{
            header: {
              eyebrow: t("home.whyChooseUs.header.eyebrow"),
              title: t("home.whyChooseUs.header.title"),
              description: t("home.whyChooseUs.header.description"),
            },

            features: {
              continuity: {
                title: t("home.whyChooseUs.features.continuity.title"),
                description: t(
                  "home.whyChooseUs.features.continuity.description",
                ),
              },
              progress: {
                title: t("home.whyChooseUs.features.progress.title"),
                description: t(
                  "home.whyChooseUs.features.progress.description",
                ),
              },
              privacy: {
                title: t("home.whyChooseUs.features.privacy.title"),
                description: t("home.whyChooseUs.features.privacy.description"),
              },
              flexibility: {
                title: t("home.whyChooseUs.features.flexibility.title"),
                description: t(
                  "home.whyChooseUs.features.flexibility.description",
                ),
              },
            },
          }}
        />

        {/* Psychological Tests */}
        <PsychologicalTests
          translations={{
            header: {
              eyebrow: t("home.psychologicalTests.header.eyebrow"),
              title: t("home.psychologicalTests.header.title"),
              description: t("home.psychologicalTests.header.description"),
              openLibrary: t("home.psychologicalTests.header.openLibrary"),
            },

            tests: {
              anxiety: {
                category: t("home.psychologicalTests.tests.anxiety.category"),
                duration: t("home.psychologicalTests.tests.anxiety.duration"),
                title: t("home.psychologicalTests.tests.anxiety.title"),
                description: t(
                  "home.psychologicalTests.tests.anxiety.description",
                ),
                questions: t("home.psychologicalTests.tests.anxiety.questions"),
              },

              mood: {
                category: t("home.psychologicalTests.tests.mood.category"),
                duration: t("home.psychologicalTests.tests.mood.duration"),
                title: t("home.psychologicalTests.tests.mood.title"),
                description: t(
                  "home.psychologicalTests.tests.mood.description",
                ),
                questions: t("home.psychologicalTests.tests.mood.questions"),
              },

              stress: {
                category: t("home.psychologicalTests.tests.stress.category"),
                duration: t("home.psychologicalTests.tests.stress.duration"),
                title: t("home.psychologicalTests.tests.stress.title"),
                description: t(
                  "home.psychologicalTests.tests.stress.description",
                ),
                questions: t("home.psychologicalTests.tests.stress.questions"),
              },
            },
          }}
        />

        {/* Testimonials */}
        <TestimonialsSection
          translations={{
            header: {
              title: t("home.testimonials.header.title"),
            },

            testimonials: {
              marcus: {
                name: t("home.testimonials.testimonials.marcus.name"),
                role: t("home.testimonials.testimonials.marcus.role"),
                review: t("home.testimonials.testimonials.marcus.review"),
              },

              priya: {
                name: t("home.testimonials.testimonials.priya.name"),
                role: t("home.testimonials.testimonials.priya.role"),
                review: t("home.testimonials.testimonials.priya.review"),
              },

              elenaTom: {
                name: t("home.testimonials.testimonials.elenaTom.name"),
                role: t("home.testimonials.testimonials.elenaTom.role"),
                review: t("home.testimonials.testimonials.elenaTom.review"),
              },
            },
          }}
        />

        {/* FAQ */}
        <FAQSection
          translations={{
            header: {
              title: t("home.faq.header.title"),
              description: t("home.faq.header.description"),
              sendMessage: t("home.faq.header.sendMessage"),
            },

            items: {
              sessionDuration: {
                question: t("home.faq.items.sessionDuration.question"),
                answer: t("home.faq.items.sessionDuration.answer"),
              },

              onlineSessions: {
                question: t("home.faq.items.onlineSessions.question"),
                answer: t("home.faq.items.onlineSessions.answer"),
              },

              confidentiality: {
                question: t("home.faq.items.confidentiality.question"),
                answer: t("home.faq.items.confidentiality.answer"),
              },

              cancelReschedule: {
                question: t("home.faq.items.cancelReschedule.question"),
                answer: t("home.faq.items.cancelReschedule.answer"),
              },

              psychologicalTests: {
                question: t("home.faq.items.psychologicalTests.question"),
                answer: t("home.faq.items.psychologicalTests.answer"),
              },
            },
          }}
        />
      </Container>
    </div>
  );
}
