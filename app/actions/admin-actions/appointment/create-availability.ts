"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import {
  createAvailabilitySchema,
  type CreateAvailabilityInput,
} from "@/schemas/availability.schema";

export async function createAvailability(values: CreateAvailabilityInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        message: "Only doctors can create availability",
      };
    }

    const parsed = createAvailabilitySchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid data",
      };
    }

    const { date, startTime, endTime, duration, slots } = parsed.data;

    // =========================
    // Validate date
    // =========================

    const availabilityDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(availabilityDate.getTime())) {
      return {
        success: false,
        message: "Invalid date",
      };
    }

    // =========================
    // Convert times to minutes
    // =========================

    const [startHour, startMinute] = startTime.split(":").map(Number);

    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;

    const endTotalMinutes = endHour * 60 + endMinute;

    if (startTotalMinutes >= endTotalMinutes) {
      return {
        success: false,
        message: "End time must be after start time",
      };
    }

    const totalMinutes = endTotalMinutes - startTotalMinutes;

    if (duration > totalMinutes) {
      return {
        success: false,
        message: "Duration cannot be longer than working hours",
      };
    }

    // =========================
    // Validate selected slots
    // =========================

    const uniqueSlots = [...new Set(slots)];

    if (uniqueSlots.length !== slots.length) {
      return {
        success: false,
        message: "Duplicate time slots are not allowed",
      };
    }

    for (const slot of uniqueSlots) {
      const [slotHour, slotMinute] = slot.split(":").map(Number);

      const slotTotalMinutes = slotHour * 60 + slotMinute;

      // Slot must start inside working hours
      if (
        slotTotalMinutes < startTotalMinutes ||
        slotTotalMinutes >= endTotalMinutes
      ) {
        return {
          success: false,
          message: `Slot ${slot} is outside working hours`,
        };
      }

      // Slot must align with the duration
      const offset = slotTotalMinutes - startTotalMinutes;

      if (offset % duration !== 0) {
        return {
          success: false,
          message: `Slot ${slot} does not match the selected duration`,
        };
      }

      // Slot must have enough time before endTime
      if (slotTotalMinutes + duration > endTotalMinutes) {
        return {
          success: false,
          message: `Slot ${slot} exceeds working hours`,
        };
      }
    }

    // =========================
    // Check existing availability
    // =========================

    const existingAvailability = await prisma.availability.findUnique({
      where: {
        doctorId_date: {
          doctorId: session.user.id,
          date: availabilityDate,
        },
      },
    });

    if (existingAvailability) {
      return {
        success: false,
        message: "Availability already exists for this date",
      };
    }

    // =========================
    // Create availability
    // =========================

    await prisma.availability.create({
      data: {
        doctorId: session.user.id,

        date: availabilityDate,

        startTime: new Date(`${date}T${startTime}:00`),

        endTime: new Date(`${date}T${endTime}:00`),

        duration,

        slots: {
          create: uniqueSlots.map((time) => ({
            time,
          })),
        },
      },
    });

    return {
      success: true,
      message: "Availability created successfully",
    };
  } catch (error) {
    console.error("CREATE_AVAILABILITY_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while creating availability",
    };
  }
}
