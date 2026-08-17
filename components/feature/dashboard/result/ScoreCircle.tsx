import { Progress } from "@/components/ui/progress";

interface Props {
  score: number;
  maxScore: number;
}

const ScoreCircle = ({ score, maxScore }: Props) => {
  return (
    <div className="rounded-2xl bg-primary/10 p-5 w-40 text-center">
      <h2 className="text-5xl font-bold text-primary">{score}</h2>

      <p className="text-muted-foreground text-sm">out of {maxScore}</p>

      <Progress value={(score / maxScore) * 100} className="mt-5 h-2" />
    </div>
  );
};

export default ScoreCircle;
