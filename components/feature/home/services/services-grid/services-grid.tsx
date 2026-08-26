// components/feature/home/services/services-grid/services-grid.tsx

import {
  User,
  Users,
  Sparkles,
  ClipboardList,
  Brain,
  Heart,
  type LucideIcon,
} from "lucide-react";

import ServiceCard from "../service-card/service-card";

interface ServiceItem {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface ServicesGridProps {
  translations: {
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

const ServicesGrid = ({ translations }: ServicesGridProps) => {
  const services: ServiceItem[] = [
    {
      ...translations.individualTherapy,
      icon: User,
    },
    {
      ...translations.couplesFamily,
      icon: Users,
    },
    {
      ...translations.adolescentCare,
      icon: Sparkles,
    },
    {
      ...translations.psychologicalAssessment,
      icon: ClipboardList,
    },
    {
      ...translations.burnoutRecovery,
      icon: Brain,
    },
    {
      ...translations.followUpAftercare,
      icon: Heart,
    },
  ];

  return (
    <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard
          key={service.title}
          title={service.title}
          description={service.description}
          icon={service.icon}
        />
      ))}
    </div>
  );
};

export default ServicesGrid;
