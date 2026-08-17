"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import {
  createAvailabilitySchema,
  type CreateAvailabilityInput,
} from "@/schemas/availability.schema";

export async function updateAvailability(
  availabilityId: string,
  values: CreateAvailabilityInput,
) {
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
        message: "Only doctors can update availability",
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

    const availabilityDate = new Date(`${date}T00:00:00`);

    if (Number.isNaN(availabilityDate.getTime())) {
      return {
        success: false,
        message: "Invalid date",
      };
    }

    const existingAvailability = await prisma.availability.findFirst({
      where: {
        id: availabilityId,
        doctorId: session.user.id,
      },
      include: {
        slots: true,
      },
    });

    if (!existingAvailability) {
      return {
        success: false,
        message: "Availability not found",
      };
    }

    // =========================
    // Check duplicate date
    // =========================

    const duplicateDate = await prisma.availability.findFirst({
      where: {
        doctorId: session.user.id,
        date: availabilityDate,
        NOT: {
          id: availabilityId,
        },
      },
    });

    if (duplicateDate) {
      return {
        success: false,
        message: "Availability already exists for this date",
      };
    }

    // =========================
    // Validate slots
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

      if (
        slotTotalMinutes < startTotalMinutes ||
        slotTotalMinutes >= endTotalMinutes
      ) {
        return {
          success: false,
          message: `Slot ${slot} is outside working hours`,
        };
      }

      const offset = slotTotalMinutes - startTotalMinutes;

      if (offset % duration !== 0) {
        return {
          success: false,
          message: `Slot ${slot} does not match the selected duration`,
        };
      }

      if (slotTotalMinutes + duration > endTotalMinutes) {
        return {
          success: false,
          message: `Slot ${slot} exceeds working hours`,
        };
      }
    }

    // =========================
    // Check booked slots
    // =========================

    const bookedSlots = existingAvailability.slots
      .filter((slot) => !slot.isAvailable)
      .map((slot) => slot.time);

    const removingBookedSlot = bookedSlots.some(
      (slot) => !uniqueSlots.includes(slot),
    );

    if (removingBookedSlot) {
      return {
        success: false,
        message: "You cannot remove a booked time slot",
      };
    }

    // =========================
    // Update availability
    // =========================

    await prisma.$transaction(async (tx) => {
      await tx.availability.update({
        where: {
          id: availabilityId,
        },
        data: {
          date: availabilityDate,
          startTime: new Date(`${date}T${startTime}:00`),
          endTime: new Date(`${date}T${endTime}:00`),
          duration,
        },
      });

      const existingTimes = existingAvailability.slots.map((slot) => slot.time);

      const newSlots = uniqueSlots.filter(
        (time) => !existingTimes.includes(time),
      );

      const slotsToDelete = existingAvailability.slots.filter(
        (slot) => !uniqueSlots.includes(slot.time) && slot.isAvailable,
      );

      if (newSlots.length > 0) {
        await tx.availabilitySlot.createMany({
          data: newSlots.map((time) => ({
            availabilityId,
            time,
            isAvailable: true,
          })),
        });
      }

      if (slotsToDelete.length > 0) {
        await tx.availabilitySlot.deleteMany({
          where: {
            id: {
              in: slotsToDelete.map((slot) => slot.id),
            },
          },
        });
      }
    });

    return {
      success: true,
      message: "Availability updated successfully",
    };
  } catch (error) {
    console.error("UPDATE_AVAILABILITY_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while updating availability",
    };
  }
}
