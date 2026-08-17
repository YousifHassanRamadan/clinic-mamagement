import { CalendarDays, ChevronRight, ClipboardCheck } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { TestResult } from "./types";
import ResultBadge from "./ResultBadge";

interface Props {
  result: TestResult;
}

const ResultCard = ({ result }: Props) => {
  const formattedDate = result.completedAt
    ? new Date(result.completedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <Card className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-0">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ClipboardCheck className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold">
                {result.test.title}
              </h3>

              {result.test.category && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {result.test.category.name}
                </p>
              )}
            </div>
          </div>

          <ResultBadge status={result.status} />
        </div>

        {/* Score */}
        <div className="p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Your Score
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  {result.score ?? 0}
                </span>

                <span className="text-sm text-muted-foreground">points</span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />
              <span>{formattedDate}</span>
            </div>
          </div>

          {/* Result */}
          {result.result && (
            <div className="mt-6 rounded-2xl bg-muted/50 p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Result
              </p>

              <p className="mt-1 font-medium leading-relaxed">
                {result.result}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
