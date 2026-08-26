"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useTestModalStore } from "@/store/test-modal.store";

import {
  getCategories,
  type CategoryWithCount,
} from "@/app/actions/admin-actions/handle-category/get-categories";

import { getTestById } from "@/app/actions/admin-actions/test/get-tests";

import TestFormDialog, { type TestFormTranslations } from "./TestFormDialog";

interface Props {
  translations: {
    form: TestFormTranslations;

    editDialog: {
      title: string;
      loading: string;
    };
  };
}

interface InitialData {
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  categoryId: string;
  price: number;
  isActive: boolean;

  ranges: {
    minScore: number;
    maxScore: number;
    result: string;
    resultAr: string;
  }[];
}

const getLocale = () => {
  if (typeof document === "undefined") {
    return "en";
  }

  const locale = document.cookie
    .split("; ")
    .find((row) => row.startsWith("locale="))
    ?.split("=")[1];

  return locale === "ar" ? "ar" : "en";
};

const EditTestDialog = ({ translations }: Props) => {
  const isEditOpen = useTestModalStore((state) => state.isEditOpen);

  const editingTestId = useTestModalStore((state) => state.editingTestId);

  const closeEdit = useTestModalStore((state) => state.closeEdit);

  const [categories, setCategories] = useState<CategoryWithCount[]>([]);

  const [initialData, setInitialData] = useState<InitialData | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const locale = getLocale();
  const isArabic = locale === "ar";

  useEffect(() => {
    if (!isEditOpen || !editingTestId) {
      setInitialData(null);
      return;
    }

    const fetchTest = async () => {
      setIsLoading(true);

      try {
        const [testResult, categoriesResult] = await Promise.all([
          getTestById(editingTestId),
          getCategories(),
        ]);

        if (!testResult.success || !testResult.data) {
          setInitialData(null);
          return;
        }

        setInitialData({
          title: testResult.data.title,
          titleAr: testResult.data.titleAr ?? "",
          description: testResult.data.description ?? "",
          descriptionAr: testResult.data.descriptionAr ?? "",
          categoryId: testResult.data.categoryId ?? "",
          price: Number(testResult.data.price),
          isActive: testResult.data.isActive,

          ranges: testResult.data.resultRanges.map((range) => ({
            minScore: range.minScore,
            maxScore: range.maxScore,
            result: range.result,
            resultAr: range.resultAr ?? "",
          })),
        });

        if (categoriesResult.success) {
          setCategories(categoriesResult.data);
        }
      } catch (error) {
        console.error("LOAD_TEST_FOR_EDIT_ERROR:", error);

        setInitialData(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTest();
  }, [isEditOpen, editingTestId]);

  return (
    <Dialog
      open={isEditOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeEdit();
        }
      }}
    >
      <DialogContent
        className="
          max-w-lg
          [&>button]:right-4
          rtl:[&>button]:left-4
          rtl:[&>button]:right-auto
        "
      >
        <DialogHeader className={isArabic ? "text-right" : "text-left"}>
          <DialogTitle>{translations.editDialog.title}</DialogTitle>
        </DialogHeader>

        {isLoading || !initialData ? (
          <div
            className={`py-10 text-center text-sm text-muted-foreground ${
              isArabic ? "rtl" : "ltr"
            }`}
            dir={isArabic ? "rtl" : "ltr"}
          >
            {translations.editDialog.loading}
          </div>
        ) : (
          <TestFormDialog
            mode="edit"
            testId={editingTestId ?? ""}
            open={isEditOpen}
            onOpenChange={closeEdit}
            categories={categories}
            initialData={initialData}
            translations={translations.form}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
export default EditTestDialog;
