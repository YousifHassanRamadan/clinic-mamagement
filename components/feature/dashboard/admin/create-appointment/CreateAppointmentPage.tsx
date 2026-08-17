"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { ArrowLeft, Save } from "lucide-react";
import { addMinutes, format, parse } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import AppointmentHeader from "./AppointmentHeader";
import DateCalendar from "./DateCalendar";
import WorkingHoursCard from "./WorkingHoursCard";
import TimeSlotSettings from "./TimeSlotSettings";
import TimeSlotGrid from "./TimeSlotGrid";
import AvailabilitySummary from "./AvailabilitySummary";
import AvailabilityList from "./AvailabilityList";

import { createAvailability } from "@/app/actions/admin-actions/appointment/create-availability";
import { updateAvailability } from "@/app/actions/admin-actions/appointment/update-availability";
import { getAvailabilities } from "@/app/actions/admin-actions/appointment/get-availabilities";
import { getBookedSlots } from "@/app/actions/admin-actions/appointment/get-booked-slots";

import {
  createAvailabilitySchema,
  type CreateAvailabilityInput,
} from "@/schemas/availability.schema";

interface Availability {
  id: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  duration: number;
  slots: {
    id: string;
    time: string;
    isAvailable: boolean;
  }[];
}

const CreateAppointmentPage = () => {
  const router = useRouter();

  const [isPending, startTransition] = useTransition();

  const [mode, setMode] = useState<"create" | "edit">("create");
  const [editingAvailabilityId, setEditingAvailabilityId] = useState<
    string | null
  >(null);

  const [availabilities, setAvailabilities] = useState<Availability[]>([]);

  const [date, setDate] = useState<Date>(new Date());

  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [isLoadingBookedSlots, setIsLoadingBookedSlots] = useState(false);

  // =========================
  // Form
  // =========================

  const form = useForm<CreateAvailabilityInput>({
    resolver: zodResolver(createAvailabilitySchema),
    defaultValues: {
      date: format(new Date(), "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "17:00",
      duration: 60,
      slots: [],
    },
  });

  const startTime = form.watch("startTime");
  const endTime = form.watch("endTime");
  const duration = form.watch("duration");
  const selectedSlots = form.watch("slots");

  // =========================
  // Load availabilities
  // =========================

  const loadAvailabilities = async () => {
    const result = await getAvailabilities();

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setAvailabilities(result.data);
  };

  useEffect(() => {
    loadAvailabilities();
  }, []);

  // =========================
  // Load booked slots
  // =========================

  useEffect(() => {
    const loadBookedSlots = async () => {
      setIsLoadingBookedSlots(true);

      const dateString = format(date, "yyyy-MM-dd");

      const result = await getBookedSlots(dateString);

      if (!result.success) {
        setBookedSlots([]);
        setIsLoadingBookedSlots(false);
        return;
      }

      setBookedSlots(result.slots);
      setIsLoadingBookedSlots(false);
    };

    loadBookedSlots();
  }, [date]);

  // =========================
  // Generate slots
  // =========================

  const generatedSlots = useMemo(() => {
    if (!startTime || !endTime || !duration) {
      return [];
    }

    const baseDate = format(date, "yyyy-MM-dd");

    const start = parse(
      `${baseDate} ${startTime}`,
      "yyyy-MM-dd HH:mm",
      new Date(),
    );

    const end = parse(`${baseDate} ${endTime}`, "yyyy-MM-dd HH:mm", new Date());

    if (start >= end) {
      return [];
    }

    const slots: string[] = [];

    let current = start;

    while (true) {
      const next = addMinutes(current, duration);

      if (next > end) {
        break;
      }

      slots.push(format(current, "HH:mm"));

      current = next;
    }

    return slots;
  }, [date, startTime, endTime, duration]);

  // =========================
  // Available slots
  // =========================

  const availableSlots = useMemo(() => {
    return generatedSlots.filter((slot) => !bookedSlots.includes(slot));
  }, [generatedSlots, bookedSlots]);

  // =========================
  // Edit
  // =========================

  const handleEdit = (availability: Availability) => {
    setMode("edit");
    setEditingAvailabilityId(availability.id);

    const selectedDate = new Date(availability.date);

    setDate(selectedDate);

    form.reset({
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: format(new Date(availability.startTime), "HH:mm"),
      endTime: format(new Date(availability.endTime), "HH:mm"),
      duration: availability.duration as 30 | 45 | 60 | 90,
      slots: availability.slots.map((slot) => slot.time),
    });
  };

  // =========================
  // New
  // =========================

  const handleNew = () => {
    setMode("create");
    setEditingAvailabilityId(null);

    const today = new Date();

    setDate(today);

    form.reset({
      date: format(today, "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "17:00",
      duration: 60,
      slots: [],
    });
  };

  // =========================
  // Slot actions
  // =========================

  const toggleSlot = (slot: string) => {
    if (bookedSlots.includes(slot)) {
      return;
    }

    const currentSlots = form.getValues("slots");

    if (currentSlots.includes(slot)) {
      form.setValue(
        "slots",
        currentSlots.filter((item) => item !== slot),
        {
          shouldValidate: true,
          shouldDirty: true,
        },
      );

      return;
    }

    form.setValue("slots", [...currentSlots, slot].sort(), {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const selectAll = () => {
    form.setValue("slots", availableSlots, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const clearAll = () => {
    form.setValue("slots", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // =========================
  // Working hours
  // =========================

  const handleStartChange = (value: string) => {
    form.setValue("startTime", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.setValue("slots", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleEndChange = (value: string) => {
    form.setValue("endTime", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.setValue("slots", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // =========================
  // Duration
  // =========================

  const handleDurationChange = (value: CreateAvailabilityInput["duration"]) => {
    form.setValue("duration", value, {
      shouldValidate: true,
      shouldDirty: true,
    });

    form.setValue("slots", [], {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  // =========================
  // Date
  // =========================

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);

    form.setValue("date", format(newDate, "yyyy-MM-dd"), {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (mode === "create") {
      form.setValue("slots", [], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  // =========================
  // Submit
  // =========================

  const handleSave = form.handleSubmit((values) => {
    if (values.slots.length === 0) {
      toast.error("Please select at least one available time slot");
      return;
    }

    startTransition(async () => {
      const result =
        mode === "create"
          ? await createAvailability(values)
          : await updateAvailability(editingAvailabilityId!, values);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      await loadAvailabilities();

      handleNew();

      router.refresh();
    });
  });

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center justify-between gap-4">
        <AppointmentHeader />

        <Button variant="outline" className="rounded-xl" onClick={handleNew}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          {mode === "edit" ? "New availability" : "Reset"}
        </Button>
      </div>

      {/* Existing availability */}
      <AvailabilityList availabilities={availabilities} onEdit={handleEdit} />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-6">
          <DateCalendar date={date} onDateChange={handleDateChange} />

          <WorkingHoursCard
            startTime={startTime}
            endTime={endTime}
            onStartChange={handleStartChange}
            onEndChange={handleEndChange}
          />

          <TimeSlotSettings
            duration={duration}
            onDurationChange={handleDurationChange}
          />

          <TimeSlotGrid
            slots={availableSlots}
            selectedSlots={selectedSlots}
            onToggle={toggleSlot}
          />

          {isLoadingBookedSlots && (
            <p className="text-center text-xs text-muted-foreground">
              Checking booked appointments...
            </p>
          )}

          <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                className="rounded-xl"
                onClick={selectAll}
                disabled={
                  availableSlots.length === 0 ||
                  isPending ||
                  isLoadingBookedSlots
                }
              >
                Select all
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="rounded-xl"
                onClick={clearAll}
                disabled={selectedSlots.length === 0 || isPending}
              >
                Clear
              </Button>
            </div>

            <Button
              type="button"
              onClick={handleSave}
              disabled={
                selectedSlots.length === 0 || isPending || isLoadingBookedSlots
              }
              className="rounded-xl"
            >
              <Save className="mr-2 h-4 w-4" />

              {isPending
                ? "Saving..."
                : mode === "edit"
                  ? "Update availability"
                  : "Save availability"}
            </Button>
          </div>
        </main>

        <aside>
          <AvailabilitySummary
            date={date}
            startTime={startTime}
            endTime={endTime}
            duration={duration}
            selectedSlots={selectedSlots.length}
          />
        </aside>
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
