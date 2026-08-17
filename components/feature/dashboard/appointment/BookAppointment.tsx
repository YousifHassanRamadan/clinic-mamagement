"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import DatePickerCard from "./DatePickerCard";
import TimeSlots from "./TimeSlots";
import SessionType from "./SessionType";
import BookingSummary from "./BookingSummary";

import { getAvailableDates } from "@/app/actions/patient-actions/appoinments/get-available-dates";

const BookAppointment = () => {
  const [availableDates, setAvailableDates] = useState<Date[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [selectedSlotId, setSelectedSlotId] = useState<string | undefined>();

  const [sessionType, setSessionType] = useState<"ONSITE" | "ONLINE">("ONSITE");

  const [notes, setNotes] = useState("");

  // =========================
  // Load Available Dates
  // =========================
  useEffect(() => {
    const loadAvailableDates = async () => {
      const result = await getAvailableDates();

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const dates = result.dates.map((item) => new Date(item.date));

      setAvailableDates(dates);

      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
    };

    loadAvailableDates();
  }, []);

  // =========================
  // Validate Selected Date
  // =========================
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

  // =========================
  // Date Change
  // =========================
  const handleDateChange = (date: Date | undefined) => {
    setSelectedDate(date);

    // Changing the date should reset the selected slot
    setSelectedTime(undefined);
    setSelectedSlotId(undefined);
  };

  // =========================
  // Time Change
  // =========================
  const handleTimeChange = (time: string, slotId: string) => {
    setSelectedTime(time);
    setSelectedSlotId(slotId);
  };

  // =========================
  // Reset Form
  // =========================
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
        />

        <TimeSlots
          date={selectedDate}
          selectedTime={selectedTime}
          setSelectedTime={handleTimeChange}
        />

        <SessionType
          sessionType={sessionType}
          setSessionType={setSessionType}
          notes={notes}
          setNotes={setNotes}
        />
      </div>

      <BookingSummary
        date={selectedDate}
        time={selectedTime}
        sessionType={sessionType}
        slotId={selectedSlotId}
        notes={notes}
        onSuccess={resetForm}
      />
    </div>
  );
};

export default BookAppointment;
