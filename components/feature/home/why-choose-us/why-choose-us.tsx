// components/feature/home/why-choose-us/why-choose-us.tsx

import WhyChooseUsGrid from "./why-choose-us-grid/why-choose-us-grid";
import WhyChooseUsHeader from "./why-choose-us-header/why-choose-us-header";

interface WhyChooseUsTranslations {
  header: {
    eyebrow: string;
    title: string;
    description: string;
  };

  features: {
    continuity: {
      title: string;
      description: string;
    };
    progress: {
      title: string;
      description: string;
    };
    privacy: {
      title: string;
      description: string;
    };
    flexibility: {
      title: string;
      description: string;
    };
  };
}

interface WhyChooseUsProps {
  translations: WhyChooseUsTranslations;
}

const WhyChooseUs = ({ translations }: WhyChooseUsProps) => {
  return (
    <section className="py-28">
      <div className="grid gap-16 lg:grid-cols-2">
        <WhyChooseUsHeader translations={translations.header} />

        <WhyChooseUsGrid translations={translations.features} />
      </div>
    </section>
  );
};

export default WhyChooseUs;
