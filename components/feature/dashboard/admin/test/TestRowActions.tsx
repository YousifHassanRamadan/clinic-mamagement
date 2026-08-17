"use client";

import { deleteTest } from "@/app/actions/admin-actions/test/delete-test";
import { Button } from "@/components/ui/button";
import { useTestModalStore } from "@/store/test-modal.store";
import { Eye, Loader2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

const TestRowActions = ({ testId }: { testId: string }) => {
  const router = useRouter();

  const openEdit = useTestModalStore((state) => state.openEdit);

  const [isDeleting, setIsDeleting] = useState(false);

  const selectTest = useTestModalStore((state) => state.selectTest);

  const handleDeleteSubmit = async () => {
    if (isDeleting) return;

    setIsDeleting(true);

    const result = await deleteTest(testId);

    if (!result.success) {
      toast.error(result.message);
      setIsDeleting(false);
      return;
    }

    toast.success(result.message);
    router.refresh();
  };

  const handleEditSubmit = () => {
    openEdit(testId);
  };

  const handlePreview = () => {
    selectTest(testId);

    console.log("testId", testId);
  };

  return (
    <td className="px-4 py-4">
      <div className="flex justify-end gap-1">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg"
          title="Preview"
          disabled={isDeleting}
          onClick={handlePreview}
        >
          <Eye className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg"
          title="Edit"
          disabled={isDeleting}
          onClick={handleEditSubmit}
        >
          <Pencil className="h-4 w-4" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive"
          title="Delete"
          onClick={handleDeleteSubmit}
          disabled={isDeleting}
        >
          {isDeleting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Trash2 className="h-4 w-4" />
          )}
        </Button>
      </div>
    </td>
  );
};

export default TestRowActions;
