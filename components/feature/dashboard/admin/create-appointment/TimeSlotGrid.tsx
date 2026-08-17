"use client";

import { Check } from "lucide-react";

interface TimeSlotGridProps {
  slots: string[];
  selectedSlots: string[];
  onToggle: (slot: string) => void;
}

const TimeSlotGrid = ({
  slots,
  selectedSlots,
  onToggle,
}: TimeSlotGridProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">5. Available time slots</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Select the times patients can book.
            </p>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {selectedSlots.length} selected
          </span>
        </div>
      </div>

      {slots.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-sm font-medium">No time slots available</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Adjust your working hours or session duration.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {slots.map((slot) => {
            const selected = selectedSlots.includes(slot);

            return (
              <button
                key={slot}
                type="button"
                onClick={() => onToggle(slot)}
                className={[
                  "flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition-all",
                  selected
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5",
                ].join(" ")}
              >
                {selected && <Check className="h-4 w-4" />}

                {slot}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TimeSlotGrid;
