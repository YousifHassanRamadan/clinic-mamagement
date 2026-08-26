// CreateCategory.tsx

"use client";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CategoryForm from "./category-form/CategoryForm";
import { useCategoryModalStore } from "@/store/category-modal.store";

interface Props {
  translations: {
    button: string;
    title: string;
    form: {
      name: string;
      namePlaceholder: string;
      nameAr: string;
      nameArPlaceholder: string;
      description: string;
      descriptionPlaceholder: string;
      descriptionAr: string;
      descriptionArPlaceholder: string;
      cancel: string;
      creating: string;
      saving: string;
      createCategory: string;
      saveChanges: string;
      categoryIdRequired: string;
    };
  };
}

const CreateCategory = ({ translations }: Props) => {
  const isCreateOpen = useCategoryModalStore((state) => state.isCreateOpen);

  const openCreate = useCategoryModalStore((state) => state.openCreate);

  const closeCreate = useCategoryModalStore((state) => state.closeCreate);

  return (
    <>
      <Button
        className="self-start rounded-xl lg:self-auto"
        onClick={openCreate}
        type="button"
      >
        <Plus className="mr-2 h-4 w-4 rtl:ml-2 rtl:mr-0" />
        {translations.button}
      </Button>

      <Dialog
        open={isCreateOpen}
        onOpenChange={(open) => {
          if (!open) {
            closeCreate();
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
          <DialogHeader className="text-start">
            <DialogTitle>{translations.title}</DialogTitle>
          </DialogHeader>

          <CategoryForm
            mode="create"
            onClose={closeCreate}
            translations={translations.form}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateCategory;
