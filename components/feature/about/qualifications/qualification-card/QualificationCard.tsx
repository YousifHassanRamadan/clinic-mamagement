import { Card } from "@/components/ui/card";

interface QualificationCardProps {
  degree: string;
  university: string;
  year: string;
}

const QualificationCard = ({
  degree,
  university,
  year,
}: QualificationCardProps) => {
  return (
    <Card className="block rounded-2xl p-5 transition-all duration-300 hover:shadow-md">
      <h3 className="font-semibold">{degree}</h3>

      <p className="mt-1 text-sm text-muted-foreground">{university}</p>

      <span className="mt-3 inline-block text-sm text-primary font-medium">
        {year}
      </span>
    </Card>
  );
};

export default QualificationCard;
