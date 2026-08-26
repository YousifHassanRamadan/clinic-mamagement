// TestProgress.tsx

import { Progress } from "@/components/ui/progress";

interface Props {
  current: number;
  total: number;
  translations: {
    question: string;
    of: string;
    complete: string;
  };
}

const TestProgress = ({ current, total, translations }: Props) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span>
          {translations.question} {current} {translations.of} {total}
        </span>

        <span className="text-muted-foreground">
          {Math.round(percentage)}% {translations.complete}
        </span>
      </div>

      <Progress value={percentage} />
    </div>
  );
};

export default TestProgress;
