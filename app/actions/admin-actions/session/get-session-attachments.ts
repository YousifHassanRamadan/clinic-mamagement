"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

interface GetSessionAttachmentsInput {
  sessionId: string;
}

export async function getSessionAttachments(input: GetSessionAttachmentsInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: [],
        message: "Unauthorized",
        reason: "You must be logged in to fetch session attachments.",
      };
    }

    if (!input.sessionId) {
      return {
        success: false,
        data: [],
        message: "Session ID is required",
        reason: "No session ID was provided when fetching attachments.",
      };
    }

    const clinicSession = await prisma.clinicSession.findUnique({
      where: {
        id: input.sessionId,
      },
      select: {
        id: true,
      },
    });

    if (!clinicSession) {
      return {
        success: false,
        data: [],
        message: "Session not found",
        reason: `No clinic session was found with ID "${input.sessionId}".`,
      };
    }

    const attachments = await prisma.sessionAttachment.findMany({
      where: {
        sessionId: input.sessionId,
      },
      select: {
        id: true,
        sessionId: true,
        name: true,
        url: true,
        size: true,
        type: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: attachments,
      reason: null,
    };
  } catch (error) {
    console.error("GET_SESSION_ATTACHMENTS_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch session attachments",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while fetching session attachments.",
    };
  }
}
