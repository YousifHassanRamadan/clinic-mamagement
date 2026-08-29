"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import { deleteSessionSchema } from "@/schemas/session.schema";

export async function deleteSession(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
        reason: "You must be logged in to delete a session.",
      };
    }

    const parsed = deleteSessionSchema.safeParse(input);

    if (!parsed.success) {
      const reason =
        parsed.error.issues[0]?.message ??
        "The session deletion data is invalid.";

      return {
        success: false,
        message: "Invalid input",
        reason,
      };
    }

    const existingSession = await prisma.clinicSession.findUnique({
      where: {
        id: parsed.data.sessionId,
      },
    });

    if (!existingSession) {
      return {
        success: false,
        message: "Session not found",
        reason: `No clinic session was found with ID "${parsed.data.sessionId}".`,
      };
    }

    await prisma.clinicSession.delete({
      where: {
        id: parsed.data.sessionId,
      },
    });

    return {
      success: true,
      message: "Session deleted successfully",
      reason: null,
    };
  } catch (error) {
    console.error("DELETE_SESSION_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete session",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while deleting the session.",
    };
  }
}
