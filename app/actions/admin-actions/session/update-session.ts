"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import { updateSessionSchema } from "@/schemas/session.schema";

import { combineDateAndTime } from "@/lib/session-date";
import { Prisma } from "@/app/generated/prisma/client";

export async function updateSession(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
      };
    }

    const parsed = updateSessionSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const {
      sessionId,
      patientId,
      appointmentId,
      date,
      time,
      duration,
      sessionType,
      diagnosis,
      mood,
      publicNotes,
      privateClinicalNotes,
      shareNotes,
      sendSummaryEmail,
      fee,
    } = parsed.data;

    const existingSession = await prisma.clinicSession.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!existingSession) {
      return {
        success: false,
        data: null,
        message: "Session not found",
      };
    }

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
        data: null,
        message: "Patient not found",
      };
    }

    if (appointmentId) {
      const appointment = await prisma.appointment.findUnique({
        where: {
          id: appointmentId,
        },

        select: {
          id: true,
          userId: true,
        },
      });

      if (!appointment) {
        return {
          success: false,
          data: null,
          message: "Appointment not found",
        };
      }

      if (appointment.userId !== patientId) {
        return {
          success: false,
          data: null,
          message: "Appointment does not belong to this patient",
        };
      }
    }

    const sessionDate = combineDateAndTime(date, time);

    const updatedSession = await prisma.clinicSession.update({
      where: {
        id: sessionId,
      },

      data: {
        patientId,

        appointmentId: appointmentId || null,

        sessionDate,

        duration,

        sessionType,

        diagnosis: diagnosis?.trim() || null,

        mood: mood ?? null,

        publicNotes: publicNotes?.trim() || null,

        privateClinicalNotes: privateClinicalNotes?.trim() || null,

        shareNotes,

        sendSummaryEmail,

        fee,
      },

      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },

        appointment: true,

        attachments: true,
      },
    });

    return {
      success: true,
      data: {
        ...updatedSession,
        fee: Number(updatedSession.fee),
      },
      message: "Session updated successfully",
    };
  } catch (error) {
    console.error("UPDATE_SESSION_ERROR:", error);

    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return {
        success: false,
        data: null,
        message: "This appointment already has a session linked to it.",
      };
    }

    return {
      success: false,
      data: null,
      message: "Failed to update session",
    };
  }
}
