import TestResultDetailsPage from "@/components/feature/dashboard/admin/test-results/TestResultDetailsPage";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

import { getTranslations } from "@/i18n/getTranslations";

interface Props {
  params: Promise<{
    patientTestId: string;
  }>;
}

const AdminTestResultDetailsPage = async ({ params }: Props) => {
  const { patientTestId } = await params;

  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <TestResultDetailsPage
      patientTestId={patientTestId}
      locale={locale}
      translations={{
        back: t("dashboard4.admin.testResults.details.back"),

        header: {
          label: t("dashboard4.admin.testResults.details.header.label"),
          title: t("dashboard4.admin.testResults.details.header.title"),
        },

        patient: {
          title: t("dashboard4.admin.testResults.details.patient.title"),
          email: t("dashboard4.admin.testResults.details.patient.email"),
          phone: t("dashboard4.admin.testResults.details.patient.phone"),
        },

        test: {
          title: t("dashboard4.admin.testResults.details.test.title"),
          description: t(
            "dashboard4.admin.testResults.details.test.description",
          ),
        },

        result: {
          title: t("dashboard4.admin.testResults.details.result.title"),
          status: t("dashboard4.admin.testResults.details.result.status"),
          score: t("dashboard4.admin.testResults.details.result.score"),
          result: t("dashboard4.admin.testResults.details.result.result"),
          completedAt: t(
            "dashboard4.admin.testResults.details.result.completedAt",
          ),
          inProgress: t(
            "dashboard4.admin.testResults.details.result.inProgress",
          ),
          notStarted: t(
            "dashboard4.admin.testResults.details.result.notStarted",
          ),
          completed: t("dashboard4.admin.testResults.details.result.completed"),
        },

        answers: {
          title: t("dashboard4.admin.testResults.details.answers.title"),
          question: t("dashboard4.admin.testResults.details.answers.question"),
          selectedAnswer: t(
            "dashboard4.admin.testResults.details.answers.selectedAnswer",
          ),
          points: t("dashboard4.admin.testResults.details.answers.points"),
          empty: t("dashboard4.admin.testResults.details.answers.empty"),
        },

        loading: t("dashboard4.admin.testResults.details.loading"),
        error: t("dashboard4.admin.testResults.details.error"),
      }}
    />
  );
};

export default AdminTestResultDetailsPage;
