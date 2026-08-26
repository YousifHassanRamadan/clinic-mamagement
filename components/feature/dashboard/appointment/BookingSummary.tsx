// components/feature/dashboard/appointments/BookingSummary.tsx

"use client";

import { useState } from "react";
import { CalendarDays, Clock3, MapPin, Check } from "lucide-react";
import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { bookAppointment } from "@/app/actions/patient-actions/appoinments/book-appointment";

interface Props {
  date: Date | undefined;
  time: string | undefined;
  sessionType: "ONSITE" | "ONLINE";
  slotId: string | undefined;
  notes: string;
  onSuccess: () => void;
  translations: {
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
}

const BookingSummary = ({
  date,
  time,
  sessionType,
  slotId,
  notes,
  onSuccess,
  translations,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!date) {
      toast.error(translations.selectDate);
      return;
    }

    if (!slotId || !time) {
      toast.error(translations.selectTime);
      return;
    }

    setLoading(true);

    const result = await bookAppointment({
      slotId,
      notes: notes.trim() || undefined,
    });

    setLoading(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);

    onSuccess();
  };

  return (
    <Card className="block h-fit rounded-3xl p-6 xl:sticky xl:top-6">
      <h3 className="mb-6 text-xl font-semibold">{translations.title}</h3>

      <div className="space-y-5">
        <div className="flex gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-primary" />

          <span>
            {date
              ? date.toLocaleDateString(
                  typeof document !== "undefined" &&
                    document.documentElement.lang === "ar"
                    ? "ar-EG"
                    : "en-US",
                  {
                    weekday: "long",
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  },
                )
              : translations.noDate}
          </span>
        </div>

        <div className="flex gap-3">
          <Clock3 className="mt-1 h-5 w-5 text-primary" />

          <span>
            {time
              ? `${time} • 50 ${translations.minutes}`
              : translations.noTime}
          </span>
        </div>

        <div className="flex gap-3">
          <MapPin className="mt-1 h-5 w-5 text-primary" />

          <span>
            {sessionType === "ONSITE"
              ? translations.onsite
              : translations.online}
          </span>
        </div>
      </div>

      <div className="my-6 rounded-2xl bg-primary/5 p-4 text-sm text-muted-foreground">
        {translations.cancellation}
      </div>

      <Button
        type="button"
        disabled={!date || !slotId || !time || loading}
        onClick={handleBooking}
        className="h-11 w-full rounded-xl"
      >
        <Check className="mr-2 h-4 w-4" />

        {loading ? translations.booking : translations.confirm}
      </Button>
    </Card>
  );
};

export default BookingSummary;
