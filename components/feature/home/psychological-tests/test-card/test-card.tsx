import { Clock3 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  category: string;
  duration: string;
  title: string;
  description: string;
  questions: string;
}

const TestCard = ({
  category,
  duration,
  title,
  description,
  questions,
}: Props) => {
  return (
    <Card className="block group rounded-3xl p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <Badge
          variant="secondary"
          className="rounded-full bg-primary/10 text-primary hover:bg-primary/10"
        >
          {category}
        </Badge>

        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Clock3 className="h-4 w-4" />
          {duration}
        </div>
      </div>

      <h3 className="mt-5 text-xl font-semibold">{title}</h3>

      <p className="mt-3 leading-7 text-muted-foreground">{description}</p>

      <p className="mt-5 text-sm font-medium text-muted-foreground">
        {questions}
      </p>
    </Card>
  );
};

export default TestCard;
