import { Card } from "@/components/ui/card";

import ProgressBar from "./ProgressBar";
import { getDashboardStats } from "@/app/actions/patient-actions/dashboard/get-dashboard-stats";

const LatestResult = async () => {
  const result = await getDashboardStats();

  if (!result.success || !result.data) {
    return (
      <Card className="rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Latest Assessment</h2>

        <p className="mt-6 text-sm text-muted-foreground">
          Unable to load your latest assessment.
        </p>
      </Card>
    );
  }

  const latestTest = result.data.latestTest;

  if (!latestTest) {
    return (
      <Card className="rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold">Latest Assessment</h2>

        <div className="mt-6 rounded-xl bg-primary/5 p-5">
          <p className="font-medium">No completed assessments</p>

          <p className="mt-1 text-sm text-muted-foreground">
            Complete an assessment to see your latest result here.
          </p>
        </div>
      </Card>
    );
  }

  const score = latestTest.score ?? 0;

  return (
    <Card className="rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Latest Assessment</h2>

      <div className="mt-6">
        <h3 className="font-semibold">{latestTest.test.title}</h3>

        <p className="mt-2 text-muted-foreground">
          {latestTest.result ?? "Assessment completed"}
        </p>

        <ProgressBar value={score} />

        <div className="mt-4 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Score</span>

          <span className="text-lg font-bold text-primary">{score}%</span>
        </div>
      </div>
    </Card>
  );
};

export default LatestResult;
