"use client";

import { useEffect, useState } from "react";

import AppointmentItem from "./AppointmentItem";

import type { PatientAppointment } from "./AppointmentsPage";

import enCommon from "@/locales/en/common.json";
import arCommon from "@/locales/ar/common.json";

interface Props {
  appointments: PatientAppointment[];
  onAppointmentCancelled: (appointmentId: string) => void;
}

const AppointmentList = ({ appointments, onAppointmentCancelled }: Props) => {
  const [locale, setLocale] = useState<"en" | "ar">("en");

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

  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl border p-10 text-center">
        <p className="text-muted-foreground">
          {translations.appointmentsPage.noAppointments}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {appointments.map((appointment) => (
        <AppointmentItem
          key={appointment.id}
          appointment={appointment}
          onAppointmentCancelled={onAppointmentCancelled}
        />
      ))}
    </div>
  );
};

export default AppointmentList;
