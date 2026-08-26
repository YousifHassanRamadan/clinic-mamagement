import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";

import ActivityCard from "./ActivityCard";
import AttentionCard from "./AttentionCard";
import RecentSessions from "./RecentSessions";
import SessionChart from "./SessionChart";
import StatsGrid from "./StatsGrid";
import UpcomingAppointments from "./UpcomingAppointments";
import WelcomeSection from "./WelcomeSection";

const DoctorOverviewPage = async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  const t = await getTranslations(locale);

  const userName = "Doctor";

  const translations = {
    welcome: {
      day: t("dashboard2.doctor.version2.welcome.day"),
      greeting: t("dashboard2.doctor.version2.welcome.greeting"),
      description: t("dashboard2.doctor.version2.welcome.description"),
      newSession: t("dashboard2.doctor.version2.welcome.newSession"),
    },

    stats: {
      patients: t("dashboard2.doctor.version2.stats.patients"),
      patientsSubtitle: t("dashboard2.doctor.version2.stats.patientsSubtitle"),

      sessions: t("dashboard2.doctor.version2.stats.sessions"),
      sessionsSubtitle: t("dashboard2.doctor.version2.stats.sessionsSubtitle"),

      tests: t("dashboard2.doctor.version2.stats.tests"),
      testsSubtitle: t("dashboard2.doctor.version2.stats.testsSubtitle"),
    },

    appointments: {
      title: t("dashboard2.doctor.version2.appointments.title"),
      empty: t("dashboard2.doctor.version2.appointments.empty"),
    },

    sessions: {
      title: t("dashboard2.doctor.version2.sessions.title"),
      empty: t("dashboard2.doctor.version2.sessions.empty"),
      noDiagnosis: t("dashboard2.doctor.version2.sessions.noDiagnosis"),
      minutes: t("dashboard2.doctor.version2.sessions.minutes"),
      veryBad: t("dashboard2.doctor.version2.sessions.veryBad"),
      bad: t("dashboard2.doctor.version2.sessions.bad"),
      neutral: t("dashboard2.doctor.version2.sessions.neutral"),
      good: t("dashboard2.doctor.version2.sessions.good"),
      veryGood: t("dashboard2.doctor.version2.sessions.veryGood"),
    },
  };

  return (
    <div className="space-y-6">
      <WelcomeSection userName={userName} translations={translations.welcome} />

      <StatsGrid translations={translations.stats} />

      <div className="grid gap-6 xl:grid-cols-2">
        <UpcomingAppointments translations={translations.appointments} />

        <RecentSessions translations={translations.sessions} />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2"></div>

        {/*
        <div className="space-y-6">
          <AttentionCard />
          <ActivityCard />
        </div>
        */}
      </div>
    </div>
  );
};

export default DoctorOverviewPage;
