// components/feature/dashboard/result/LatestResult.tsx

import { cookies } from "next/headers";
import { Layers3 } from "lucide-react";

import { Card } from "@/components/ui/card";

import { getDashboardStats } from "@/app/actions/patient-actions/dashboard/get-dashboard-stats";
import { getTranslations } from "@/i18n/getTranslations";

import ProgressBar from "./ProgressBar";

type GroupResult = {
  group: number;
  score: number;
  result: string;
  resultAr: string;
};

const LatestResult = async () => {
  const result = await getDashboardStats();

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const t = await getTranslations(locale);
  const isArabic = locale === "ar";

  if (!result.success || !result.data) {
    return (
      <Card className="rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{t("assessment.latest")}</h2>

        <p className="mt-6 text-sm text-muted-foreground">
          {t("assessment.unableToLoad")}
        </p>
      </Card>
    );
  }

  const latestTest = result.data.latestTest;

  if (!latestTest) {
    return (
      <Card className="rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{t("assessment.latest")}</h2>

        <div className="mt-6 rounded-xl bg-primary/5 p-5">
          <p className="font-medium">{t("assessment.noCompleted")}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            {t("assessment.completeToSeeResult")}
          </p>
        </div>
      </Card>
    );
  }

  const score = latestTest.score ?? 0;

  const title =
    isArabic && latestTest.test.titleAr
      ? latestTest.test.titleAr
      : latestTest.test.title;

  const groupResults = latestTest.groupResults;

  return (
    <Card className="rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{t("assessment.latest")}</h2>

      <div className="mt-6">
        <h3 className="font-semibold">{title}</h3>

        {groupResults?.length ? (
          <div className="mt-5">
            <div className="mb-4 flex items-center gap-2">
              <Layers3 className="h-4 w-4 text-primary" />

              <h4 className="text-sm font-semibold">
                {t("dashboard4.admin.testResults.details.result.groupResults")}
              </h4>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {groupResults.map((group) => {
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
                    className="rounded-2xl border bg-muted/40 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold">
                        {t("dashboard4.admin.testResults.details.result.group")}{" "}
                        {group.group}
                      </span>

                      <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-bold text-primary">
                        {group.score}
                      </span>
                    </div>

                    <p className="mt-3 text-sm font-medium leading-relaxed">
                      {displayResult}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="mt-2 text-muted-foreground">
            {latestTest.result ??
              latestTest.resultAr ??
              t("assessment.completed")}
          </p>
        )}

        <ProgressBar value={score} />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t("dashboard4.admin.testResults.details.result.overallScore")}
          </span>

          <span className="text-lg font-bold text-primary">{score}%</span>
        </div>
      </div>
    </Card>
  );
};

export default LatestResult;
