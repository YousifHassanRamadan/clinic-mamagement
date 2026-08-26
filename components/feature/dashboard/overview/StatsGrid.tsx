// components/feature/dashboard/overview/StatsGrid.tsx

import { CalendarDays, CheckCircle2, ClipboardList } from "lucide-react";

import StatCard from "./StatCard";
import type { StatCardType } from "./types";

import { getDashboardStats } from "@/app/actions/patient-actions/dashboard/get-dashboard-stats";
import { cookies } from "next/headers";
import { getTranslations } from "@/i18n/getTranslations";

const StatsGrid = async () => {
  const result = await getDashboardStats();

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const t = await getTranslations(locale);

  const data = result.data ?? {
    upcomingAppointments: [],
    completedSessions: 0,
    completedTests: 0,
    mood: "No Data",
    latestTest: null,
    recentSessions: [],
    totalAppointments: 0,
  };

  const errorMessage = result.success
    ? null
    : (result.message ?? t("dashboard.statsLoadFailed"));

  const stats: StatCardType[] = [
    {
      title: t("dashboard.upcomingAppointments"),
      value: data.upcomingAppointments.length,
      description: t("dashboard.scheduledSessions"),
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: t("dashboard.totalAppointments"),
      value: data.totalAppointments,
      description: t("dashboard.allAppointments"),
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: t("dashboard.completedTests"),
      value: data.completedTests,
      description: t("dashboard.assessmentsFinished"),
      icon: ClipboardList,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {errorMessage && (
        <p className="col-span-full text-sm text-destructive">{errorMessage}</p>
      )}

      {stats.map((stat) => (
        <StatCard key={stat.title} stat={stat} />
      ))}
    </section>
  );
};

export default StatsGrid;
