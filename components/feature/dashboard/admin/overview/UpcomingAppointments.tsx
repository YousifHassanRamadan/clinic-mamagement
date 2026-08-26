// UpcomingAppointments.tsx

"use client";

import { useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import AppointmentItem from "./AppointmentItem";

import { getDashboardStats } from "@/app/actions/admin-actions/dashboard/get-dashboard-stats";

interface UpcomingAppointment {
  id: string;
  patient: string;
  date: Date;
  time: string;
  status: string;
  type: string;
  duration: string;
}

interface Props {
  translations: {
    title: string;
    empty: string;
  };
}

const UpcomingAppointments = ({ translations }: Props) => {
  const [appointments, setAppointments] = useState<UpcomingAppointment[]>([]);

  useEffect(() => {
    const loadAppointments = async () => {
      const result = await getDashboardStats();

      if (!result.success || !result.data) return;

      setAppointments(result.data.upcomingAppointments);
    };

    loadAppointments();
  }, []);

  return (
    <Card className="h-fit rounded-2xl">
      <CardHeader>
        <CardTitle>{translations.title}</CardTitle>
      </CardHeader>

      <CardContent className="space-y-3">
        {appointments.length > 0 ? (
          appointments.map((appointment) => (
            <AppointmentItem key={appointment.id} appointment={appointment} />
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

export default UpcomingAppointments;
