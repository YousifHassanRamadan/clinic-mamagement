// components/feature/dashboard/appointments/BookAppointmentClient.tsx

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import DatePickerCard from "./DatePickerCard";
import TimeSlots from "./TimeSlots";
import SessionType from "./SessionType";
import BookingSummary from "./BookingSummary";

import { getAvailableDates } from "@/app/actions/patient-actions/appoinments/get-available-dates";

export interface BookingTranslations {
  date: {
    title: string;
    description: string;
  };
  time: {
    title: string;
    selectDateFirst: string;
    loading: string;
    noAvailable: string;
  };
  session: {
    title: string;
    notesPlaceholder: string;
    options: {
      onsite: {
        title: string;
        description: string;
      };
      online: {
        title: string;
        description: string;
      };
    };
  };
  summary: {
    title: string;
    noDate: string;
    noTime: string;
    minutes: string;
    onsite: string;
    online: string;
    cancellation: string;
    booking: string;
    confirm: string;
    selectDate: string;
    selectTime: string;
  };
  toast: {
    bookingSuccess: string;
  };
}

interface Props {
  translations: BookingTranslations;
}

const BookAppointmentClient = ({ translations }: Props) => {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>();

  const [sessionType, setSessionType] = useState<"ONSITE" | "ONLINE">("ONSITE");

  const [notes, setNotes] = useState("");

  useEffect(() => {
    const loadAvailableDates = async () => {
      const result = await getAvailableDates();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const dates = result.dates.map((date) => new Date(`${date}T00:00:00`));

      setAvailableDates(dates);

      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
    };

    loadAvailableDates();
  }, []);

  useEffect(() => {
    if (!selectedDate) {
      return;
    }

    const selectedDateString = selectedDate.toDateString();

    const isDateAvailable = availableDates.some(
      (date) => date.toDateString() === selectedDateString,
    );

    if (!isDateAvailable) {
      setSelectedDate(undefined);
      setSelectedTime(undefined);
      setSelectedSlotId(undefined);
    }
  }, [availableDates, selectedDate]);

  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedTime(undefined);
    setSelectedSlotId(undefined);
  };

  const handleTimeChange = (time: string, slotId: string) => {
    setSelectedTime(time);
    setSelectedSlotId(slotId);
  };

  const resetForm = () => {
    setSelectedDate(undefined);
    setSelectedTime(undefined);
    setSelectedSlotId(undefined);
    setSessionType("ONSITE");
    setNotes("");
  };

  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
      <div className="space-y-6">
        <DatePickerCard
          date={selectedDate}
          setDate={handleDateChange}
          availableDates={availableDates}
          title={translations.date.title}
          description={translations.date.description}
        />

        <TimeSlots
          date={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={handleTimeChange}
          translations={translations.time}
        />

        <SessionType
          sessionType={sessionType}
          setSessionType={setSessionType}
          notes={notes}
          setNotes={setNotes}
          translations={translations.session}
        />
      </div>

      <BookingSummary
        date={selectedDate}
        time={selectedTime}
        sessionType={sessionType}
        slotId={selectedSlotId}
        notes={notes}
        onSuccess={resetForm}
        translations={translations.summary}
      />
    </div>
  );
};

export default BookAppointmentClient;
