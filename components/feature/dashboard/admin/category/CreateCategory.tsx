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

const CreateCategory = () => {
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
        <Plus className="mr-2 h-4 w-4" />
        Create Category
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
            <DialogTitle>Create Category</DialogTitle>
          </DialogHeader>

          <CategoryForm mode="create" onClose={closeCreate} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateCategory;
