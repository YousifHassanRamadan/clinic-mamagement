"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { createSessionSchema } from "@/schemas/session.schema";
import { combineDateAndTime } from "@/lib/session-date";
import { Prisma } from "@/app/generated/prisma/client";

export async function createSession(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
      };
    }

    const parsed = createSessionSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        data: null,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const data = parsed.data;

    const patient = await prisma.user.findUnique({
      where: {
        id: data.patientId,
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

    if (data.appointmentId) {
      const appointment = await prisma.appointment.findUnique({
        where: {
          id: data.appointmentId,
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

      if (appointment.userId !== data.patientId) {
        return {
          success: false,
          data: null,
          message: "Appointment does not belong to this patient",
        };
      }
    }

    const sessionDate = combineDateAndTime(data.date, data.time);

    const clinicSession = await prisma.$transaction(async (tx) => {
      const createdSession = await tx.clinicSession.create({
        data: {
          patientId: data.patientId,

          appointmentId: data.appointmentId || null,

          sessionDate,

          duration: data.duration,

          sessionType: data.sessionType,

          diagnosis: data.diagnosis?.trim() || null,

          diagnosisAr: data.diagnosisAr?.trim() || null,

          mood: data.mood ?? null,

          publicNotes: data.publicNotes?.trim() || null,

          publicNotesAr: data.publicNotesAr?.trim() || null,

          privateClinicalNotes: data.privateClinicalNotes?.trim() || null,

          privateClinicalNotesAr: data.privateClinicalNotesAr?.trim() || null,

          shareNotes: data.shareNotes,

          sendSummaryEmail: data.sendSummaryEmail,

          fee: data.fee,
        },
      });

      if (data.attachments.length > 0) {
        await tx.sessionAttachment.createMany({
          data: data.attachments.map((attachment) => ({
            sessionId: createdSession.id,

            name: attachment.name,

            url: attachment.url,

            size: attachment.size,

            type: attachment.type,

            publicId: attachment.publicId ?? null,

            resourceType: attachment.resourceType ?? null,
          })),
        });
      }

      return tx.clinicSession.findUniqueOrThrow({
        where: {
          id: createdSession.id,
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
    });

    return {
      success: true,

      data: {
        ...clinicSession,

        fee: Number(clinicSession.fee),
      },

      message: "Session created successfully",
    };
  } catch (error) {
    console.error("CREATE_SESSION_ERROR:", error);

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
      message: "Failed to create session",
    };
  }
}
