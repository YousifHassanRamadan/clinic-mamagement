// components/feature/dashboard/appointments/TimeSlots.tsx

"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { format } from "date-fns";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { getAvailableSlots } from "@/app/actions/patient-actions/appoinments/get-available-slots";

interface Slot {
  id: string;
  time: string;
  isAvailable: boolean;
}

interface Props {
  date: Date | undefined;
  selectedTime: string | undefined;
  setSelectedTime: (time: string, slotId: string) => void;
  translations: {
    title: string;
    selectDateFirst: string;
    loading: string;
    noAvailable: string;
  };
}

const TimeSlots = ({
  date,
  selectedTime,
  setSelectedTime,
  translations,
}: Props) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }

    const loadSlots = async () => {
      setLoading(true);

      const dateString = format(date, "yyyy-MM-dd");

      const result = await getAvailableSlots({
        date: dateString,
      });

      setLoading(false);

      if (!result.success) {
        toast.error(result.message);
        setSlots([]);
        return;
      }

      setSlots(result.slots);
    };

    loadSlots();
  }, [date]);

  return (
    <Card className="block rounded-3xl p-6">
      <h3 className="mb-6 text-xl font-semibold">{translations.title}</h3>

      {!date && (
        <p className="text-sm text-muted-foreground">
          {translations.selectDateFirst}
        </p>
      )}

      {date && loading && (
        <p className="text-sm text-muted-foreground">{translations.loading}</p>
      )}

      {date && !loading && slots.length === 0 && (
        <p className="text-sm text-muted-foreground">
          {translations.noAvailable}
        </p>
      )}

      {!loading && slots.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {slots.map((slot) => (
            <Button
              key={slot.id}
              type="button"
              variant={selectedTime === slot.time ? "default" : "outline"}
              disabled={!slot.isAvailable}
              className="h-12 rounded-xl"
              onClick={() => setSelectedTime(slot.time, slot.id)}
            >
              {slot.time}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
};

export default TimeSlots;
