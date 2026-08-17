"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

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
}

const TimeSlots = ({ date, selectedTime, setSelectedTime }: Props) => {
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!date) {
      setSlots([]);
      return;
    }

    const loadSlots = async () => {
      setLoading(true);

      const result = await getAvailableSlots({
        date,
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
      <h3 className="mb-6 text-xl font-semibold">2. Choose a time</h3>

      {!date && (
        <p className="text-sm text-muted-foreground">
          Please select a date first.
        </p>
      )}

      {date && loading && (
        <p className="text-sm text-muted-foreground">
          Loading available times...
        </p>
      )}

      {date && !loading && slots.length === 0 && (
        <p className="text-sm text-muted-foreground">
          No available appointments for this date.
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
