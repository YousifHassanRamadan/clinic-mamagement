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

const UpdateCategory = () => {
  const isEditOpen = useCategoryModalStore((state) => state.isEditOpen);

  const closeEdit = useCategoryModalStore((state) => state.closeEdit);

  const editingCategoryId = useCategoryModalStore(
    (state) => state.editingCategoryId,
  );

  const [category, setCategory] = useState<{
    id: string;
    name: string;
    description: string | null;
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
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Category</DialogTitle>
        </DialogHeader>

        {category && (
          <CategoryForm
            mode="edit"
            categoryId={category.id}
            defaultValues={{
              name: category.name,
              description: category.description ?? "",
            }}
            onClose={closeEdit}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default UpdateCategory;
