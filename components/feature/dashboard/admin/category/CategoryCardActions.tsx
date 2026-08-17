"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCategoryModalStore } from "@/store/category-modal.store";
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { deleteCategory } from "@/app/actions/admin-actions/handle-category/delete-category";

const CategoryCardActions = ({ catId }: { catId: string }) => {
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
        toast.error(result.message || "Failed to delete category");
        return;
      }

      toast.success(result.message);

      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
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
        Edit
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
            Deleting...
          </>
        ) : (
          <>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </>
        )}
      </Button>
    </div>
  );
};

export default CategoryCardActions;
