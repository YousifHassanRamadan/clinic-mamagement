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

const RecentSessions = () => {
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
        <CardTitle>Recent Sessions</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <SessionItem key={session.id} session={session} />
          ))
        ) : (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No recent sessions
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentSessions;
