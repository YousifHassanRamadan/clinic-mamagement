// components/feature/dashboard/admin/sessions/SessionActions.tsx

"use client";

import { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteSession } from "@/app/actions/admin-actions/session/delete-session";

interface Translations {
  edit: string;
  delete: string;
  deleteSuccess: string;
  deleteFailed: string;
}

interface Props {
  sessionId: string;
  onDeleted?: () => void;
  translations: Translations;
}

const SessionActions = ({ sessionId, onDeleted, translations }: Props) => {
  const router = useRouter();

  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (deleting) return;

    try {
      setDeleting(true);

      const result = await deleteSession({
        sessionId,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(translations.deleteSuccess);

      onDeleted?.();
      router.refresh();
    } catch {
      toast.error(translations.deleteFailed);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      <Button
        variant="ghost"
        size="icon"
        title={translations.edit}
        onClick={() =>
          router.push(`/dashboard/admin/sessions/${sessionId}/edit`)
        }
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        title={translations.delete}
        disabled={deleting}
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SessionActions;
