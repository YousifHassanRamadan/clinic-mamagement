"use client";

import { Repeat2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

const days = [
  { id: "monday", label: "Monday" },
  { id: "tuesday", label: "Tuesday" },
  { id: "wednesday", label: "Wednesday" },
  { id: "thursday", label: "Thursday" },
  { id: "friday", label: "Friday" },
  { id: "saturday", label: "Saturday" },
  { id: "sunday", label: "Sunday" },
];

const RecurringAvailabilityCard = () => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Repeat2 className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">Repeat this availability</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Use the same working hours on multiple days.
          </p>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {days.map((day) => (
          <label
            key={day.id}
            className="flex cursor-pointer items-center gap-2 rounded-xl border p-3 transition hover:bg-muted/50"
          >
            <Checkbox />

            <span className="text-xs font-medium">{day.label}</span>
          </label>
        ))}
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-4 w-full rounded-xl"
      >
        Apply recurring availability
      </Button>
    </div>
  );
};

export default RecurringAvailabilityCard;
