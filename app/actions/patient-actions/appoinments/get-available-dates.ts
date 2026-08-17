"use server";

import { prisma } from "@/lib/prisma";

export async function getAvailableDates() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const availabilities = await prisma.availability.findMany({
      where: {
        date: {
          gte: today,
        },
        isAvailable: true,
      },
      select: {
        id: true,
        date: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return {
      success: true,
      dates: availabilities,
    };
  } catch (error) {
    console.error("GET_AVAILABLE_DATES_ERROR:", error);

    return {
      success: false,
      message: "Failed to get available dates",
      dates: [],
    };
  }
}
