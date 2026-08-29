// components/feature/dashboard/appointments/DatePickerCard.tsx

"use client";

import { useEffect, useState } from "react";

import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";

interface Props {
  date: Date | undefined;
  setDate: (date: Date | undefined) => void;
  availableDates: Date[];
  title: string;
  description: string;
}

const DatePickerCard = ({
  date,
  setDate,
  availableDates,
  title,
  description,
}: Props) => {
  const [month, setMonth] = useState<Date>(date ?? new Date());

  useEffect(() => {
    if (date) {
      setMonth(date);
    }
  }, [date]);

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
    setDate(undefined);
  };

  const handleDateSelect = (newDate: Date | undefined) => {
    if (!newDate) {
      setDate(undefined);
      return;
    }

    if (!isDateAvailable(newDate)) {
      setDate(undefined);
      return;
    }

    setDate(newDate);
  };

  return (
    <Card className="block min-w-0 rounded-3xl p-4 sm:p-6">
      <h3 className="mb-5 text-xl font-semibold">{title}</h3>

      <div className="w-full overflow-x-auto">
        <Calendar
          mode="single"
          month={month}
          onMonthChange={handleMonthChange}
          selected={date}
          onSelect={handleDateSelect}
          disabled={(date) => !isDateAvailable(date)}
          className="mx-auto w-full min-w-[280px] rounded-xl border"
        />
      </div>

      <p className="mt-4 text-sm text-muted-foreground">{description}</p>
    </Card>
  );
};

export default DatePickerCard;
