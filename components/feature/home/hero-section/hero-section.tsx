// components/feature/home/hero-section/hero-section.tsx

import React from "react";

import ChipWorkTime from "./chip-work-time/chip-work-time";
import HeroHeader from "./hero-header/hero-header";
import HeroDescription from "./hero-description/hero-description";
import HeroBtns from "./hero-btns/hero-btns";
import Experience from "./experience/experience";
import HeroImg from "./hero-img/hero-img";

import type { Locale } from "@/i18n/config";

interface HeroSectionTranslations {
  workTime: string;

  header: {
    line1: string;
    line2: string;
    line3: string;
  };

  description: string;

  buttons: {
    bookAppointment: string;
    meetDoctor: string;
  };

  experience: {
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

  image: {
    alt: string;
    nextOpening: string;
    nextOpeningDetails: string;
  };
}

interface HeroSectionProps {
  locale: Locale;
  translations: HeroSectionTranslations;
}

const HeroSection = ({ translations }: HeroSectionProps) => {
  return (
    <div className="min-h-[90vh] py-10 sm:py-14 lg:py-20">
      <div className="flex flex-col gap-8 sm:gap-10">
        <div className="work-time">
          <ChipWorkTime translations={translations.workTime} />
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-14 xl:gap-20">
          <div className="brief-section flex min-w-0 flex-col gap-7 sm:gap-8 lg:gap-10">
            <div className="header">
              <HeroHeader translations={translations.header} />
            </div>

            <div className="description max-w-2xl">
              <HeroDescription translations={translations.description} />
            </div>

            <div className="buttons">
              <HeroBtns translations={translations.buttons} />
            </div>

            <div className="experience">
              <Experience translations={translations.experience} />
            </div>
          </div>

          <div className="hero-section hidden lg:block">
            <div className="hero flex justify-center">
              <HeroImg translations={translations.image} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
