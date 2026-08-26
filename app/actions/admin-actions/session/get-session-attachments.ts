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
      };
    }

    if (!input.sessionId) {
      return {
        success: false,
        data: [],
        message: "Session ID is required",
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
    };
  } catch (error) {
    console.error("GET_SESSION_ATTACHMENTS_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch session attachments",
    };
  }
}
