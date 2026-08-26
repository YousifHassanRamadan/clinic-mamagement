// components/feature/home/services/services.tsx

import ServicesGrid from "./services-grid/services-grid";
import ServicesHeader from "./services-header/services-header";

interface ServicesTranslations {
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };

  cards: {
    individualTherapy: {
      title: string;
      description: string;
    };
    couplesFamily: {
      title: string;
      description: string;
    };
    adolescentCare: {
      title: string;
      description: string;
    };
    psychologicalAssessment: {
      title: string;
      description: string;
    };
    burnoutRecovery: {
      title: string;
      description: string;
    };
    followUpAftercare: {
      title: string;
      description: string;
    };
  };
}

interface ServicesProps {
  translations: ServicesTranslations;
}

const Services = ({ translations }: ServicesProps) => {
  return (
    <section className="py-28">
      <ServicesHeader translations={translations.header} />

      <ServicesGrid translations={translations.cards} />
    </section>
  );
};

export default Services;
