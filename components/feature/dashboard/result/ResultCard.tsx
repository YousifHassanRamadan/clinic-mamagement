// components/feature/dashboard/patient/tests/ResultCard.tsx

import { CalendarDays, ClipboardCheck, Layers3 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { TestStatus } from "@/app/generated/prisma/enums";

import { TestResult } from "./types";
import ResultBadge from "./ResultBadge";

interface Props {
  result: TestResult;
  locale: "en" | "ar";
}

const ResultCard = ({ result, locale }: Props) => {
  const isArabic = locale === "ar";

  const formattedDate = result.completedAt
    ? new Date(result.completedAt).toLocaleDateString(
        isArabic ? "ar-EG" : "en-US",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        },
      )
    : "-";

  const title =
    isArabic && result.test.titleAr ? result.test.titleAr : result.test.title;

  const categoryName =
    isArabic && result.test.category?.nameAr
      ? result.test.category.nameAr
      : result.test.category?.name;

  const resultText =
    isArabic && result.resultAr ? result.resultAr : result.result;

  return (
    <Card className="group overflow-hidden rounded-3xl border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardContent className="p-0">
        <div className="flex items-start justify-between gap-4 border-b p-6">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ClipboardCheck className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-lg font-semibold">{title}</h3>

              {categoryName && (
                <p className="mt-1 text-sm text-muted-foreground">
                  {categoryName}
                </p>
              )}
            </div>
          </div>

          <ResultBadge status={result.status as TestStatus} />
        </div>

        <div className="p-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                {isArabic ? "الدرجة الإجمالية" : "Overall Score"}
              </p>

              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-4xl font-bold tracking-tight">
                  {result.score ?? 0}
                </span>

                <span className="text-sm text-muted-foreground">
                  {isArabic ? "نقطة" : "points"}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDays className="h-4 w-4" />

              <span>{formattedDate}</span>
            </div>
          </div>

          {result.isSpecialGroupedTest && result.groupResults?.length ? (
            <div className="mt-6">
              <div className="mb-4 flex items-center gap-2">
                <Layers3 className="h-4 w-4 text-primary" />

                <p className="text-sm font-semibold">
                  {isArabic ? "نتائج المجموعات" : "Group Results"}
                </p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                {result.groupResults.map((group) => {
                  const groupResult = isArabic
                    ? group.resultAr || group.result
                    : group.result;

                  const normalizedResult = groupResult?.trim().toLowerCase();

                  const isNoResult =
                    normalizedResult === "no result" ||
                    normalizedResult === "لا توجد نتيجة" ||
                    normalizedResult === "لا يوجد نتيجة" ||
                    normalizedResult === "لا نتيجة";

                  const displayResult = isNoResult
                    ? isArabic
                      ? "ضعيف"
                      : "Weak"
                    : groupResult;

                  return (
                    <div
                      key={group.group}
                      className="rounded-2xl bg-muted/50 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-semibold">
                          {isArabic
                            ? `المجموعة ${group.group}`
                            : `Group ${group.group}`}
                        </span>

                        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-sm font-bold text-primary">
                          {group.score}
                        </span>
                      </div>

                      <p className="mt-2 text-sm font-medium leading-relaxed">
                        {displayResult}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            resultText && (
              <div className="mt-6 rounded-2xl bg-muted/50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {isArabic ? "النتيجة" : "Result"}
                </p>

                <p className="mt-1 font-medium leading-relaxed">{resultText}</p>
              </div>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultCard;
