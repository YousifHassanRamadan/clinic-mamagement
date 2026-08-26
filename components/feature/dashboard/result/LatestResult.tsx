// components/feature/dashboard/result/LatestResult.tsx

import { cookies } from "next/headers";

import { Card } from "@/components/ui/card";

import { getDashboardStats } from "@/app/actions/patient-actions/dashboard/get-dashboard-stats";
import { getTranslations } from "@/i18n/getTranslations";

import ProgressBar from "./ProgressBar";

const LatestResult = async () => {
  const result = await getDashboardStats();

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const t = await getTranslations(locale);

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

  return (
    <Card className="rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{t("assessment.latest")}</h2>

      <div className="mt-6">
        <h3 className="font-semibold">{latestTest.test.title}</h3>

        <p className="mt-2 text-muted-foreground">
          {latestTest.result ?? t("assessment.completed")}
        </p>

        <ProgressBar value={score} />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {t("assessment.score")}
          </span>

          <span className="text-lg font-bold text-primary">{score}%</span>
        </div>
      </div>
    </Card>
  );
};

export default LatestResult;
