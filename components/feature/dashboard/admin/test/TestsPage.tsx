import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";
import TestsPageClient from "./TestsPageClient";

const TestsPage = async () => {
  const cookieStore = await cookies();

  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  const t = await getTranslations(locale);

  const translations = {
    header: {
      eyebrow: t("tests2.version2.header.eyebrow"),
      title: t("tests2.version2.header.title"),
      description: t("tests2.version2.header.description"),
      createTest: t("tests2.version2.header.createTest"),
    },

    toolbar: {
      searchPlaceholder: t("tests2.version2.toolbar.searchPlaceholder"),
      allStatuses: t("tests2.version2.toolbar.allStatuses"),
      active: t("tests2.version2.toolbar.active"),
      inactive: t("tests2.version2.toolbar.inactive"),
      allCategories: t("tests2.version2.toolbar.allCategories"),
      categories: t("tests2.version2.toolbar.categories"),
    },

    form: {
      createTitle: t("tests2.version2.form.createTitle"),
      editTitle: t("tests2.version2.form.editTitle"),
      createDescription: t("tests2.version2.form.createDescription"),
      editDescription: t("tests2.version2.form.editDescription"),
      title: t("tests2.version2.form.title"),
      titlePlaceholder: t("tests2.version2.form.titlePlaceholder"),
      titleAr: t("tests2.version2.form.titleAr"),
      titleArPlaceholder: t("tests2.version2.form.titleArPlaceholder"),
      description: t("tests2.version2.form.description"),
      descriptionPlaceholder: t("tests2.version2.form.descriptionPlaceholder"),
      descriptionAr: t("tests2.version2.form.descriptionAr"),
      descriptionArPlaceholder: t(
        "tests2.version2.form.descriptionArPlaceholder",
      ),
      category: t("tests2.version2.form.category"),
      selectCategory: t("tests2.version2.form.selectCategory"),
      price: t("tests2.version2.form.price"),
      pricePlaceholder: t("tests2.version2.form.pricePlaceholder"),
      currency: t("tests2.version2.form.currency"),
      scoreRanges: t("tests2.version2.form.scoreRanges"),
      scoreRangesDescription: t("tests2.version2.form.scoreRangesDescription"),
      addRange: t("tests2.version2.form.addRange"),
      minScore: t("tests2.version2.form.minScore"),
      maxScore: t("tests2.version2.form.maxScore"),
      result: t("tests2.version2.form.result"),
      resultPlaceholder: t("tests2.version2.form.resultPlaceholder"),
      resultAr: t("tests2.version2.form.resultAr"),
      resultArPlaceholder: t("tests2.version2.form.resultArPlaceholder"),
      remove: t("tests2.version2.form.remove"),
      active: t("tests2.version2.form.active"),
      activeDescription: t("tests2.version2.form.activeDescription"),
      cancel: t("tests2.version2.form.cancel"),
      creating: t("tests2.version2.form.creating"),
      saving: t("tests2.version2.form.saving"),
      createTest: t("tests2.version2.form.createTest"),
      saveChanges: t("tests2.version2.form.saveChanges"),
      close: t("tests2.version2.form.close"),
      testIdRequired: t("tests2.version2.form.testIdRequired"),
      noChanges: t("tests2.version2.form.noChanges"),
    },

    table: {
      test: t("tests2.version2.table.test"),
      category: t("tests2.version2.table.category"),
      questions: t("tests2.version2.table.questions"),
      duration: t("tests2.version2.table.duration"),
      status: t("tests2.version2.table.status"),
      completions: t("tests2.version2.table.completions"),
      actions: t("tests2.version2.table.actions"),
      updated: t("tests2.version2.table.updated"),
      uncategorized: t("tests2.version2.table.uncategorized"),
      loading: t("tests2.version2.table.loading"),
      empty: t("tests2.version2.table.empty"),
    },

    actions: {
      edit: t("tests2.version2.actions.edit"),
      delete: t("tests2.version2.actions.delete"),
      deleting: t("tests2.version2.actions.deleting"),
      deleteFailed: t("tests2.version2.actions.deleteFailed"),
      somethingWentWrong: t("tests2.version2.actions.somethingWentWrong"),
    },

    editDialog: {
      title: t("tests2.version2.editDialog.title"),
      loading: t("tests2.version2.editDialog.loading"),
    },

    questions: {
      title: t("tests2.version2.questions.title"),
      description: t("tests2.version2.questions.description"),
      addQuestion: t("tests2.version2.questions.addQuestion"),
      adding: t("tests2.version2.questions.adding"),
      selectTest: t("tests2.version2.questions.selectTest"),
      loading: t("tests2.version2.questions.loading"),
      empty: t("tests2.version2.questions.empty"),
      failedToLoad: t("tests2.version2.questions.failedToLoad"),
      failedToCreate: t("tests2.version2.questions.failedToCreate"),
    },

    question: {
      english: t("tests2.version2.question.english"),
      arabic: t("tests2.version2.question.arabic"),
      englishPlaceholder: t("tests2.version2.question.englishPlaceholder"),
      arabicPlaceholder: t("tests2.version2.question.arabicPlaceholder"),
      addOption: t("tests2.version2.question.addOption"),
      adding: t("tests2.version2.question.adding"),
      saveChanges: t("tests2.version2.question.saveChanges"),
      saving: t("tests2.version2.question.saving"),
      duplicate: t("tests2.version2.question.duplicate"),
      duplicating: t("tests2.version2.question.duplicating"),
      delete: t("tests2.version2.question.delete"),
      deleting: t("tests2.version2.question.deleting"),
      optionAdded: t("tests2.version2.question.optionAdded"),
      optionFailed: t("tests2.version2.question.optionFailed"),
      questionDuplicated: t("tests2.version2.question.questionDuplicated"),
      duplicateFailed: t("tests2.version2.question.duplicateFailed"),
      questionDeleted: t("tests2.version2.question.questionDeleted"),
      deleteFailed: t("tests2.version2.question.deleteFailed"),
      saveFailed: t("tests2.version2.question.saveFailed"),
    },
  };

  return <TestsPageClient translations={translations} />;
};

export default TestsPage;
