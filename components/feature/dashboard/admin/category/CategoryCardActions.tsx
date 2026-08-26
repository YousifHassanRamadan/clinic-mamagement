"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCategoryModalStore } from "@/store/category-modal.store";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { deleteCategory } from "@/app/actions/admin-actions/handle-category/delete-category";

interface Props {
  catId: string;

  translations: {
    edit: string;
    delete: string;
    deleting: string;
    deleteFailed: string;
    somethingWentWrong: string;
  };
}

const CategoryCardActions = ({ catId, translations }: Props) => {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const openEdit = useCategoryModalStore((state) => state.openEdit);

  const handleEditSubmit = () => {
    openEdit(catId);
  };

  const handleDeleteSubmit = async () => {
    try {
      setIsDeleting(true);

      const result = await deleteCategory(catId);

      if (!result.success) {
        toast.error(result.message || translations.deleteFailed);
        return;
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error(translations.somethingWentWrong);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="sm"
        className="rounded-xl"
        type="button"
        onClick={handleEditSubmit}
        disabled={isDeleting}
      >
        <Pencil className="mr-2 h-4 w-4" />
        {translations.edit}
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="rounded-xl text-destructive hover:text-destructive"
        type="button"
        onClick={handleDeleteSubmit}
        disabled={isDeleting}
      >
        {isDeleting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {translations.deleting}
          </>
        ) : (
          <>
            <Trash2 className="mr-2 h-4 w-4" />
            {translations.delete}
          </>
        )}
      </Button>
    </div>
  );
};

export default CategoryCardActions;
