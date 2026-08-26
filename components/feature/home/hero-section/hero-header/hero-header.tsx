// components/feature/home/hero-section/hero-header/hero-header.tsx

import React from "react";

interface HeroHeaderProps {
  translations: {
    line1: string;
    line2: string;
    line3: string;
  };
}

const HeroHeader = ({ translations }: HeroHeaderProps) => {
  return (
    <div className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
      <p className="text-foreground">
        {translations.line1}

        <span className="block text-primary">
          {translations.line2}

          <span className="block text-primary">{translations.line3}</span>
        </span>
      </p>
    </div>
  );
};

export default HeroHeader;
