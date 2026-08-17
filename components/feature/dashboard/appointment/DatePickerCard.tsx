"use client";

import { useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

interface Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  availableDates: Date[];
}

const DatePickerCard = ({ date, setDate, availableDates }: Props) => {
  const [month, setMonth] = useState<Date>(date ?? new Date());

  const isDateAvailable = (date: Date) => {
    return availableDates.some(
      (availableDate) =>
        availableDate.getFullYear() === date.getFullYear() &&
        availableDate.getMonth() === date.getMonth() &&
        availableDate.getDate() === date.getDate(),
    );
  };

  const handleMonthChange = (newMonth: Date) => {
    setMonth(newMonth);

    // Clear the selected date when changing month
    setDate(undefined);
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) {
      setDate(undefined);
      return;
    }

    // Only allow available dates
    if (!isDateAvailable(newDate)) {
      setDate(undefined);
      return;
    }

    setDate(newDate);
  };

  return (
    <Card className="block rounded-3xl p-6">
      <h3 className="mb-5 text-xl font-semibold">1. Choose a date</h3>

      <Calendar
        mode="single"
        month={month}
        onMonthChange={handleMonthChange}
        selected={date}
        onSelect={handleDateSelect}
        disabled={(date) => !isDateAvailable(date)}
        className="rounded-xl border"
      />

      <p className="mt-4 text-sm text-muted-foreground">
        Select one of the available dates.
      </p>
    </Card>
  );
};

export default DatePickerCard;
