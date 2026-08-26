// UpdateCategory.tsx

"use client";

import { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { useCategoryModalStore } from "@/store/category-modal.store";
import CategoryForm from "./category-form/CategoryForm";

import { getCategoryById } from "@/app/actions/admin-actions/handle-category/get-categories";

interface Props {
  translations: {
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

const UpdateCategory = ({ translations }: Props) => {
  const isEditOpen = useCategoryModalStore((state) => state.isEditOpen);

  const closeEdit = useCategoryModalStore((state) => state.closeEdit);

  const editingCategoryId = useCategoryModalStore(
    (state) => state.editingCategoryId,
  );

  const [category, setCategory] = useState<{
    id: string;
    name: string;
    nameAr: string | null;
    description: string | null;
    descriptionAr: string | null;
  } | null>(null);

  useEffect(() => {
    if (!isEditOpen || !editingCategoryId) return;

    const fetchCategory = async () => {
      const result = await getCategoryById(editingCategoryId);

      if (!result.success) {
        console.error(result.message);
        return;
      }

      setCategory(result.data);
    };

    fetchCategory();
  }, [isEditOpen, editingCategoryId]);

  return (
    <Dialog
      open={isEditOpen}
      onOpenChange={(open) => {
        if (!open) {
          closeEdit();
          setCategory(null);
        }
      }}
    >
      <DialogContent
        className="
          max-w-lg
          [&>button]:right-4
          [&>button]:left-auto
          rtl:[&>button]:right-auto
          rtl:[&>button]:left-4
        "
      >
        <DialogHeader
          className="
            pr-10
            rtl:pr-0
            rtl:pl-10
          "
        >
          <DialogTitle>{translations.title}</DialogTitle>
        </DialogHeader>

        {category && (
          <CategoryForm
            mode="edit"
            categoryId={category.id}
            defaultValues={{
              name: category.name,
              nameAr: category.nameAr ?? "",
              description: category.description ?? "",
              descriptionAr: category.descriptionAr ?? "",
            }}
            translations={translations.form}
            onClose={() => {
              closeEdit();
              setCategory(null);
            }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategory;
