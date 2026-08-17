"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getUserAppointments() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
        appointments: [],
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        date: "desc",
      },
      include: {
        session: true,
      },
    });

    return {
      success: true,
      appointments,
    };
  } catch (error) {
    console.error("GET_USER_APPOINTMENTS_ERROR:", error);

    return {
      success: false,
      message: "Failed to fetch appointments",
      appointments: [],
    };
  }
}
