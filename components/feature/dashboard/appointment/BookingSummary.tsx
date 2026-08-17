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
}

const BookingSummary = ({
  date,
  time,
  sessionType,
  slotId,
  notes,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    if (!date) {
      toast.error("Please select a date");
      return;
    }

    if (!slotId || !time) {
      toast.error("Please select an available time");
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
      <h3 className="mb-6 text-xl font-semibold">Summary</h3>

      <div className="space-y-5">
        <div className="flex gap-3">
          <CalendarDays className="mt-1 h-5 w-5 text-primary" />

          <span>
            {date
              ? date.toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })
              : "No date selected"}
          </span>
        </div>

        <div className="flex gap-3">
          <Clock3 className="mt-1 h-5 w-5 text-primary" />

          <span>{time ? `${time} • 50 minutes` : "No time selected"}</span>
        </div>

        <div className="flex gap-3">
          <MapPin className="mt-1 h-5 w-5 text-primary" />

          <span>
            {sessionType === "ONSITE" ? "On-site at the clinic" : "Google Meet"}
          </span>
        </div>
      </div>

      <div className="my-6 rounded-2xl bg-primary/5 p-4 text-sm text-muted-foreground">
        Free cancellation up to 24 hours before the session.
      </div>

      <Button
        type="button"
        disabled={!date || !slotId || !time || loading}
        onClick={handleBooking}
        className="h-11 w-full rounded-xl"
      >
        <Check className="mr-2 h-4 w-4" />

        {loading ? "Booking..." : "Confirm booking"}
      </Button>
    </Card>
  );
};

export default BookingSummary;
