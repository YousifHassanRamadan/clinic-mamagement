"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getSessionById(sessionId: string) {
  if (!sessionId) {
    return {
      success: false,
      data: null,
      message: "Session ID is required",
      reason: "No session ID was provided when requesting the session.",
    };
  }

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
        reason: "You must be logged in to view the session.",
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
        reason: `No clinic session was found with ID "${sessionId}".`,
      };
    }

    return {
      success: true,
      data: {
        ...clinicSession,
        fee: Number(clinicSession.fee),
      },
      reason: null,
    };
  } catch (error) {
    console.error("GET_SESSION_BY_ID_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to fetch session",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching the session.",
    };
  }
}
