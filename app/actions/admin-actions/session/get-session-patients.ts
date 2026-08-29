"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getSessionPatients() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: [],
        message: "Unauthorized",
        reason: "You must be logged in to fetch patients.",
      };
    }

    const patients = await prisma.user.findMany({
      where: {
        role: "PATIENT",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
      },
      orderBy: {
        firstName: "asc",
      },
    });

    return {
      success: true,
      data: patients,
      reason: null,
    };
  } catch (error) {
    console.error("GET_SESSION_PATIENTS_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch patients",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching patients.",
    };
  }
}
