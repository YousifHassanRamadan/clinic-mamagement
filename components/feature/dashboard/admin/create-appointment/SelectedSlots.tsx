"use client";

import { CheckCircle2, X } from "lucide-react";

interface SelectedSlotsProps {
  slots: string[];
  onRemove: (slot: string) => void;
}

const SelectedSlots = ({ slots, onRemove }: SelectedSlotsProps) => {
  if (slots.length === 0) {
    return null;
  }

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-2">
        <CheckCircle2 className="h-4 w-4 text-primary" />

        <h2 className="text-sm font-semibold">Selected availability</h2>
      </div>

      <div className="flex flex-wrap gap-2">
        {slots.map((slot) => (
          <div
            key={slot}
            className="flex items-center gap-2 rounded-full border bg-primary/5 px-3 py-1.5 text-xs font-medium text-primary"
          >
            {slot}

            <button
              type="button"
              onClick={() => onRemove(slot)}
              className="rounded-full p-0.5 hover:bg-primary/10"
              aria-label={`Remove ${slot}`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedSlots;
