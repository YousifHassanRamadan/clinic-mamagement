// components/feature/home/psychological-tests/test-card/test-card.tsx

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
    <Card
      className="
        group flex h-full flex-col
        rounded-2xl
        p-4
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-lg
        sm:rounded-3xl
        sm:p-6
      "
    >
      {/* Category & Duration */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <Badge
          variant="secondary"
          className="
            w-fit
            max-w-full
            rounded-full
            bg-primary/10
            px-3
            py-1
            text-xs
            text-primary
            hover:bg-primary/10
            sm:text-sm
          "
        >
          <span className="truncate">{category}</span>
        </Badge>

        {/* <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground sm:text-sm">
          <Clock3 className="h-4 w-4 shrink-0" />

          <span>{duration}</span>
        </div> */}
      </div>

      {/* Title */}
      <h3 className="mt-4 text-lg font-semibold leading-snug sm:mt-5 sm:text-xl lg:text-2xl">
        {title}
      </h3>

      {/* Description */}
      <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
        {description}
      </p>

      {/* Questions */}
      <p className="mt-auto pt-5 text-xs font-medium text-muted-foreground sm:text-sm">
        {questions}
      </p>
    </Card>
  );
};

export default TestCard;
