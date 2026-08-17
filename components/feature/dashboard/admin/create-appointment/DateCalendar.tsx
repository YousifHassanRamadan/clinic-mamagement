"use client";

import { CalendarDays } from "lucide-react";
import { format } from "date-fns";

import { Calendar } from "@/components/ui/calendar";

interface DateCalendarProps {
  date: Date;
  onDateChange: (date: Date) => void;
}

const DateCalendar = ({ date, onDateChange }: DateCalendarProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-4 flex items-start gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <CalendarDays className="h-5 w-5" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">1. Select a date</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Choose the day you want to configure.
          </p>
        </div>
      </div>

      <div className="flex justify-center rounded-xl border bg-background p-2">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(selectedDate) => {
            if (selectedDate) {
              onDateChange(selectedDate);
            }
          }}
        />
      </div>

      <div className="mt-4 rounded-xl bg-muted/50 px-4 py-3">
        <p className="text-xs text-muted-foreground">Selected date</p>

        <p className="mt-1 text-sm font-medium">
          {format(date, "EEEE, dd MMMM yyyy")}
        </p>
      </div>
    </div>
  );
};

export default DateCalendar;
