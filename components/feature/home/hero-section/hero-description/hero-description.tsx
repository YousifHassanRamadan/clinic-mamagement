// components/feature/home/hero-section/hero-description/hero-description.tsx

import React from "react";

interface HeroDescriptionProps {
  translations: string;
}

const HeroDescription = ({ translations }: HeroDescriptionProps) => {
  return (
    <p className="text-base leading-8 text-muted-foreground sm:text-lg lg:text-xl">
      {translations}
    </p>
  );
};

export default HeroDescription;
