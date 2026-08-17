"use client";

import { useFormContext } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import type { SessionFormInput } from "@/schemas/session.schema";

const NotesCard = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<SessionFormInput>();

  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Session Notes</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Record what happened during today's session.
        </p>
      </div>

      <div className="space-y-6">
        {/* PUBLIC NOTES */}

        <div className="space-y-2">
          <Label>Public Notes</Label>

          <Textarea
            rows={6}
            placeholder="These notes can be shared with the patient... "
            className="resize-none rounded-xl px-2"
            {...register("publicNotes")}
          />

          {errors.publicNotes && (
            <p className="text-sm text-destructive">
              {errors.publicNotes.message}
            </p>
          )}
        </div>

        {/* PRIVATE NOTES */}

        <div className="space-y-2">
          <Label>Private Clinical Notes</Label>

          <Textarea
            rows={6}
            placeholder="Visible only to clinicians..."
            className="resize-none rounded-xl p-3"
            {...register("privateClinicalNotes")}
          />

          {errors.privateClinicalNotes && (
            <p className="text-sm text-destructive">
              {errors.privateClinicalNotes.message}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NotesCard;
