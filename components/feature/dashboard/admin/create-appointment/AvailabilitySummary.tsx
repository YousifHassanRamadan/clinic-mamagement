"use client";

import { CalendarDays, Clock3, Timer } from "lucide-react";
import { format } from "date-fns";

interface AvailabilitySummaryProps {
  date: Date;
  startTime: string;
  endTime: string;
  duration: number;
  selectedSlots: number;
}

const AvailabilitySummary = ({
  date,
  startTime,
  endTime,
  duration,
  selectedSlots,
}: AvailabilitySummaryProps) => {
  return (
    <div className="rounded-2xl border bg-primary/5 p-5">
      <div className="mb-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-primary">
          Availability summary
        </p>

        <h2 className="mt-1 text-base font-semibold">
          {format(date, "EEEE, dd MMMM")}
        </h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock3 className="h-4 w-4" />
            <span className="text-xs">Working hours</span>
          </div>

          <span className="text-xs font-medium">
            {startTime} – {endTime}
          </span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Timer className="h-4 w-4" />
            <span className="text-xs">Session duration</span>
          </div>

          <span className="text-xs font-medium">{duration} min</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span className="text-xs">Available slots</span>
          </div>

          <span className="text-xs font-semibold text-primary">
            {selectedSlots}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySummary;
