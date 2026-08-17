"use client";

import { useEffect, useMemo, useState } from "react";

import { Users, CalendarDays, ClipboardList } from "lucide-react";

import StatCard from "./StatCard";

import { getDashboardStats } from "@/app/actions/admin-actions/dashboard/get-dashboard-stats";

const StatsGrid = () => {
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
        title: "Patients",
        subtitle: "Total registered patients",
        count: dashboardStats.patients,
        icon: Users,
      },
      {
        key: "sessions",
        title: "Sessions",
        subtitle: "Total clinic sessions",
        count: dashboardStats.sessions,
        icon: CalendarDays,
      },
      {
        key: "tests",
        title: "Tests",
        subtitle: "Total psychological tests",
        count: dashboardStats.tests,
        icon: ClipboardList,
      },
    ],
    [dashboardStats],
  );

  console.log("dashboardStats:", dashboardStats);
  console.log("stats:", stats);

  return (
    <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {stats.map((stat) => (
        <StatCard key={stat.key} stat={stat} />
      ))}
    </section>
  );
};

export default StatsGrid;
