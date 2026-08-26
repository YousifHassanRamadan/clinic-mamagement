// app/dashboard/admin/sessions/page.tsx

import SessionsPage from "@/components/feature/dashboard/admin/sessions/SessionsPage";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

import { getTranslations } from "@/i18n/getTranslations";

const AllSessionsPage = async () => {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <SessionsPage
      translations={{
        header: {
          label: t("sessions.page.header.label"),
          title: t("sessions.page.header.title"),
          description: t("sessions.page.header.description"),
        },

        addSession: t("sessions.page.addSession"),

        toolbar: {
          searchPlaceholder: t("sessions.page.toolbar.searchPlaceholder"),
          status: t("sessions.page.toolbar.status"),
          allStatuses: t("sessions.page.toolbar.allStatuses"),
          completed: t("sessions.page.toolbar.completed"),
          scheduled: t("sessions.page.toolbar.scheduled"),
          draft: t("sessions.page.toolbar.draft"),
          cancelled: t("sessions.page.toolbar.cancelled"),
          noShow: t("sessions.page.toolbar.noShow"),
          type: t("sessions.page.toolbar.type"),
          allTypes: t("sessions.page.toolbar.allTypes"),
          initialSession: t("sessions.page.toolbar.initialSession"),
          followUp: t("sessions.page.toolbar.followUp"),
          individual: t("sessions.page.toolbar.individual"),
          emergency: t("sessions.page.toolbar.emergency"),
          other: t("sessions.page.toolbar.other"),
        },

        table: {
          patient: t("sessions.page.table.patient"),
          status: t("sessions.page.table.status"),
          date: t("sessions.page.table.date"),
          duration: t("sessions.page.table.duration"),
          mood: t("sessions.page.table.mood"),
          sessionType: t("sessions.page.table.sessionType"),
          actions: t("sessions.page.table.actions"),
          loading: t("sessions.page.table.loading"),
          noSessions: t("sessions.page.table.noSessions"),
          minutes: t("sessions.page.table.minutes"),
        },

        actions: {
          edit: t("sessions.page.actions.edit"),
          delete: t("sessions.page.actions.delete"),
          deleteSuccess: t("sessions.page.actions.deleteSuccess"),
          deleteFailed: t("sessions.page.actions.deleteFailed"),
        },
      }}
    />
  );
};

export default AllSessionsPage;
