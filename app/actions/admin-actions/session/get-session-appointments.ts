"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getSessionAppointments(patientId?: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: [],
        message: "Unauthorized",
        reason: "You must be logged in to fetch session appointments.",
      };
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        ...(patientId ? { userId: patientId } : {}),
        status: {
          in: ["CONFIRMED", "COMPLETED"],
        },
        session: null,
      },
      select: {
        id: true,
        userId: true,
        date: true,
        status: true,
      },
      orderBy: {
        date: "desc",
      },
    });

    return {
      success: true,
      data: appointments,
      reason: null,
    };
  } catch (error) {
    console.error("GET_SESSION_APPOINTMENTS_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch appointments",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching appointments.",
    };
  }
}
