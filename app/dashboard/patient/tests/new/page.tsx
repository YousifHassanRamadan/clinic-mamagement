import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";
import TakeTestPage from "@/components/feature/dashboard/take-test/TakeTestPage";

const Page = async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  const t = await getTranslations(locale);

  const translations = {
    noTestSelected: t("tests4.take.noTestSelected"),
    answerAllQuestions: t("tests4.take.answerAllQuestions"),
    patientTestIdMissing: t("tests4.take.patientTestIdMissing"),
    submitError: t("tests4.take.submitError"),
    unableToLoad: t("tests4.take.unableToLoad"),
    defaultDescription: t("tests4.take.defaultDescription"),

    question: t("tests4.take.progress.question"),
    of: t("tests4.take.progress.of"),
    complete: t("tests4.take.progress.complete"),

    navigation: {
      previous: t("tests4.take.navigation.previous"),
      next: t("tests4.take.navigation.next"),
      finish: t("tests4.take.navigation.finish"),
      submitting: t("tests4.take.navigation.submitting"),
    },
  };

  return <TakeTestPage locale={locale} translations={translations} />;
};

export default Page;
