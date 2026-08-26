// components/feature/home/services/service-card/service-card.tsx

import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  description: string;
  icon: LucideIcon;
}

const ServiceCard = ({ title, description, icon: Icon }: Props) => {
  return (
    <Card className="group block rounded-3xl border-border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 transition-colors duration-300 group-hover:bg-primary">
        <Icon className="h-6 w-6 text-primary transition-colors duration-300 group-hover:text-background" />
      </div>

      <h3 className="mt-2 text-lg font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-muted-foreground">{description}</p>
    </Card>
  );
};

export default ServiceCard;
