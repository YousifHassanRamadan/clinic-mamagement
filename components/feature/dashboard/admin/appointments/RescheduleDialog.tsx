"use client";

import { useState } from "react";
import { CalendarClock } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { AdminAppointment } from "./types";

interface Props {
  appointment: AdminAppointment | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (date: Date, time: string) => void;
}

const RescheduleDialog = ({
  appointment,
  open,
  onOpenChange,
  onSave,
}: Props) => {
  const [date, setDate] = useState<Date>(new Date());
  const [time, setTime] = useState("09:00 AM");

  if (!appointment) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-2xl">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CalendarClock className="h-5 w-5" />
          </div>

          <DialogTitle>Reschedule appointment</DialogTitle>

          <DialogDescription>
            Choose a new date and time for{" "}
            <span className="font-medium text-foreground">
              {appointment.patientName}
            </span>
            .
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div>
            <p className="mb-2 text-sm font-medium">New date</p>

            <div className="flex justify-center rounded-xl border bg-background p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={(selectedDate) => {
                  if (selectedDate) {
                    setDate(selectedDate);
                  }
                }}
              />
            </div>
          </div>

          <div>
            <p className="mb-2 text-sm font-medium">New time</p>

            <Select value={time} onValueChange={setTime}>
              <SelectTrigger className="rounded-xl">
                <SelectValue />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="09:00 AM">09:00 AM</SelectItem>
                <SelectItem value="10:00 AM">10:00 AM</SelectItem>
                <SelectItem value="11:00 AM">11:00 AM</SelectItem>
                <SelectItem value="12:00 PM">12:00 PM</SelectItem>
                <SelectItem value="01:00 PM">01:00 PM</SelectItem>
                <SelectItem value="02:00 PM">02:00 PM</SelectItem>
                <SelectItem value="03:00 PM">03:00 PM</SelectItem>
                <SelectItem value="04:00 PM">04:00 PM</SelectItem>
                <SelectItem value="05:00 PM">05:00 PM</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="rounded-xl"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>

          <Button
            className="rounded-xl"
            onClick={() => {
              onSave(date, time);
              onOpenChange(false);
            }}
          >
            Reschedule
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RescheduleDialog;
