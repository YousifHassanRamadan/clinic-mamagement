// components/feature/dashboard/patient/tests/LatestResultCard.tsx

import { CalendarDays, ClipboardCheck, Layers3, Sparkles } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import ResultBadge from "./ResultBadge";
import { GroupResult, TestResult } from "./types";

import { TestStatus } from "@/app/generated/prisma/enums";

interface Props {
  result: TestResult;
  locale: "en" | "ar";
}

const LatestResultCard = ({ result, locale }: Props) => {
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

  const description =
    isArabic && result.test.descriptionAr
      ? result.test.descriptionAr
      : result.test.description;

  const resultText =
    isArabic && result.resultAr ? result.resultAr : result.result;

  const renderGroupResults = (groups: GroupResult[]) => {
    return (
      <div className="mt-6">
        <div className="mb-4 flex items-center gap-2">
          <Layers3 className="h-5 w-5 text-primary" />

          <h3 className="font-semibold">
            {isArabic ? "نتائج المجموعات" : "Group Results"}
          </h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
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
                className="rounded-2xl border bg-muted/30 p-5"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-semibold">
                    {isArabic
                      ? `المجموعة ${group.group}`
                      : `Group ${group.group}`}
                  </span>

                  <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                    {group.score}
                  </span>
                </div>

                <p className="mt-4 text-sm font-semibold leading-relaxed">
                  {displayResult}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <Card className="overflow-hidden rounded-3xl border bg-card shadow-sm">
      <CardContent className="p-0">
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

                    {isArabic ? "أحدث نتيجة" : "Latest Result"}
                  </span>
                </div>

                <h2 className="text-2xl font-bold tracking-tight">{title}</h2>

                {categoryName && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {categoryName}
                  </p>
                )}
              </div>
            </div>

            <ResultBadge status={result.status as TestStatus} />
          </div>
        </div>

        <div className="p-8">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl bg-muted/40 p-6">
              <p className="text-sm font-medium text-muted-foreground">
                {isArabic ? "الدرجة الإجمالية" : "Overall Score"}
              </p>

              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-5xl font-bold tracking-tight">
                  {result.score ?? 0}
                </span>

                <span className="text-sm text-muted-foreground">
                  {isArabic ? "نقطة" : "points"}
                </span>
              </div>
            </div>

            <div className="rounded-2xl bg-muted/40 p-6">
              <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                <CalendarDays className="h-4 w-4" />

                {isArabic ? "تم الإكمال" : "Completed"}
              </div>

              <p className="mt-3 text-lg font-semibold">{formattedDate}</p>
            </div>
          </div>

          {result.isSpecialGroupedTest && result.groupResults?.length
            ? renderGroupResults(result.groupResults)
            : resultText && (
                <div className="mt-6 rounded-2xl border bg-background p-6">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    {isArabic ? "النتيجة" : "Result"}
                  </p>

                  <p className="mt-2 text-lg font-semibold leading-relaxed">
                    {resultText}
                  </p>
                </div>
              )}

          {description && (
            <div className="mt-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {isArabic ? "وصف التقييم" : "Assessment Description"}
              </p>

              <p className="mt-2 max-w-3xl leading-relaxed text-muted-foreground">
                {description}
              </p>
            </div>
          )}
        </div>

        <div className="border-t bg-muted/20 px-8 py-4">
          <p className="text-sm text-muted-foreground">
            {isArabic
              ? result.isSpecialGroupedTest
                ? "هذه النتيجة تحتوي على نتائج منفصلة لكل مجموعة من الأسئلة."
                : "هذه أحدث نتيجة لتقييم نفسي مكتمل."
              : result.isSpecialGroupedTest
                ? "This result contains separate results for each question group."
                : "This is your most recently completed psychological assessment."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LatestResultCard;
