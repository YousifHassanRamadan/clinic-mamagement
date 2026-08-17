import { CalendarDays, CheckCircle2, ClipboardList } from "lucide-react";

import StatCard from "./StatCard";
import { StatCardType } from "./types";
import { getDashboardStats } from "@/app/actions/patient-actions/dashboard/get-dashboard-stats";

const StatsGrid = async () => {
  const result = await getDashboardStats();

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
    : (result.message ?? "Failed to load dashboard stats");

  const stats: StatCardType[] = [
    {
      title: "Upcoming Appointments",
      value: data.upcomingAppointments.length,
      description: "Scheduled sessions",
      icon: CalendarDays,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Appointments",
      value: data.totalAppointments,
      description: "All your appointments",
      icon: CheckCircle2,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Completed Tests",
      value: data.completedTests,
      description: "Assessments finished",
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
