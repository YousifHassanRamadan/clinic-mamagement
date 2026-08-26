"use client";

import { useEffect, useState } from "react";

import TestsToolbar from "./TestsToolbar";
import TestsTable from "./TestsTable";
import QuestionBuilder from "./QuestionBuilder";
import TestsHeader from "./TestsHeader";
import EditTestDialog from "./EditTestDialog";

import { getCategories } from "@/app/actions/admin-actions/handle-category/get-categories";

export interface TestsTranslations {
  header: {
    eyebrow: string;
    title: string;
    description: string;
    createTest: string;
  };

  toolbar: {
    searchPlaceholder: string;
    allStatuses: string;
    active: string;
    inactive: string;
    allCategories: string;
    categories: string;
  };

  form: {
    createTitle: string;
    editTitle: string;
    createDescription: string;
    editDescription: string;

    title: string;
    titlePlaceholder: string;

    titleAr: string;
    titleArPlaceholder: string;

    description: string;
    descriptionPlaceholder: string;

    descriptionAr: string;
    descriptionArPlaceholder: string;

    category: string;
    selectCategory: string;

    price: string;
    pricePlaceholder: string;
    currency: string;

    scoreRanges: string;
    scoreRangesDescription: string;
    addRange: string;

    minScore: string;
    maxScore: string;

    result: string;
    resultPlaceholder: string;

    resultAr: string;
    resultArPlaceholder: string;

    remove: string;

    active: string;
    activeDescription: string;

    cancel: string;
    creating: string;
    saving: string;

    createTest: string;
    saveChanges: string;

    close: string;
    testIdRequired: string;
    noChanges: string;
  };

  table: {
    test: string;
    category: string;
    questions: string;
    duration: string;
    status: string;
    completions: string;
    actions: string;
    updated: string;
    uncategorized: string;
    loading: string;
    empty: string;
  };

  actions: {
    edit: string;
    delete: string;
    deleting: string;
    deleteFailed: string;
    somethingWentWrong: string;
  };

  editDialog: {
    title: string;
    loading: string;
  };

  questions: {
    title: string;
    description: string;
    addQuestion: string;
    adding: string;
    selectTest: string;
    loading: string;
    empty: string;
    failedToLoad: string;
    failedToCreate: string;
  };

  question: {
    english: string;
    arabic: string;
    englishPlaceholder: string;
    arabicPlaceholder: string;
    addOption: string;
    adding: string;
    saveChanges: string;
    saving: string;
    duplicate: string;
    duplicating: string;
    delete: string;
    deleting: string;
    optionAdded: string;
    optionFailed: string;
    questionDuplicated: string;
    duplicateFailed: string;
    questionDeleted: string;
    deleteFailed: string;
    saveFailed: string;
  };
}

interface Props {
  translations: TestsTranslations;
}

interface Category {
  id: string;
  name: string;
  nameAr: string;
}

const TestsPageClient = ({ translations }: Props) => {
  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<"all" | "active" | "inactive">("all");

  const [categoryId, setCategoryId] = useState("");

  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const result = await getCategories();

        if (!result.success) {
          return;
        }

        setCategories(
          result.data.map((category) => ({
            id: category.id,
            name: category.name,
            nameAr: category.nameAr ?? "",
          })),
        );
      } catch (error) {
        console.error("LOAD_CATEGORIES_ERROR:", error);
      }
    };

    loadCategories();
  }, []);

  return (
    <div className="space-y-6">
      <TestsHeader
        translations={{
          ...translations.header,
          form: translations.form,
        }}
      />

      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <TestsToolbar
          search={search}
          status={status}
          categoryId={categoryId}
          categories={categories}
          translations={translations.toolbar}
          onSearchChange={setSearch}
          onStatusChange={setStatus}
          onCategoryChange={setCategoryId}
        />

        <TestsTable
          search={search}
          status={status}
          categoryId={categoryId}
          translations={translations.table}
        />
      </section>

      <EditTestDialog
        translations={{
          form: translations.form,
          editDialog: translations.editDialog,
        }}
      />

      <QuestionBuilder
        translations={{
          questions: translations.questions,
          question: translations.question,
        }}
      />
    </div>
  );
};

export default TestsPageClient;
