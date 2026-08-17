"use client";

import { useFormContext } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

import type { SessionFormInput } from "@/schemas/session.schema";
import { useRouter } from "next/navigation";

type PublishingCardProps = {
  isPending: boolean;
  onSaveDraft: () => void;
};

const PublishingCard = ({ isPending, onSaveDraft }: PublishingCardProps) => {
  const { watch, setValue } = useFormContext<SessionFormInput>();

  const share = watch("shareNotes");
  const email = watch("sendSummaryEmail");
  const router = useRouter();

  const handleCancel = () => {
    router.push("/dashboard/admin/sessions");
  };

  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold">Publishing</h2>

      <div className="space-y-3">
        {/* SAVE */}

        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl"
        >
          {isPending ? "Saving..." : "Save Session"}
        </Button>

        {/* DRAFT */}

        <Button
          type="button"
          variant="secondary"
          disabled={isPending}
          onClick={onSaveDraft}
          className="w-full rounded-xl"
        >
          Save Draft
        </Button>

        {/* CANCEL */}

        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          className="w-full rounded-xl"
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </div>
    </Card>
  );
};

export default PublishingCard;
