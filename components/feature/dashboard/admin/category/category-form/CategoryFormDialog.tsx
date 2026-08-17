"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import CategoryForm from "./CategoryForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode: "create" | "edit";

  defaultValues?: {
    name: string;
    description: string;
  };
}

const CategoryFormDialog = ({
  open,
  onOpenChange,
  mode,
  defaultValues,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="rounded-2xl sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {mode === "create" ? "Create Category" : "Edit Category"}
          </DialogTitle>

          <DialogDescription>
            Categories help organize psychological assessments.
          </DialogDescription>
        </DialogHeader>

        <CategoryForm
          mode={mode}
          defaultValues={defaultValues}
          onClose={() => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
};

export default CategoryFormDialog;
