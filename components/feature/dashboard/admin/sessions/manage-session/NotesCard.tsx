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
        <h2 className="text-xl font-semibold">
          Session Notes / ملاحظات الجلسة
        </h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Record what happened during today's session. / سجل ما حدث خلال جلسة
          اليوم.
        </p>
      </div>

      <div className="space-y-8">
        {/* PUBLIC NOTES ENGLISH */}
        <div className="space-y-2">
          <Label>Public Notes / الملاحظات العامة - English</Label>

          <Textarea
            rows={6}
            dir="ltr"
            placeholder="These notes can be shared with the patient..."
            className="resize-none rounded-xl p-3"
            {...register("publicNotes")}
          />

          {errors.publicNotes && (
            <p className="text-sm text-destructive">
              {errors.publicNotes.message}
            </p>
          )}
        </div>

        {/* PUBLIC NOTES ARABIC */}
        <div className="space-y-2">
          <Label>Public Notes / الملاحظات العامة - عربي</Label>

          <Textarea
            rows={6}
            dir="rtl"
            placeholder="يمكن مشاركة هذه الملاحظات مع المريض..."
            className="resize-none rounded-xl p-3"
            {...register("publicNotesAr")}
          />

          {errors.publicNotesAr && (
            <p className="text-sm text-destructive">
              {errors.publicNotesAr.message}
            </p>
          )}
        </div>

        {/* PRIVATE NOTES ENGLISH */}
        <div className="space-y-2">
          <Label>
            Private Clinical Notes / الملاحظات السريرية الخاصة - English
          </Label>

          <Textarea
            rows={6}
            dir="ltr"
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

        {/* PRIVATE NOTES ARABIC */}
        <div className="space-y-2">
          <Label>
            Private Clinical Notes / الملاحظات السريرية الخاصة - عربي
          </Label>

          <Textarea
            rows={6}
            dir="rtl"
            placeholder="مرئية فقط للأطباء والمعالجين..."
            className="resize-none rounded-xl p-3"
            {...register("privateClinicalNotesAr")}
          />

          {errors.privateClinicalNotesAr && (
            <p className="text-sm text-destructive">
              {errors.privateClinicalNotesAr.message}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};

export default NotesCard;
