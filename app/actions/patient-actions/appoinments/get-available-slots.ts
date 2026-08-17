"use server";

import { prisma } from "@/lib/prisma";

interface GetAvailableSlotsInput {
  date: Date;
}

export async function getAvailableSlots({ date }: GetAvailableSlotsInput) {
  try {
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const availability = await prisma.availability.findFirst({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        isAvailable: true,
      },
      include: {
        slots: {
          where: {
            isAvailable: true,
          },
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

    return {
      success: true,
      slots: availability.slots,
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
