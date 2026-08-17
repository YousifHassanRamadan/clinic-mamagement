"use client";

import { Clock3, Info } from "lucide-react";

import { Input } from "@/components/ui/input";

interface WorkingHoursCardProps {
  startTime: string;
  endTime: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

const WorkingHoursCard = ({
  startTime,
  endTime,
  onStartChange,
  onEndChange,
}: WorkingHoursCardProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-sm font-semibold">
          3. Set working hours for this day
        </h2>

        <p className="mt-1 text-xs text-muted-foreground">
          Working hours can be different for every selected day.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium">Start time</label>

          <div className="relative">
            <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="time"
              value={startTime}
              onChange={(event) => onStartChange(event.target.value)}
              className="h-10 rounded-xl pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">End time</label>

          <div className="relative">
            <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="time"
              value={endTime}
              onChange={(event) => onEndChange(event.target.value)}
              className="h-10 rounded-xl pl-10"
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/5 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

        <p className="text-xs leading-5 text-muted-foreground">
          Time slots will be generated automatically between{" "}
          <span className="font-medium text-foreground">
            {startTime || "--:--"}
          </span>{" "}
          and{" "}
          <span className="font-medium text-foreground">
            {endTime || "--:--"}
          </span>
          .
        </p>
      </div>
    </div>
  );
};

export default WorkingHoursCard;
