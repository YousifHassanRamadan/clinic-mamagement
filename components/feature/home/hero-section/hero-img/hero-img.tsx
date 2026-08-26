// components/feature/home/hero-section/hero-img/hero-img.tsx

import React from "react";
import Image from "next/image";

import heroImg from "@/assets/Serene-Mind-Clinic/imgi_1_clinic-hero-BuhEzBK7.jpg";

import { Bubble, BubbleContent } from "@/components/ui/bubble";

import { Calendar1 } from "lucide-react";

interface HeroImgProps {
  translations: {
    alt: string;
    nextOpening: string;
    nextOpeningDetails: string;
  };
}

const HeroImg = ({ translations }: HeroImgProps) => {
  return (
    <div className="relative h-[420px] w-full max-w-[550px] xl:h-[550px]">
      <Image
        src={heroImg}
        alt={translations.alt}
        fill
        priority
        className="rounded-3xl object-cover"
        sizes="(max-width: 1280px) 45vw, 550px"
      />

      <Bubble className="absolute bottom-5 left-5" variant="popover">
        <BubbleContent>
          <div className="flex items-center gap-2">
            <Calendar1 className="text-sm text-primary" />

            <p className="text-sm font-semibold text-foreground">
              {translations.nextOpening}
            </p>
          </div>

          <div>
            <p className="text-xs text-muted-foreground">
              {translations.nextOpeningDetails}
            </p>
          </div>
        </BubbleContent>
      </Bubble>
    </div>
  );
};

export default HeroImg;
