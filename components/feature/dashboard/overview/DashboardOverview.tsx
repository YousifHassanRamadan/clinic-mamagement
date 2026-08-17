import { Suspense } from "react";

import UpcomingAppointment from "../appointment/UpcomingAppointment";
import QuickActions from "../actions/QuickActions";
import LatestResult from "../result/LatestResult";
import RecentSessions from "../sessions/RecentSessions";

import StatsGrid from "./StatsGrid";
import WelcomeSection from "./WelcomeSection";

const StatsGridSkeleton = () => (
  <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="h-32 animate-pulse rounded-3xl bg-muted" />
    ))}
  </section>
);

const DashboardOverview = () => {
  return (
    <div className="space-y-8">
      <WelcomeSection />

      <Suspense fallback={<StatsGridSkeleton />}>
        <StatsGrid />
      </Suspense>

      <section className="grid gap-6 xl:grid-cols-2">
        <UpcomingAppointment />
        <LatestResult />
      </section>

      <section className="grid gap-8 xl:grid-cols-[2fr_1fr]">
        {/* <RecentSessions /> */}
        <QuickActions />
      </section>
    </div>
  );
};

export default DashboardOverview;
