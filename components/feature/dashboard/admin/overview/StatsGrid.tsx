// StatsGrid.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { CalendarDays, ClipboardList, Users } from "lucide-react";

import StatCard from "./StatCard";

import { getDashboardStats } from "@/app/actions/admin-actions/dashboard/get-dashboard-stats";

interface Props {
  translations: {
    patients: string;
    patientsSubtitle: string;
    sessions: string;
    sessionsSubtitle: string;
    tests: string;
    testsSubtitle: string;
  };
}

const StatsGrid = ({ translations }: Props) => {
  const [dashboardStats, setDashboardStats] = useState({
    patients: 0,
    sessions: 0,
    tests: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      const result = await getDashboardStats();

      if (!result.success || !result.data) return;

      setDashboardStats({
        patients: result.data.patients,
        sessions: result.data.sessions,
        tests: result.data.tests,
      });
    };

    loadStats();
  }, []);

  const stats = useMemo(
    () => [
      {
        key: "patients",
        title: translations.patients,
        subtitle: translations.patientsSubtitle,
        count: dashboardStats.patients,
        icon: Users,
      },
      {
        key: "sessions",
        title: translations.sessions,
        subtitle: translations.sessionsSubtitle,
        count: dashboardStats.sessions,
        icon: CalendarDays,
      },
      {
        key: "tests",
        title: translations.tests,
        subtitle: translations.testsSubtitle,
        count: dashboardStats.tests,
        icon: ClipboardList,
      },
    ],
    [dashboardStats, translations],
  );

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.key} stat={stat} />
      ))}
    </section>
  );
};

export default StatsGrid;
