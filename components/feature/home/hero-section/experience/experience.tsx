// components/feature/home/hero-section/experience/experience.tsx

import React from "react";

interface ExperienceProps {
  translations: {
    years: {
      title: string;
      subtitle: string;
    };
    clients: {
      title: string;
      subtitle: string;
    };
    rating: {
      title: string;
      subtitle: string;
    };
  };
}

const Experience = ({ translations }: ExperienceProps) => {
  const experiences = [
    translations.years,
    translations.clients,
    translations.rating,
  ];

  return (
    <div className="flex flex-wrap items-center gap-x-8 gap-y-5 sm:gap-x-10">
      {experiences.map((exp, index) => (
        <div key={index}>
          <h3 className="text-lg font-bold sm:text-xl">{exp.title}</h3>

          <p className="text-xs text-muted-foreground">{exp.subtitle}</p>
        </div>
      ))}
    </div>
  );
};

export default Experience;
