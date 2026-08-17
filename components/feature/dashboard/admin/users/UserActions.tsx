"use client";

import { useState } from "react";
import {
  CheckCircle,
  Loader2,
  MoreHorizontal,
  Trash2,
  XCircle,
} from "lucide-react";

import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { deleteUser } from "@/app/actions/admin-actions/user/delete-user";
import { toggleUserApproval } from "@/app/actions/admin-actions/user/toggle-user-approval";

interface Props {
  userId: string;
  approval: boolean;
  onUpdated: () => void;
}

const UserActions = ({ userId, approval, onUpdated }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isUpdatingApproval, setIsUpdatingApproval] = useState(false);

  const handleToggleApproval = async () => {
    setIsUpdatingApproval(true);

    const result = await toggleUserApproval(userId);

    if (!result.success) {
      toast.error(result.message);
      setIsUpdatingApproval(false);
      return;
    }

    toast.success(result.message);

    setIsUpdatingApproval(false);

    onUpdated();
  };

  const handleDeleteUser = async (toastId: string | number) => {
    setIsDeleting(true);

    const result = await deleteUser(userId);

    if (!result.success) {
      setIsDeleting(false);

      toast.dismiss(toastId);
      toast.error(result.message);

      return;
    }

    toast.dismiss(toastId);
    toast.success(result.message);

    setIsDeleting(false);

    onUpdated();
  };

  const handleDelete = () => {
    toast.custom(
      (toastId) => (
        <div className="w-[360px] rounded-xl border bg-card p-4 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-destructive/10 text-destructive">
              <Trash2 className="h-4 w-4" />
            </div>

            <div className="min-w-0 flex-1">
              <p className="font-semibold">Delete user?</p>

              <p className="mt-1 text-sm text-muted-foreground">
                This action cannot be undone. All data associated with this user
                may also be deleted.
              </p>
            </div>
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              className="rounded-lg"
              disabled={isDeleting}
              onClick={() => toast.dismiss(toastId)}
            >
              Cancel
            </Button>

            <Button
              variant="destructive"
              size="sm"
              className="rounded-lg"
              disabled={isDeleting}
              onClick={() => handleDeleteUser(toastId)}
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
        </div>
      ),
      {
        duration: Infinity,
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        <DropdownMenuItem
          disabled={isUpdatingApproval}
          onClick={handleToggleApproval}
        >
          {isUpdatingApproval ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : approval ? (
            <XCircle className="mr-2 h-4 w-4" />
          ) : (
            <CheckCircle className="mr-2 h-4 w-4" />
          )}

          {approval ? "Unapprove" : "Approve"}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={handleDelete}
          className="text-destructive focus:text-destructive"
        >
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserActions;
