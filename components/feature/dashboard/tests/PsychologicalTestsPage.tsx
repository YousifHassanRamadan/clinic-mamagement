// PsychologicalTestsPage.tsx

import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";

import PsychologicalTestsClient from "./PsychologicalTestsClient";

const PsychologicalTestsPage = async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value ?? "en";

  const t = await getTranslations(locale);

  return (
    <PsychologicalTestsClient
      locale={locale}
      translations={{
        title: t("tests.title"),
        description: t("tests.description"),
        viewResults: t("tests.viewResults"),
        all: t("tests.all"),
        noTests: t("tests.noTests"),
        loadFailed: t("tests.loadFailed"),
        questions: t("tests.questions"),
        startTest: t("tests.startTest"),
        buyNow: t("tests.buyNow"),
        noDescription: t("tests.noDescription"),
        uncategorized: t("tests.uncategorized"),
        buyMessage: t("tests.buyMessage"),
      }}
    />
  );
};

export default PsychologicalTestsPage;
