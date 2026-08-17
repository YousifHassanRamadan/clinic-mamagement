"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getBookedSlots(date: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
        slots: [],
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        message: "Only doctors can view availability",
        slots: [],
      };
    }

    const startOfDay = new Date(`${date}T00:00:00`);
    const endOfDay = new Date(`${date}T23:59:59.999`);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        date: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    const bookedSlots = appointments.map((appointment) => {
      const hours = appointment.date.getHours().toString().padStart(2, "0");
      const minutes = appointment.date.getMinutes().toString().padStart(2, "0");

      return `${hours}:${minutes}`;
    });

    return {
      success: true,
      slots: [...new Set(bookedSlots)],
    };
  } catch (error) {
    console.error("GET_BOOKED_SLOTS_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong while loading booked slots",
      slots: [],
    };
  }
}
