"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { z } from "zod";

const updateAppointmentSchema = z.object({
  appointmentId: z.string().min(1, "Appointment ID is required"),
  date: z.coerce.date(),
  notes: z.string().trim().optional(),
});

export async function updateAppointment(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
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
        data: null,
        message: "Only doctors can update appointments",
      };
    }

    const parsed = updateAppointmentSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const { appointmentId, date, notes } = parsed.data;

    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    });

    if (!appointment) {
      return {
        success: false,
        data: null,
        message: "Appointment not found",
      };
    }

    const updatedAppointment = await prisma.appointment.update({
      where: {
        id: appointmentId,
      },
      data: {
        date,
        notes: notes?.trim() || null,
      },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },
      },
    });

    return {
      success: true,
      data: updatedAppointment,
      message: "Appointment updated successfully",
    };
  } catch (error) {
    console.error("UPDATE_APPOINTMENT_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to update appointment",
    };
  }
}
