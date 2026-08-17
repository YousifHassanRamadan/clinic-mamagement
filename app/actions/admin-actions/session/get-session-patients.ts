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
    };
  } catch (error) {
    console.error("GET_SESSION_PATIENTS_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch patients",
    };
  }
}
