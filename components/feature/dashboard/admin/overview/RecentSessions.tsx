// RecentSessions.tsx

"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import SessionItem from "./SessionItem";

import { getDashboardStats } from "@/app/actions/admin-actions/dashboard/get-dashboard-stats";

interface RecentSession {
  id: string;
  date: Date;
  duration: number;
  type: string;
  mood: string | null;
  diagnosis: string | null;
  status: string;
  fee: number;
  patient: {
    id: string;
    name: string;
    initials: string;
  };
}

interface Props {
  translations: {
    title: string;
    empty: string;
    noDiagnosis: string;
    minutes: string;
    veryBad: string;
    bad: string;
    neutral: string;
    good: string;
    veryGood: string;
  };
}

const RecentSessions = ({ translations }: Props) => {
  const [sessions, setSessions] = useState<RecentSession[]>([]);

  useEffect(() => {
    const loadSessions = async () => {
      const result = await getDashboardStats();

      if (!result.success || !result.data) return;

      setSessions(result.data.recentSessions);
    };

    loadSessions();
  }, []);

  return (
    <Card className="rounded-2xl">
      <CardHeader>
        <CardTitle>{translations.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionItem
              key={session.id}
              session={session}
              translations={translations}
            />
          ))
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            {translations.empty}
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentSessions;
