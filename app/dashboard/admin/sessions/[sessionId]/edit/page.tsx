// app/dashboard/admin/sessions/[sessionId]/edit/page.tsx

import EditSessionPage from "@/components/feature/dashboard/admin/sessions/manage-session/EditSessionPage";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

interface Props {
  params: Promise<{
    sessionId: string;
  }>;
}

const EditSession = async ({ params }: Props) => {
  const { sessionId } = await params;

  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;
  const localeValue = cookieLocale ?? defaultLocale;

  const locale: Locale = isLocale(localeValue) ? localeValue : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <EditSessionPage
      sessionId={sessionId}
      translations={{
        label: t("dashboard3.admin.sessions.editSession.label"),
        title: t("dashboard3.admin.sessions.editSession.title"),
        description: t("dashboard3.admin.sessions.editSession.description"),
        backToSessions: t(
          "dashboard3.admin.sessions.editSession.backToSessions",
        ),

        publishing: t("dashboard3.admin.sessions.publishing.publishing"),
        saving: t("dashboard3.admin.sessions.publishing.saving"),
        saveSession: t("dashboard3.admin.sessions.publishing.saveSession"),
        cancel: t("dashboard3.admin.sessions.publishing.cancel"),

        sessionDetails: t("dashboard3.admin.sessions.details.title"),
        sessionDetailsDescription: t(
          "dashboard3.admin.sessions.details.description",
        ),
        patient: t("dashboard3.admin.sessions.details.patient"),
        choosePatient: t("dashboard3.admin.sessions.details.choosePatient"),
        appointment: t("dashboard3.admin.sessions.details.appointment"),
        chooseAppointment: t(
          "dashboard3.admin.sessions.details.chooseAppointment",
        ),
        selectPatientFirst: t(
          "dashboard3.admin.sessions.details.selectPatientFirst",
        ),
        noAppointment: t("dashboard3.admin.sessions.details.noAppointment"),
        walkIn: t("dashboard3.admin.sessions.details.walkIn"),
        sessionType: t("dashboard3.admin.sessions.details.sessionType"),
        selectType: t("dashboard3.admin.sessions.details.selectType"),
        date: t("dashboard3.admin.sessions.details.date"),
        time: t("dashboard3.admin.sessions.details.time"),
        duration: t("dashboard3.admin.sessions.details.duration"),
        selectDuration: t("dashboard3.admin.sessions.details.selectDuration"),
        diagnosisEnglish: t(
          "dashboard3.admin.sessions.details.diagnosisEnglish",
        ),
        diagnosisArabic: t("dashboard3.admin.sessions.details.diagnosisArabic"),

        mood: {
          title: t("dashboard3.admin.sessions.details.mood.title"),
          veryGood: t("dashboard3.admin.sessions.details.mood.veryGood"),
          good: t("dashboard3.admin.sessions.details.mood.good"),
          neutral: t("dashboard3.admin.sessions.details.mood.neutral"),
          bad: t("dashboard3.admin.sessions.details.mood.bad"),
          veryBad: t("dashboard3.admin.sessions.details.mood.veryBad"),
        },

        attachments: {
          title: t("dashboard3.admin.sessions.attachments.title"),
          description: t("dashboard3.admin.sessions.attachments.description"),
          processing: t("dashboard3.admin.sessions.attachments.processing"),
          dragDrop: t("dashboard3.admin.sessions.attachments.dragDrop"),
          fileTypes: t("dashboard3.admin.sessions.attachments.fileTypes"),
          browseFiles: t("dashboard3.admin.sessions.attachments.browseFiles"),
          download: t("dashboard3.admin.sessions.attachments.download"),
          delete: t("dashboard3.admin.sessions.attachments.delete"),
          attachmentNotSaved: t(
            "dashboard3.admin.sessions.attachments.attachmentNotSaved",
          ),
          uploadSuccess: t(
            "dashboard3.admin.sessions.attachments.uploadSuccess",
          ),
          uploadError: t("dashboard3.admin.sessions.attachments.uploadError"),
          deleteSuccess: t(
            "dashboard3.admin.sessions.attachments.deleteSuccess",
          ),
          deleteError: t("dashboard3.admin.sessions.attachments.deleteError"),
          downloadError: t(
            "dashboard3.admin.sessions.attachments.downloadError",
          ),
        },
      }}
    />
  );
};

export default EditSession;
