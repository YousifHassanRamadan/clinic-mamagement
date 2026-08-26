"use server";

import { prisma } from "@/lib/prisma";

export async function getAvailableDates() {
  try {
    const availabilities = await prisma.availability.findMany({
      where: {
        isAvailable: true,
      },
      select: {
        date: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    return {
      success: true,

      // Return yyyy-MM-dd instead of Date objects.
      dates: availabilities.map((item) => {
        return item.date.toISOString().slice(0, 10);
      }),
    };
  } catch (error) {
    console.error("GET_AVAILABLE_DATES_ERROR:", error);

    return {
      success: false,
      dates: [],
      message: "Failed to fetch available dates",
    };
  }
}
