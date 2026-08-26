// components/feature/home/about-doctor/about-doctor.tsx

import React from "react";
import DoctorImg from "./doctor-img/doctor-img";
import Breif from "./breif/breif";

interface AboutDoctorTranslations {
  brief: {
    badge: string;
    name: string;
    subtitle: string;
    description: string;

    specialties: {
      mentalHealth: string;
      familyEducational: string;
      marriageRelationship: string;
      selfDevelopment: string;
      traumaSupport: string;
      womensMentalHealth: string;
    };

    credentials: {
      professionalDoctorate: string;
      professionalMasters: string;
      lifeCoach: string;
      internationalTraining: string;
      doctorateValue: string;
      mastersValue: string;
      lifeCoachValue: string;
      internationalTrainingValue: string;
    };
  };
}

interface AboutDoctorProps {
  translations: AboutDoctorTranslations;
}

const AboutDoctor = ({ translations }: AboutDoctorProps) => {
  return (
    <section className="py-20 sm:py-28 lg:py-40">
      <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="w-full shrink-0 lg:w-[350px]">
          <DoctorImg />
        </div>

        <div className="w-full lg:flex-1">
          <Breif translations={translations.brief} />
        </div>
      </div>
    </section>
  );
};

export default AboutDoctor;
