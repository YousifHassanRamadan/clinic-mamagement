"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { z } from "zod";

const deleteAppointmentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
});

export async function deleteAppointment(input: unknown) {
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
        message: "Only doctors can delete appointments",
      };
    }

    const parsed = deleteAppointmentSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const { appointmentId } = parsed.data;

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

    await prisma.appointment.delete({
      where: {
        id: appointmentId,
      },
    });

    return {
      success: true,
      message: "Appointment deleted successfully",
    };
  } catch (error) {
    console.error("DELETE_APPOINTMENT_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete appointment",
    };
  }
}
