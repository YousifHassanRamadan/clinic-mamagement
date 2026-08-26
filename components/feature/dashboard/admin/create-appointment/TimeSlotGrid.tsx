"use client";

import { Check, X } from "lucide-react";

export interface TimeSlot {
  id: string;
  time: string;
  isAvailable: boolean;
  isBooked?: boolean;
}

interface TimeSlotGridProps {
  slots: TimeSlot[];
  selectedSlots: string[];
  onToggle: (slot: string) => void;
  translations: {
    title: string;
    description: string;
    selected: string;
    available: string;
    booked: string;
    disabled: string;
    noTimeSlots: string;
    adjustWorkingHours: string;
  };
}

const formatDisplayTime = (time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  if (Number.isNaN(hours) || Number.isNaN(minutes)) {
    return time;
  }

  const period = hours >= 12 ? "PM" : "AM";
  const displayHour = hours % 12 || 12;

  return `${displayHour}:${String(minutes).padStart(2, "0")} ${period}`;
};

const TimeSlotGrid = ({
  slots,
  selectedSlots,
  onToggle,
  translations: t,
}: TimeSlotGridProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-sm font-semibold">{t.title}</h2>

            <p className="mt-1 text-xs text-muted-foreground">
              {t.description}
            </p>
          </div>

          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            {selectedSlots.length} {t.selected}
          </span>
        </div>
      </div>

      {slots.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center">
          <p className="text-sm font-medium">{t.noTimeSlots}</p>

          <p className="mt-1 text-xs text-muted-foreground">
            {t.adjustWorkingHours}
          </p>
        </div>
      ) : (
        <>
          <div className="mb-4 flex flex-wrap gap-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" />
              {t.available}
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-destructive" />
              {t.booked}
            </div>

            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border bg-muted" />
              {t.disabled}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {slots.map((slot) => {
              const isBooked = slot.isBooked === true;

              const selected =
                !isBooked &&
                slot.isAvailable &&
                selectedSlots.includes(slot.time);

              const disabled = isBooked || !slot.isAvailable;

              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={disabled}
                  onClick={() => onToggle(slot.time)}
                  className={[
                    "relative flex min-h-11 items-center justify-center gap-2 rounded-xl border px-3 text-sm font-medium transition-all",

                    isBooked
                      ? "cursor-not-allowed border-destructive/30 bg-destructive/10 text-destructive"
                      : !slot.isAvailable
                        ? "cursor-not-allowed border-border bg-muted text-muted-foreground"
                        : selected
                          ? "border-primary bg-primary text-primary-foreground shadow-sm"
                          : "border-border bg-background text-foreground hover:border-primary/40 hover:bg-primary/5",
                  ].join(" ")}
                >
                  {isBooked ? (
                    <>
                      <X className="h-4 w-4" />
                      <span>{formatDisplayTime(slot.time)}</span>
                    </>
                  ) : selected ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>{formatDisplayTime(slot.time)}</span>
                    </>
                  ) : (
                    <span>{formatDisplayTime(slot.time)}</span>
                  )}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default TimeSlotGrid;
