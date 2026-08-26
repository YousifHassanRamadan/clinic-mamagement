"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export const deleteAvailability = async (availabilityId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const availability = await prisma.availability.findFirst({
      where: {
        id: availabilityId,
        doctorId: session.user.id,
      },
    });

    if (!availability) {
      return {
        success: false,
        message: "Availability not found",
      };
    }

    await prisma.availability.delete({
      where: {
        id: availabilityId,
      },
    });

    return {
      success: true,
      message: "Availability deleted successfully",
    };
  } catch (error) {
    console.error("DELETE_AVAILABILITY_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete availability",
    };
  }
};
