"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useTestModalStore } from "@/store/test-modal.store";

import TestFormDialog, { type TestFormTranslations } from "./TestFormDialog";

import {
  getCategories,
  type CategoryWithCount,
} from "@/app/actions/admin-actions/handle-category/get-categories";

interface Props {
  buttonText: string;
  translations: {
    form: TestFormTranslations;
  };
}

const CreateTestAction = ({ buttonText, translations }: Props) => {
  const openCreate = useTestModalStore((state) => state.openCreate);
  const isCreateOpen = useTestModalStore((state) => state.isCreateOpen);
  const closeCreate = useTestModalStore((state) => state.closeCreate);

  const [categories, setCategories] = useState<CategoryWithCount[]>([]);

  useEffect(() => {
    if (!isCreateOpen) return;

    const fetchCategories = async () => {
      const result = await getCategories();

      if (!result.success) {
        return;
      }

      setCategories(result.data);
    };

    fetchCategories();
  }, [isCreateOpen]);

  return (
    <>
      <Button
        className="w-full rounded-xl sm:w-auto"
        onClick={openCreate}
        type="button"
      >
        <Plus className="mr-2 h-4 w-4" />
        {buttonText}
      </Button>

      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeCreate();
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{translations.form.createTitle}</DialogTitle>
          </DialogHeader>

          <TestFormDialog
            mode="create"
            onOpenChange={closeCreate}
            categories={categories}
            open={isCreateOpen}
            translations={translations.form}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTestAction;
