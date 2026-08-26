// CreateAppointmentPage.tsx

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
import TimeSlotGrid, { type TimeSlot } from "./TimeSlotGrid";
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
  slots: TimeSlot[];
}

interface CreateAppointmentPageProps {
  locale: "en" | "ar";

  translations: {
    scheduling: string;
    createAppointment: string;
    description: string;

    newAvailability: string;
    reset: string;
    checkingBookedAppointments: string;
    selectAll: string;
    clear: string;
    saving: string;
    updateAvailability: string;
    saveAvailability: string;

    noAvailabilitySelected: string;
    completeAvailability: string;
    selectAtLeastOneSlot: string;
    cannotRemoveBookedSlot: string;
    saveError: string;
    savedSuccessfully: string;

    workingHoursTitle: string;
    workingHoursDescription: string;
    startTime: string;
    endTime: string;
    timeSlotsInfo: string;

    sessionDurationTitle: string;
    sessionDurationDescription: string;
    duration: string;
    minutes: string;

    availableTimeSlotsTitle: string;
    availableTimeSlotsDescription: string;
    selected: string;
    available: string;
    booked: string;
    disabled: string;
    noTimeSlots: string;
    adjustWorkingHours: string;

    availabilitySummaryTitle: string;
    workingHours: string;
    sessionDuration: string;
    availableSlots: string;

    availabilityListNoAvailability: string;
    availabilityListCreateFirst: string;
    slots: string;
    edit: string;
  };
}

const formatUTCTime = (date: Date | string) => {
  const value = new Date(date);

  return `${String(value.getUTCHours()).padStart(2, "0")}:${String(
    value.getUTCMinutes(),
  ).padStart(2, "0")}`;
};

const CreateAppointmentPage = ({
  locale,
  translations: t,
}: CreateAppointmentPageProps) => {
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

  const loadAvailabilities = async () => {
    const result = await getAvailabilities(locale);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    setAvailabilities(result.data as Availability[]);
  };

  useEffect(() => {
    loadAvailabilities();
  }, []);

  useEffect(() => {
    const loadBookedSlots = async () => {
      setIsLoadingBookedSlots(true);
      setBookedSlots([]);

      const dateString = format(date, "yyyy-MM-dd");

      const result = await getBookedSlots(dateString, locale);

      if (!result.success) {
        setBookedSlots([]);
        setIsLoadingBookedSlots(false);
        return;
      }

      setBookedSlots(result.slots);
      setIsLoadingBookedSlots(false);
    };

    loadBookedSlots();
  }, [date, locale]);

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

  const currentAvailability = useMemo(() => {
    if (mode !== "edit") {
      return null;
    }

    const dateString = format(date, "yyyy-MM-dd");

    return (
      availabilities.find(
        (availability) =>
          format(new Date(availability.date), "yyyy-MM-dd") === dateString,
      ) ?? null
    );
  }, [mode, date, availabilities]);

  const displaySlots = useMemo<TimeSlot[]>(() => {
    if (mode === "edit" && currentAvailability) {
      return currentAvailability.slots.map((slot) => ({
        ...slot,
        isBooked: slot.isBooked === true || bookedSlots.includes(slot.time),
      }));
    }

    return generatedSlots.map((time) => ({
      id: `generated-${time}`,
      time,
      isAvailable: true,
      isBooked: false,
    }));
  }, [mode, currentAvailability, generatedSlots, bookedSlots]);

  const availableSlots = useMemo(() => {
    return displaySlots
      .filter(
        (slot) =>
          !bookedSlots.includes(slot.time) &&
          !slot.isBooked &&
          slot.isAvailable,
      )
      .map((slot) => slot.time);
  }, [displaySlots, bookedSlots]);

  const handleEdit = (availability: Availability) => {
    setMode("edit");
    setEditingAvailabilityId(availability.id);

    const selectedDate = new Date(availability.date);

    setDate(selectedDate);

    form.reset({
      date: format(selectedDate, "yyyy-MM-dd"),
      startTime: formatUTCTime(availability.startTime),
      endTime: formatUTCTime(availability.endTime),
      duration: availability.duration as 30 | 45 | 60 | 90,
      slots: availability.slots.map((slot) => slot.time),
    });
  };

  const handleNew = () => {
    setMode("create");
    setEditingAvailabilityId(null);

    const today = new Date();

    setDate(today);
    setBookedSlots([]);

    form.reset({
      date: format(today, "yyyy-MM-dd"),
      startTime: "09:00",
      endTime: "17:00",
      duration: 60,
      slots: [],
    });
  };

  const toggleSlot = (slot: string) => {
    if (bookedSlots.includes(slot)) {
      toast.error(t.cannotRemoveBookedSlot);
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
    const currentSlots = form.getValues("slots");
    const booked = new Set(bookedSlots);

    const mergedSlots = [
      ...new Set([
        ...currentSlots.filter((slot) => booked.has(slot)),
        ...availableSlots,
      ]),
    ].sort();

    form.setValue("slots", mergedSlots, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const clearAll = () => {
    const currentSlots = form.getValues("slots");
    const booked = new Set(bookedSlots);

    const bookedSlotsToKeep = currentSlots.filter((slot) => booked.has(slot));

    form.setValue("slots", bookedSlotsToKeep, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

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

  const handleDateChange = (newDate: Date) => {
    setDate(newDate);

    const dateString = format(newDate, "yyyy-MM-dd");

    form.setValue("date", dateString, {
      shouldValidate: true,
      shouldDirty: true,
    });

    if (mode === "create") {
      form.setValue("slots", [], {
        shouldValidate: true,
        shouldDirty: true,
      });

      return;
    }

    const availability = availabilities.find(
      (item) => format(new Date(item.date), "yyyy-MM-dd") === dateString,
    );

    if (availability) {
      setEditingAvailabilityId(availability.id);

      form.reset({
        date: dateString,
        startTime: formatUTCTime(availability.startTime),
        endTime: formatUTCTime(availability.endTime),
        duration: availability.duration as 30 | 45 | 60 | 90,
        slots: availability.slots.map((slot) => slot.time),
      });
    } else {
      setEditingAvailabilityId(null);

      form.setValue("slots", [], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleSave = () => {
    if (isPending || isLoadingBookedSlots) {
      return;
    }

    if (mode === "edit" && !editingAvailabilityId) {
      toast.error(t.noAvailabilitySelected);
      return;
    }

    const values = form.getValues();

    if (!values.date || !values.startTime || !values.endTime) {
      toast.error(t.completeAvailability);
      return;
    }

    if (mode === "create" && values.slots.length === 0) {
      toast.error(t.selectAtLeastOneSlot);
      return;
    }

    if (mode === "edit") {
      const bookedSet = new Set(bookedSlots);

      const removedBookedSlot = currentAvailability?.slots.some(
        (slot) => bookedSet.has(slot.time) && !values.slots.includes(slot.time),
      );

      if (removedBookedSlot) {
        toast.error(t.cannotRemoveBookedSlot);
        return;
      }
    }

    startTransition(async () => {
      try {
        const result =
          mode === "create"
            ? await createAvailability(values, locale)
            : await updateAvailability(editingAvailabilityId!, values, locale);

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        toast.success(result.message || t.savedSuccessfully);

        await loadAvailabilities();

        handleNew();

        router.refresh();
      } catch (error) {
        console.error("SAVE_AVAILABILITY_ERROR:", error);

        toast.error(t.saveError);
      }
    });
  };

  const isEditDirty = mode === "edit" && form.formState.isDirty;

  const canSave =
    !isPending &&
    !isLoadingBookedSlots &&
    (mode === "create"
      ? selectedSlots.length > 0
      : Boolean(editingAvailabilityId) && isEditDirty);

  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="space-y-8 pb-10">
      <div className="flex items-center justify-between gap-4">
        <AppointmentHeader
          scheduling={t.scheduling}
          title={t.createAppointment}
          description={t.description}
        />

        <Button variant="outline" className="rounded-xl" onClick={handleNew}>
          <ArrowLeft
            className={`h-4 w-4 ${
              locale === "ar" ? "ml-2 rotate-180" : "mr-2"
            }`}
          />

          {mode === "edit" ? t.newAvailability : t.reset}
        </Button>
      </div>

      <AvailabilityList
        availabilities={availabilities}
        onEdit={handleEdit}
        translations={{
          noAvailability: t.availabilityListNoAvailability,
          createFirst: t.availabilityListCreateFirst,
          slots: t.slots,
          edit: t.edit,
        }}
        locale={locale}
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
        <main className="min-w-0 space-y-6">
          <DateCalendar date={date} onDateChange={handleDateChange} />

          <WorkingHoursCard
            startTime={startTime}
            endTime={endTime}
            onStartChange={handleStartChange}
            onEndChange={handleEndChange}
            translations={{
              title: t.workingHoursTitle,
              description: t.workingHoursDescription,
              startTime: t.startTime,
              endTime: t.endTime,
              timeSlotsInfo: t.timeSlotsInfo,
            }}
            locale={locale}
          />

          <TimeSlotSettings
            duration={duration}
            onDurationChange={handleDurationChange}
            translations={{
              title: t.sessionDurationTitle,
              description: t.sessionDurationDescription,
              duration: t.duration,
              minutes: t.minutes,
            }}
          />

          <TimeSlotGrid
            slots={displaySlots}
            selectedSlots={selectedSlots}
            onToggle={toggleSlot}
            translations={{
              title: t.availableTimeSlotsTitle,
              description: t.availableTimeSlotsDescription,
              selected: t.selected,
              available: t.available,
              booked: t.booked,
              disabled: t.disabled,
              noTimeSlots: t.noTimeSlots,
              adjustWorkingHours: t.adjustWorkingHours,
            }}
          />

          {isLoadingBookedSlots && (
            <p className="text-center text-xs text-muted-foreground">
              {t.checkingBookedAppointments}
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
                {t.selectAll}
              </Button>

              <Button
                type="button"
                variant="ghost"
                className="rounded-xl"
                onClick={clearAll}
                disabled={
                  selectedSlots.filter((slot) => !bookedSlots.includes(slot))
                    .length === 0 || isPending
                }
              >
                {t.clear}
              </Button>
            </div>

            <Button
              type="button"
              onClick={handleSave}
              disabled={!canSave}
              className="rounded-xl"
            >
              <Save
                className={`h-4 w-4 ${locale === "ar" ? "ml-2" : "mr-2"}`}
              />

              {isPending
                ? t.saving
                : mode === "edit"
                  ? t.updateAvailability
                  : t.saveAvailability}
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
            translations={{
              title: t.availabilitySummaryTitle,
              workingHours: t.workingHours,
              sessionDuration: t.sessionDuration,
              availableSlots: t.availableSlots,
            }}
            locale={locale}
          />
        </aside>
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
