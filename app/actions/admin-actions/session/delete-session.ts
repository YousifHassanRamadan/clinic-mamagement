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
      };
    }

    const parsed = deleteSessionSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
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
    };
  } catch (error) {
    console.error("DELETE_SESSION_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete session",
    };
  }
}
