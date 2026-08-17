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
  CategoryWithCount,
  getCategories,
} from "@/app/actions/admin-actions/handle-category/get-categories";

import { getTestById } from "@/app/actions/admin-actions/test/get-tests";

import TestFormDialog from "./TestFormDialog";

const EditTestDialog = () => {
  const isEditOpen = useTestModalStore((state) => state.isEditOpen);

  const editingTestId = useTestModalStore((state) => state.editingTestId);

  const closeEdit = useTestModalStore((state) => state.closeEdit);

  const [categories, setCategories] = useState<CategoryWithCount[]>([]);

  const [initialData, setInitialData] = useState<{
    title: string;
    description: string;
    categoryId: string;
    isActive: boolean;
  } | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isEditOpen || !editingTestId) {
      return;
    }

    const fetchTest = async () => {
      setIsLoading(true);

      const [testResult, categoriesResult] = await Promise.all([
        getTestById(editingTestId),
        getCategories(),
      ]);

      if (!testResult.success || !testResult.data) {
        setIsLoading(false);
        return;
      }

      setInitialData({
        title: testResult.data.title,
        description: testResult.data.description ?? "",
        categoryId: testResult.data.categoryId ?? "",
        isActive: testResult.data.isActive,
      });

      if (categoriesResult.success) {
        setCategories(categoriesResult.data);
      }

      setIsLoading(false);
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Test</DialogTitle>
        </DialogHeader>

        {isLoading || !initialData ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            Loading test...
          </div>
        ) : (
          <TestFormDialog
            mode="edit"
            testId={editingTestId ?? ""}
            open={isEditOpen}
            onOpenChange={closeEdit}
            categories={categories}
            initialData={initialData}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EditTestDialog;
