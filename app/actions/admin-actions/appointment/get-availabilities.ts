"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getAvailabilities() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: [],
        message: "Unauthorized",
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        data: [],
        message: "Only doctors can view availability",
      };
    }

    const availabilities = await prisma.availability.findMany({
      where: {
        doctorId: session.user.id,
      },
      orderBy: {
        date: "asc",
      },
      include: {
        slots: {
          orderBy: {
            time: "asc",
          },
        },
      },
    });

    return {
      success: true,
      data: availabilities,
    };
  } catch (error) {
    console.error("GET_AVAILABILITIES_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch availability",
    };
  }
}
