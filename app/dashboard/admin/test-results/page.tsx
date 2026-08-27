import TestResultsPage from "@/components/feature/dashboard/admin/test-results/TestResultsPage";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

import { getTranslations } from "@/i18n/getTranslations";

const AdminTestResultsPage = async () => {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <TestResultsPage
      locale={locale}
      translations={{
        header: {
          label: t("dashboard4.admin.testResults.header.label"),
          title: t("dashboard4.admin.testResults.header.title"),
          description: t("dashboard4.admin.testResults.header.description"),
        },

        search: {
          placeholder: t("dashboard4.admin.testResults.search.placeholder"),
        },

        table: {
          patient: t("dashboard4.admin.testResults.table.patient"),
          test: t("dashboard4.admin.testResults.table.test"),
          status: t("dashboard4.admin.testResults.table.status"),
          score: t("dashboard4.admin.testResults.table.score"),
          result: t("dashboard4.admin.testResults.table.result"),
          answers: t("dashboard4.admin.testResults.table.answers"),
          date: t("dashboard4.admin.testResults.table.date"),
          actions: t("dashboard4.admin.testResults.table.actions"),
          view: t("dashboard4.admin.testResults.table.view"),
          loading: t("dashboard4.admin.testResults.table.loading"),
          empty: t("dashboard4.admin.testResults.table.empty"),
        },

        status: {
          notStarted: t("dashboard4.admin.testResults.status.notStarted"),
          inProgress: t("dashboard4.admin.testResults.status.inProgress"),
          completed: t("dashboard4.admin.testResults.status.completed"),
        },
      }}
    />
  );
};

export default AdminTestResultsPage;
