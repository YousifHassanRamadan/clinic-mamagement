"use server";

import { SessionStatus } from "@/app/generated/prisma/enums";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function updateSessionStatus(
  sessionId: string,
  status: SessionStatus,
) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
        reason: "You must be logged in to update the session status.",
      };
    }

    if (!sessionId) {
      return {
        success: false,
        message: "Session ID is required",
        reason: "No session ID was provided for the status update.",
      };
    }

    const existingSession = await prisma.clinicSession.findUnique({
      where: {
        id: sessionId,
      },
    });

    if (!existingSession) {
      return {
        success: false,
        message: "Session not found",
        reason: `No clinic session was found with ID "${sessionId}".`,
      };
    }

    const updatedSession = await prisma.clinicSession.update({
      where: {
        id: sessionId,
      },
      data: {
        status,
      },
    });

    return {
      success: true,
      data: updatedSession,
      message:
        status === SessionStatus.DRAFT
          ? "Session saved as draft"
          : status === SessionStatus.COMPLETED
            ? "Session published successfully"
            : "Session cancelled successfully",
      reason: null,
    };
  } catch (error) {
    console.error("UPDATE_SESSION_STATUS_ERROR:", error);

    return {
      success: false,
      message: "Failed to update session status",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while updating the session status.",
    };
  }
}
