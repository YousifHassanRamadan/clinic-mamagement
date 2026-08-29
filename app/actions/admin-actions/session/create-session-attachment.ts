"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import { createAttachmentSchema } from "@/schemas/session.schema";

export async function createSessionAttachment(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
        reason: "You must be logged in to add an attachment.",
      };
    }

    const parsed = createAttachmentSchema.safeParse(input);

    if (!parsed.success) {
      const reason =
        parsed.error.issues[0]?.message ?? "The attachment data is invalid.";

      return {
        success: false,
        data: null,
        message: "Invalid input",
        reason,
      };
    }

    const data = parsed.data;

    const clinicSession = await prisma.clinicSession.findUnique({
      where: {
        id: data.sessionId,
      },
      select: {
        id: true,
      },
    });

    if (!clinicSession) {
      return {
        success: false,
        data: null,
        message: "Session not found",
        reason: `No clinic session was found with ID "${data.sessionId}".`,
      };
    }

    const attachment = await prisma.sessionAttachment.create({
      data: {
        sessionId: data.sessionId,
        name: data.name,
        url: data.url,
        size: data.size,
        type: data.type,
      },
    });

    return {
      success: true,
      data: attachment,
      message: "Attachment added successfully",
      reason: null,
    };
  } catch (error) {
    console.error("CREATE_SESSION_ATTACHMENT_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to add attachment",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while adding the attachment.",
    };
  }
}
