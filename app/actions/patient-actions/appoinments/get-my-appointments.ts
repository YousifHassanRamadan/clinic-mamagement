"use server";

import { auth } from "@/providers/auth/auth";
import { prisma } from "@/lib/prisma";

export async function getMyAppointments() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in",
        appointments: [],
      };
    }

    const userId = session.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user || user.role !== "PATIENT") {
      return {
        success: false,
        message: "Only patients can access their appointments",
        appointments: [],
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId,
      },
      include: {
        session: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return {
      success: true,
      appointments,
    };
  } catch (error) {
    console.error("GET_MY_APPOINTMENTS_ERROR:", error);

    return {
      success: false,
      message: "Failed to get appointments",
      appointments: [],
    };
  }
}
