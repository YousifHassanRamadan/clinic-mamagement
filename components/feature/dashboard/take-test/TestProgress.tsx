import { Progress } from "@/components/ui/progress";

interface Props {
  current: number;
  total: number;
}

const TestProgress = ({ current, total }: Props) => {
  const percentage = (current / total) * 100;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-sm">
        <span>
          Question {current} of {total}
        </span>

        <span className="text-muted-foreground">
          {Math.round(percentage)}% complete
        </span>
      </div>

      <Progress value={percentage} />
    </div>
  );
};

export default TestProgress;
