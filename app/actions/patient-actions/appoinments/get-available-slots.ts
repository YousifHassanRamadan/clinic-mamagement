"use server";

import { prisma } from "@/lib/prisma";

interface GetAvailableSlotsInput {
  date: string;
}

export async function getAvailableSlots({ date }: GetAvailableSlotsInput) {
  try {
    if (!date) {
      return {
        success: false,
        message: "Date is required",
        slots: [],
      };
    }

    /*
     * IMPORTANT:
     *
     * Availability dates are stored using UTC values
     * that represent Egypt local time directly.
     *
     * Example:
     *
     * Egypt date: 2026-08-26
     * Stored date: 2026-08-26T00:00:00.000Z
     *
     * Therefore we MUST NOT use +03:00 here.
     */

    const startOfDay = new Date(`${date}T00:00:00.000Z`);

    const endOfDay = new Date(`${date}T23:59:59.999Z`);

    const doctor = await prisma.user.findFirst({
      where: {
        role: "DOCTOR",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        approval: true,
      },
    });

    if (!doctor) {
      return {
        success: true,
        slots: [],
      };
    }

    const availability = await prisma.availability.findFirst({
      where: {
        doctorId: doctor.id,

        date: {
          gte: startOfDay,
          lte: endOfDay,
        },

        isAvailable: true,
      },

      include: {
        slots: {
          orderBy: {
            time: "asc",
          },
        },
      },
    });

    if (!availability) {
      return {
        success: true,
        slots: [],
      };
    }

    /*
     * slot.time is already stored as a plain HH:mm value.
     *
     * Example:
     * "09:00"
     * "10:00"
     * "16:00"
     *
     * Do NOT convert it through Date/timezone.
     */

    const availableSlots = availability.slots.filter(
      (slot) => slot.isAvailable,
    );

    return {
      success: true,
      slots: availableSlots,
    };
  } catch (error) {
    console.error("GET_AVAILABLE_SLOTS_ERROR:", error);

    return {
      success: false,
      message: "Failed to get available slots",
      slots: [],
    };
  }
}
