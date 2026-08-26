// components/feature/dashboard/appointment/AppointmentCard.tsx

import { CalendarDays, Clock3, ClipboardCheck } from "lucide-react";
import { cookies } from "next/headers";

import { Card } from "@/components/ui/card";

import { getDashboardStats } from "@/app/actions/admin-actions/dashboard/get-dashboard-stats";
import { getTranslations } from "@/i18n/getTranslations";

import AppointmentAction from "./AppointmentAction";

const AppointmentCard = async () => {
  const result = await getDashboardStats();

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const t = await getTranslations(locale);

  if (!result.success || !result.data) {
    return (
      <Card className="rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{t("appointment.upcoming")}</h2>

        <div className="mt-6">
          <p className="text-sm text-muted-foreground">
            {t("appointment.unableToLoad")}
          </p>
        </div>
      </Card>
    );
  }

  const appointment = result.data.upcomingAppointments[0];

  if (!appointment) {
    return (
      <Card className="rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl font-semibold">{t("appointment.upcoming")}</h2>

        <div className="mt-6 rounded-xl bg-primary/5 p-5">
          <p className="font-medium">{t("appointment.noUpcoming")}</p>

          <p className="mt-1 text-sm text-muted-foreground">
            {t("appointment.noScheduled")}
          </p>
        </div>

        <AppointmentAction />
      </Card>
    );
  }

  const appointmentDate = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      weekday: "long",
      month: "short",
      day: "numeric",
      year: "numeric",
    },
  ).format(new Date(appointment.date));

  const appointmentTime = new Intl.DateTimeFormat(
    locale === "ar" ? "ar-EG" : "en-US",
    {
      hour: "numeric",
      minute: "2-digit",
    },
  ).format(new Date(appointment.date));

  const appointmentStatus = t(
    `appointmentStatus.${appointment.status.toLowerCase()}`,
  );

  return (
    <Card className="rounded-3xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{t("appointment.upcoming")}</h2>

      <div className="mt-6 space-y-5">
        <div className="flex items-center gap-3">
          <ClipboardCheck className="text-primary" />

          <div>
            <p className="font-medium">{t("appointment.psychology")}</p>

            <p className="text-sm capitalize text-muted-foreground">
              {appointmentStatus}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <CalendarDays className="text-primary" />

          <span>{appointmentDate}</span>
        </div>

        <div className="flex items-center gap-3">
          <Clock3 className="text-primary" />

          <span>{appointmentTime}</span>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentCard;
