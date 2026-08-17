"use server";

import { AppointmentStatus } from "@/app/generated/prisma/enums";
import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function updateAppointmentStatus(
  appointmentId: string,
  status: AppointmentStatus,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const doctor = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    if (doctor?.role !== "DOCTOR") {
      return {
        success: false,
        message: "Only doctors can update appointment status",
      };
    }

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      return {
        success: false,
        message: "Appointment not found",
      };
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
      message: "Appointment status updated successfully",
      data: updatedAppointment,
    };
  } catch (error) {
    console.error("UPDATE_APPOINTMENT_STATUS_ERROR:", error);

    return {
      success: false,
      message: "Failed to update appointment status",
    };
  }
}
