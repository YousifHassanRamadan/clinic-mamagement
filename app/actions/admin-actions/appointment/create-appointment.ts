"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { AppointmentStatus } from "@/app/generated/prisma/enums";
import { z } from "zod";

const createAppointmentSchema = z.object({
  userId: z.string().min(1, "Patient is required"),
  date: z.coerce.date(),
  notes: z.string().trim().optional(),
});

export async function createAppointment(input: unknown) {
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
        message: "Only doctors can create appointments",
      };
    }

    const parsed = createAppointmentSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const { userId, date, notes } = parsed.data;

    const patient = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!patient || patient.role !== "PATIENT") {
      return {
        success: false,
        data: null,
        message: "Patient not found",
      };
    }

    const appointment = await prisma.appointment.create({
      data: {
        userId,
        date,
        notes: notes?.trim() || null,
        status: AppointmentStatus.CONFIRMED,
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
      data: appointment,
      message: "Appointment created successfully",
    };
  } catch (error) {
    console.error("CREATE_APPOINTMENT_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to create appointment",
    };
  }
}
