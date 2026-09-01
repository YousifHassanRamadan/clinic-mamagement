"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { revalidatePath } from "next/cache";

export const cancelAppointment = async (appointmentId: string) => {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (session.user.role !== "PATIENT") {
      return {
        success: false,
        message: "Only patients can cancel appointments",
      };
    }

    const appointment = await prisma.appointment.findFirst({
      where: {
        id: appointmentId,
        userId: session.user.id,
      },
    });

    if (!appointment) {
      return {
        success: false,
        message: "Appointment not found",
      };
    }

    if (
      appointment.status === "CANCELLED" ||
      appointment.status === "COMPLETED"
    ) {
      return {
        success: false,
        message: "This appointment cannot be cancelled",
      };
    }

    const appointmentDate = new Date(appointment.date);
    const now = new Date();

    const hoursUntilAppointment =
      (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursUntilAppointment < 24) {
      return {
        success: false,
        message:
          "Appointments can only be cancelled at least 24 hours before the scheduled time",
      };
    }

    await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status: "CANCELLED",
      },
    });

    revalidatePath("/dashboard/appointments");

    return {
      success: true,
      message: "Appointment cancelled successfully",
    };
  } catch {
    return {
      success: false,
      message: "Something went wrong while cancelling the appointment",
    };
  }
};
