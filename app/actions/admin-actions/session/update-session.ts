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
        reason: "You must be logged in to update a session.",
      };
    }

    const parsed = updateSessionSchema.safeParse(input);

    if (!parsed.success) {
      const reason =
        parsed.error.issues[0]?.message ??
        "The session update data is invalid.";

      return {
        success: false,
        data: null,
        message: "Invalid input",
        reason,
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
      diagnosisAr,
      mood,
      publicNotes,
      publicNotesAr,
      privateClinicalNotes,
      privateClinicalNotesAr,
      shareNotes,
      sendSummaryEmail,
      fee,
      attachments,
    } = parsed.data;

    const existingSession = await prisma.clinicSession.findUnique({
      where: {
        id: sessionId,
      },
      select: {
        id: true,
      },
    });

    if (!existingSession) {
      return {
        success: false,
        data: null,
        message: "Session not found",
        reason: `No clinic session was found with ID "${sessionId}".`,
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
        reason: `No valid patient was found with ID "${patientId}".`,
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
          reason: `No appointment was found with ID "${appointmentId}".`,
        };
      }

      if (appointment.userId !== patientId) {
        return {
          success: false,
          data: null,
          message: "Appointment does not belong to this patient",
          reason:
            "The selected appointment belongs to a different patient. Please choose an appointment that belongs to the selected patient.",
        };
      }
    }

    const sessionDate = combineDateAndTime(date, time);

    const updatedSession = await prisma.$transaction(async (tx) => {
      const updated = await tx.clinicSession.update({
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
          diagnosisAr: diagnosisAr?.trim() || null,
          mood: mood ?? null,
          publicNotes: publicNotes?.trim() || null,
          publicNotesAr: publicNotesAr?.trim() || null,
          privateClinicalNotes: privateClinicalNotes?.trim() || null,
          privateClinicalNotesAr: privateClinicalNotesAr?.trim() || null,
          shareNotes,
          sendSummaryEmail,
          fee,

          attachments: {
            connect: attachments
              .filter((attachment) => attachment.id)
              .map((attachment) => ({
                id: attachment.id!,
              })),

            create: attachments
              .filter((attachment) => !attachment.id)
              .map((attachment) => ({
                name: attachment.name,
                url: attachment.url,
                size: attachment.size,
                type: attachment.type,
                publicId: attachment.publicId ?? null,
                resourceType: attachment.resourceType ?? null,
              })),
          },
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

      return updated;
    });

    return {
      success: true,
      data: {
        ...updatedSession,
        fee: Number(updatedSession.fee),
      },
      message: "Session updated successfully",
      reason: null,
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
        reason:
          "The selected appointment is already linked to another clinic session. Please choose a different appointment.",
      };
    }

    return {
      success: false,
      data: null,
      message: "Failed to update session",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while updating the session.",
    };
  }
}
