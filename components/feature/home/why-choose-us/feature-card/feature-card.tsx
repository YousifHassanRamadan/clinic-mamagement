import { Card } from "@/components/ui/card";

interface FeatureCardProps {
  number: string;
  title: string;
  description: string;
}

const FeatureCard = ({ number, title, description }: FeatureCardProps) => {
  return (
    <Card className=" block rounded-3xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <span className="text-sm font-bold text-primary">{number}</span>

      <h3 className="mt-3 text-lg font-semibold text-foreground">{title}</h3>

      <p className="mt-2 leading-7 text-muted-foreground">{description}</p>
    </Card>
  );
};

export default FeatureCard;
