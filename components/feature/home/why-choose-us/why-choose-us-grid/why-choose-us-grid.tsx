// components/feature/home/why-choose-us/why-choose-us-grid/why-choose-us-grid.tsx

import FeatureCard from "../feature-card/feature-card";

interface WhyChooseUsGridProps {
  translations: {
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

const WhyChooseUsGrid = ({ translations }: WhyChooseUsGridProps) => {
  const features = [
    {
      number: "01",
      title: translations.continuity.title,
      description: translations.continuity.description,
    },
    {
      number: "02",
      title: translations.progress.title,
      description: translations.progress.description,
    },
    {
      number: "03",
      title: translations.privacy.title,
      description: translations.privacy.description,
    },
    {
      number: "04",
      title: translations.flexibility.title,
      description: translations.flexibility.description,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {features.map((feature) => (
        <FeatureCard key={feature.number} {...feature} />
      ))}
    </div>
  );
};

export default WhyChooseUsGrid;
