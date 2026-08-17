"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getSessionById(sessionId: string) {
  if (!sessionId) {
    return {
      success: false,
      data: null,
      message: "Session ID is required",
    };
  }

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
      };
    }

    const clinicSession = await prisma.clinicSession.findUnique({
      where: {
        id: sessionId,
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

        appointment: {
          select: {
            id: true,
            date: true,
            status: true,
          },
        },

        attachments: true,
      },
    });

    if (!clinicSession) {
      return {
        success: false,
        data: null,
        message: "Session not found",
      };
    }

    return {
      success: true,
      data: {
        ...clinicSession,
        fee: Number(clinicSession.fee),
      },
    };
  } catch (error) {
    console.error("GET_SESSION_BY_ID_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to fetch session",
    };
  }
}
