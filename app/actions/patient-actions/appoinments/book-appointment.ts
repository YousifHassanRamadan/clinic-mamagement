"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

interface BookAppointmentInput {
  slotId: string;
  notes?: string;
}

export async function bookAppointment({ slotId, notes }: BookAppointmentInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "You must be logged in to book an appointment",
      };
    }

    const patientId = session.user.id;

    const patient = await prisma.user.findUnique({
      where: {
        id: patientId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!patient || patient.role !== "PATIENT") {
      return {
        success: false,
        message: "Only patients can book appointments",
      };
    }

    const appointment = await prisma.$transaction(async (tx) => {
      const slot = await tx.availabilitySlot.findUnique({
        where: {
          id: slotId,
        },
        include: {
          availability: true,
        },
      });

      if (!slot) {
        throw new Error("Appointment slot not found");
      }

      if (!slot.isAvailable) {
        throw new Error("This slot is no longer available");
      }

      const availabilityDate = new Date(slot.availability.date);

      const [hours, minutes] = slot.time.split(":").map(Number);

      const appointmentDate = new Date(availabilityDate);

      appointmentDate.setHours(hours, minutes, 0, 0);

      // Prevent the same patient from having another appointment
      // at the exact same time.
      const existingAppointment = await tx.appointment.findFirst({
        where: {
          userId: patientId,
          date: appointmentDate,
          status: {
            not: "CANCELLED",
          },
        },
      });

      if (existingAppointment) {
        throw new Error("You already have an appointment at this time");
      }

      const newAppointment = await tx.appointment.create({
        data: {
          userId: patientId,
          date: appointmentDate,
          status: "PENDING",
          notes: notes || null,
        },
      });

      await tx.availabilitySlot.update({
        where: {
          id: slot.id,
        },
        data: {
          isAvailable: false,
        },
      });

      return newAppointment;
    });

    return {
      success: true,
      message: "Appointment booked successfully",
      appointment,
    };
  } catch (error) {
    console.error("BOOK_APPOINTMENT_ERROR:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to book appointment",
    };
  }
}
