"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import { deleteAttachmentSchema } from "@/schemas/session.schema";

export async function deleteSessionAttachment(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsed = deleteAttachmentSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const attachment = await prisma.sessionAttachment.findUnique({
      where: {
        id: parsed.data.attachmentId,
      },
    });

    if (!attachment) {
      return {
        success: false,
        message: "Attachment not found",
      };
    }

    await prisma.sessionAttachment.delete({
      where: {
        id: attachment.id,
      },
    });

    return {
      success: true,
      message: "Attachment removed successfully",
    };
  } catch (error) {
    console.error("DELETE_SESSION_ATTACHMENT_ERROR:", error);

    return {
      success: false,
      message: "Failed to remove attachment",
    };
  }
}
