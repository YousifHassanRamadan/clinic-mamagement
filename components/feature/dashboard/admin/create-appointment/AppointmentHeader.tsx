"use client";

import { CalendarDays, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface AppointmentHeaderProps {
  onCalendar?: () => void;
  onRecurring?: () => void;
}

const AppointmentHeader = ({
  onCalendar,
  onRecurring,
}: AppointmentHeaderProps) => {
  return (
    <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Scheduling
        </p>

        <h1 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
          Create appointment
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Add your available time slots for patients to book.
        </p>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <Button
          type="button"
          variant="outline"
          onClick={onCalendar}
          className="rounded-xl"
        >
          <CalendarDays className="mr-2 h-4 w-4" />
          View my calendar
        </Button>

        <Button
          type="button"
          onClick={onRecurring}
          className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add recurring availability
        </Button>
      </div>
    </div>
  );
};

export default AppointmentHeader;
