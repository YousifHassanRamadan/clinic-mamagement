// components/feature/dashboard/admin/sessions/manage-session/PublishingCard.tsx

"use client";

import { useRouter } from "next/navigation";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type PublishingCardProps = {
  isPending: boolean;
  onSaveDraft: () => void;
  translations: {
    publishing: string;
    saving: string;
    saveSession: string;
    cancel: string;
  };
};

const PublishingCard = ({
  isPending,
  onSaveDraft,
  translations,
}: PublishingCardProps) => {
  const router = useRouter();

  const handleCancel = () => {
    if (isPending) return;

    router.push("/dashboard/admin/sessions");
  };

  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <h2 className="text-xl font-semibold">{translations.publishing}</h2>

      <div className="space-y-3">
        <Button
          type="submit"
          disabled={isPending}
          className="w-full rounded-xl"
        >
          {isPending ? translations.saving : translations.saveSession}
        </Button>

        <Button
          type="button"
          variant="outline"
          disabled={isPending}
          className="w-full rounded-xl"
          onClick={handleCancel}
        >
          {translations.cancel}
        </Button>
      </div>
    </Card>
  );
};

export default PublishingCard;
