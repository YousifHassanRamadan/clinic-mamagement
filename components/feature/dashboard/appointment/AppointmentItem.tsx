"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock3, Loader2, MapPin, XCircle } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import AppointmentStatus from "./AppointmentStatus";

import type { PatientAppointment } from "./AppointmentsPage";

import { cancelAppointment } from "@/app/actions/patient-actions/appoinments/cancel-appointment";

import enCommon from "@/locales/en/common.json";
import arCommon from "@/locales/ar/common.json";

interface Props {
  appointment: PatientAppointment;
  onAppointmentCancelled: (appointmentId: string) => void;
}

const formatAppointmentDate = (date: Date, locale: "en" | "ar") => {
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth();
  const day = date.getUTCDate();

  return new Date(Date.UTC(year, month, day)).toLocaleDateString(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      weekday: "long",
      month: "short",
      day: "2-digit",
      year: "numeric",
      timeZone: "UTC",
    },
  );
};

const formatAppointmentTime = (date: Date, locale: "en" | "ar") => {
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const tempDate = new Date(Date.UTC(1970, 0, 1, hours, minutes));

  return tempDate.toLocaleTimeString(locale === "ar" ? "ar-EG" : "en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
    timeZone: "UTC",
  });
};

const AppointmentItem = ({ appointment, onAppointmentCancelled }: Props) => {
  const [locale, setLocale] = useState<"en" | "ar">("en");
  const [isCancelling, setIsCancelling] = useState(false);

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

  const appointmentDate = new Date(appointment.date);

  const formattedDate = formatAppointmentDate(appointmentDate, locale);

  const formattedTime = formatAppointmentTime(appointmentDate, locale);

  const canCancel =
    (appointment.status === "PENDING" || appointment.status === "CONFIRMED") &&
    appointmentDate.getTime() - Date.now() >= 24 * 60 * 60 * 1000;

  const handleCancel = async () => {
    setIsCancelling(true);

    const result = await cancelAppointment(appointment.id);

    if (!result.success) {
      toast.error(result.message);
      setIsCancelling(false);
      return;
    }

    toast.success(result.message);

    onAppointmentCancelled(appointment.id);

    setIsCancelling(false);
  };

  return (
    <Card className="rounded-3xl p-6 transition hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{formattedDate}</h3>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {formattedTime}
              </span>

              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {translations.appointment.clinic}
              </span>

              {appointment.session && (
                <span>
                  {translations.appointment.duration.replace(
                    "{{duration}}",
                    String(appointment.session.duration),
                  )}
                </span>
              )}
            </div>

            {appointment.notes && (
              <p className="text-sm text-muted-foreground">
                {appointment.notes}
              </p>
            )}

            <AppointmentStatus status={appointment.status} />
          </div>
        </div>

        {canCancel && (
          <Button
            variant="destructive"
            onClick={handleCancel}
            disabled={isCancelling}
            className="w-full lg:w-auto"
          >
            {isCancelling ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <XCircle className="h-4 w-4" />
            )}

            {isCancelling ? "Cancelling..." : "Cancel Appointment"}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default AppointmentItem;
