"use client";

import { CalendarDays, Pencil } from "lucide-react";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";

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
}

const AvailabilityList = ({ availabilities, onEdit }: Props) => {
  if (availabilities.length === 0) {
    return (
      <div className="rounded-2xl border bg-card p-6 text-center">
        <CalendarDays className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

        <p className="font-medium">No availability yet</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Create your first availability.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {availabilities.map((availability) => (
        <div
          key={availability.id}
          className="flex items-center justify-between gap-4 rounded-2xl border bg-card p-4"
        >
          <div>
            <p className="font-semibold">
              {format(new Date(availability.date), "EEEE, dd MMM yyyy")}
            </p>

            <p className="mt-1 text-sm text-muted-foreground">
              {format(new Date(availability.startTime), "HH:mm")} -{" "}
              {format(new Date(availability.endTime), "HH:mm")}
              {" • "}
              {availability.duration} min
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              {availability.slots.length} slots
            </p>
          </div>

          <Button
            type="button"
            variant="outline"
            className="rounded-xl"
            onClick={() => onEdit(availability)}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      ))}
    </div>
  );
};

export default AvailabilityList;
