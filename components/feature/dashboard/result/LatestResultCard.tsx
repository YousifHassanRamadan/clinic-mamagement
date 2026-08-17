import { CalendarDays, ClipboardCheck, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import ResultBadge from "./ResultBadge";
import { TestResult } from "./types";

interface Props {
  result: TestResult;
}

const LatestResultCard = ({ result }: Props) => {
  const formattedDate = result.completedAt
    ? new Date(result.completedAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <Card className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <CardContent className="p-0">
        {/* Top section */}
        <div className="border-b p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ClipboardCheck className="h-6 w-6" />
              </div>

              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                    <Sparkles className="h-3.5 w-3.5" />
                    Latest Result
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight">
                  {result.test.title}
                </h2>

                {result.test.category && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {result.test.category.name}
                  </p>
                )}
              </div>
            </div>

            <ResultBadge status={result.status} />
          </div>
        </div>

        {/* Main result */}
        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Score */}
            <div className="rounded-2xl bg-muted/40 p-6">
              <p className="text-sm font-medium text-muted-foreground">
                Your Score
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight">
                  {result.score ?? 0}
                </span>

                <span className="text-sm text-muted-foreground">points</span>
              </div>
            </div>

            {/* Completed date */}
            <div className="rounded-2xl bg-muted/40 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="h-4 w-4" />
                Completed
              </div>

              <p className="mt-3 text-lg font-semibold">{formattedDate}</p>
            </div>
          </div>

          {/* Result */}
          {result.result && (
            <div className="mt-6 rounded-2xl border bg-background p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Result
              </p>

              <p className="mt-2 text-lg font-semibold leading-relaxed">
                {result.result}
              </p>
            </div>
          )}

          {/* Description */}
          {result.test.description && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Assessment Description
              </p>

              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {result.test.description}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-muted/20 px-8 py-4">
          <p className="text-sm text-muted-foreground">
            This is your most recently completed psychological assessment.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestResultCard;
