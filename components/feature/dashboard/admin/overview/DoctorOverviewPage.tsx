import { auth } from "@/providers/auth/auth";
import ActivityCard from "./ActivityCard";
import AttentionCard from "./AttentionCard";
import RecentSessions from "./RecentSessions";
import SessionChart from "./SessionChart";
import StatsGrid from "./StatsGrid";
import UpcomingAppointments from "./UpcomingAppointments";
import WelcomeSection from "./WelcomeSection";

const DoctorOverviewPage = async () => {
  const session = await auth();

  const userName = session?.user?.name ?? "Doctor";
  return (
    <div className="space-y-6">
      <WelcomeSection userName={userName} />

      <StatsGrid />

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingAppointments />
        <RecentSessions />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2"></div>
        {/* 
        <div className="space-y-6">
          <AttentionCard />
          <ActivityCard />
        </div> */}
      </div>
    </div>
  );
};

export default DoctorOverviewPage;
