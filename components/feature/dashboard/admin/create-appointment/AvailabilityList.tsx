// AvailabilityList.tsx

"use client";

import { useState } from "react";
import { CalendarDays, Pencil, Trash2, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { ar, enUS } from "date-fns/locale";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { deleteAvailability } from "@/app/actions/admin-actions/appointment/delete-availability";

interface AvailabilitySlot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface Availability {
  id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  slots: AvailabilitySlot[];
}

interface Props {
  availabilities: Availability[];
  onEdit: (availability: Availability) => void;
  locale: "en" | "ar";
  translations: {
    noAvailability: string;
    createFirst: string;
    slots: string;
    edit: string;
  };
}

const AvailabilityList = ({
  availabilities,
  onEdit,
  locale,
  translations: t,
}: Props) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const dateLocale = locale === "ar" ? ar : enUS;

  const handleDelete = async (availabilityId: string) => {
    if (deletingId) return;

    setDeletingId(availabilityId);

    try {
      const result = await deleteAvailability(availabilityId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      window.location.reload();
    } catch (error) {
      console.error("DELETE_AVAILABILITY_CLIENT_ERROR:", error);
      toast.error(
        locale === "ar" ? "فشل حذف الإتاحة" : "Failed to delete availability",
      );
    } finally {
      setDeletingId(null);
    }
  };

  if (availabilities.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center">
        <CalendarDays className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

        <p className="font-medium">{t.noAvailability}</p>

        <p className="mt-1 text-sm text-muted-foreground">{t.createFirst}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {availabilities.map((availability) => {
        const isDeleting = deletingId === availability.id;

        return (
          <div
            key={availability.id}
            className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-4"
          >
            <div>
              <p className="font-semibold">
                {format(new Date(availability.date), "EEEE, dd MMM yyyy", {
                  locale: dateLocale,
                })}
              </p>

              <p className="mt-1 text-sm text-muted-foreground">
                {format(new Date(availability.startTime), "HH:mm")} -{" "}
                {format(new Date(availability.endTime), "HH:mm")}
                {" • "}
                {availability.duration} {locale === "ar" ? "دقيقة" : "min"}
              </p>

              {/* <p className="mt-1 text-xs text-muted-foreground">
                {availability.slots.length} {t.slots}
              </p> */}
            </div>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                disabled={isDeleting}
                onClick={() => onEdit(availability)}
              >
                <Pencil
                  className={`h-4 w-4 ${locale === "ar" ? "ml-2" : "mr-2"}`}
                />
                {t.edit}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="icon"
                disabled={deletingId !== null}
                onClick={() => handleDelete(availability.id)}
                className="h-10 w-10 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive"
              >
                {isDeleting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Trash2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AvailabilityList;
