// app/.../appointments/page.tsx

import AppointmentsPage from "@/components/feature/dashboard/admin/appointments/AppointmentsPage";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

export default async function Page() {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <AppointmentsPage
      locale={locale}
      translations={{
        header: {
          eyebrow: t("appointments.page.header.eyebrow"),
          title: t("appointments.page.header.title"),
          description: t("appointments.page.header.description"),
          createAppointment: t("appointments.page.header.createAppointment"),
        },

        stats: {
          total: t("appointments.page.stats.total"),
          pending: t("appointments.page.stats.pending"),
          confirmed: t("appointments.page.stats.confirmed"),
          cancelled: t("appointments.page.stats.cancelled"),
        },

        toolbar: {
          searchPlaceholder: t("appointments.page.toolbar.searchPlaceholder"),
          filterStatus: t("appointments.page.toolbar.filterStatus"),
          allStatuses: t("appointments.page.toolbar.allStatuses"),
          pending: t("appointments.page.toolbar.pending"),
          confirmed: t("appointments.page.toolbar.confirmed"),
          cancelled: t("appointments.page.toolbar.cancelled"),
          completed: t("appointments.page.toolbar.completed"),
        },

        table: {
          loading: t("appointments.page.table.loading"),
          showing: t("appointments.page.table.showing"),
          of: t("appointments.page.table.of"),
          appointments: t("appointments.page.table.appointments"),
          patient: t("appointments.page.table.patient"),
          dateTime: t("appointments.page.table.dateTime"),
          appointment: t("appointments.page.table.appointment"),
          noAppointmentsFound: t("appointments.page.table.noAppointmentsFound"),
          changeSearchOrFilters: t(
            "appointments.page.table.changeSearchOrFilters",
          ),
        },

        actions: {
          confirm: t("appointments.page.actions.confirm"),
          reschedule: t("appointments.page.actions.reschedule"),
          cancelAppointment: t("appointments.page.actions.cancelAppointment"),
        },

        messages: {
          failedToLoad: t("appointments.page.messages.failedToLoad"),
          appointmentConfirmed: t(
            "appointments.page.messages.appointmentConfirmed",
          ),
          appointmentCancelled: t(
            "appointments.page.messages.appointmentCancelled",
          ),
          confirmationDescription: t(
            "appointments.page.messages.confirmationDescription",
          ),
          cancellationDescription: t(
            "appointments.page.messages.cancellationDescription",
          ),
          failedToUpdateStatus: t(
            "appointments.page.messages.failedToUpdateStatus",
          ),
          appointmentRescheduled: t(
            "appointments.page.messages.appointmentRescheduled",
          ),
          rescheduleDescription: t(
            "appointments.page.messages.rescheduleDescription",
          ),
        },
      }}
    />
  );
}
