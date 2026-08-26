// AppointmentsPage.tsx

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import AppointmentList from "./AppointmentList";
import AppointmentTabs from "./AppointmentTabs";

import { getMyAppointments } from "@/app/actions/patient-actions/appoinments/get-my-appointments";

import enCommon from "@/locales/en/common.json";
import arCommon from "@/locales/ar/common.json";

export interface PatientAppointment {
  id: string;
  date: Date;
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED";
  notes: string | null;
  createdAt: Date;
  updatedAt: Date;
  session: {
    id: string;
    duration: number;
  } | null;
}

const AppointmentsPage = () => {
  const [locale, setLocale] = useState<"en" | "ar">("en");

  const [appointments, setAppointments] = useState<PatientAppointment[]>([]);

  const [activeTab, setActiveTab] = useState<
    "upcoming" | "completed" | "cancelled"
  >("upcoming");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const updateLocale = () => {
      setLocale(document.documentElement.lang.startsWith("ar") ? "ar" : "en");
    };

    updateLocale();

    const observer = new MutationObserver(updateLocale);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => observer.disconnect();
  }, []);

  const translations = locale === "ar" ? arCommon : enCommon;

  useEffect(() => {
    const loadAppointments = async () => {
      const result = await getMyAppointments();

      if (!result.success) {
        toast.error(result.message);
        setLoading(false);
        return;
      }

      setAppointments(result.appointments);
      setLoading(false);
    };

    loadAppointments();
  }, []);

  const upcomingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "PENDING" || appointment.status === "CONFIRMED",
  );

  const completedAppointments = appointments.filter(
    (appointment) => appointment.status === "COMPLETED",
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "CANCELLED",
  );

  const filteredAppointments =
    activeTab === "upcoming"
      ? upcomingAppointments
      : activeTab === "completed"
        ? completedAppointments
        : cancelledAppointments;

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">
            {translations.appointmentsPage.title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {translations.appointmentsPage.description}
          </p>
        </div>

        <div className="rounded-3xl border p-6 text-muted-foreground">
          {translations.appointmentsPage.loading}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            {translations.appointmentsPage.title}
          </h1>

          <p className="mt-2 text-muted-foreground">
            {translations.appointmentsPage.description}
          </p>
        </div>
      </div>

      <AppointmentTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        upcomingCount={upcomingAppointments.length}
        completedCount={completedAppointments.length}
        cancelledCount={cancelledAppointments.length}
      />

      <AppointmentList appointments={filteredAppointments} />
    </div>
  );
};

export default AppointmentsPage;
