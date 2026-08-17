"use client";

import { useState } from "react";
import { MoreHorizontal, Pencil, Eye, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteSession } from "@/app/actions/admin-actions/session/delete-session";

interface Props {
  sessionId: string;
  onDeleted?: () => void;
}

const SessionActions = ({ sessionId, onDeleted }: Props) => {
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

      toast.success("Session deleted successfully");

      onDeleted?.();
      router.refresh();
    } catch {
      toast.error("Failed to delete session");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex items-center justify-end gap-2">
      {/* <Button
        variant="ghost"
        size="icon"
        onClick={() => router.push(`/dashboard/admin/sessions/${sessionId}`)}
      >
        <Eye className="h-4 w-4" />
      </Button> */}

      <Button
        variant="ghost"
        size="icon"
        onClick={() =>
          router.push(`/dashboard/admin/sessions/${sessionId}/edit`)
        }
      >
        <Pencil className="h-4 w-4" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        disabled={deleting}
        onClick={handleDelete}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default SessionActions;
