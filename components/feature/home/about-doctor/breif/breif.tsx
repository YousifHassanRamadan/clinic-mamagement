// components/feature/home/about-doctor/breif/breif.tsx

import { CheckCircle2 } from "lucide-react";

interface BreifProps {
  translations: {
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

const Breif = ({ translations }: BreifProps) => {
  const specialties = [
    translations.specialties.mentalHealth,
    translations.specialties.familyEducational,
    translations.specialties.marriageRelationship,
    translations.specialties.selfDevelopment,
    translations.specialties.traumaSupport,
    translations.specialties.womensMentalHealth,
  ];

  return (
    <div className="w-full max-w-2xl">
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
        {translations.badge}
      </p>

      <h2 className="text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl">
        {translations.name}
      </h2>

      <p className="mt-3 text-base text-muted-foreground sm:text-lg">
        {translations.subtitle}
      </p>

      <p className="mt-6 text-sm leading-7 text-muted-foreground sm:mt-8 sm:text-base sm:leading-8">
        {translations.description}
      </p>

      <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-4 sm:mt-10 sm:grid-cols-2 sm:gap-y-5">
        {specialties.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />

            <span className="text-sm text-foreground">{item}</span>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3 text-sm leading-7 text-muted-foreground">
        <p>
          <span className="font-semibold text-foreground">
            {translations.credentials.professionalDoctorate}
          </span>{" "}
          {translations.credentials.doctorateValue}
        </p>

        <p>
          <span className="font-semibold text-foreground">
            {translations.credentials.professionalMasters}
          </span>{" "}
          {translations.credentials.mastersValue}
        </p>

        <p>
          <span className="font-semibold text-foreground">
            {translations.credentials.lifeCoach}
          </span>{" "}
          {translations.credentials.lifeCoachValue}
        </p>

        <p>
          <span className="font-semibold text-foreground">
            {translations.credentials.internationalTraining}
          </span>{" "}
          {translations.credentials.internationalTrainingValue}
        </p>
      </div>
    </div>
  );
};

export default Breif;
