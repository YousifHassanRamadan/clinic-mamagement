"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function downloadSessionAttachment(attachmentId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
        reason: "You must be logged in to download session attachments.",
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        data: null,
        message: "You are not allowed to download attachments",
        reason:
          "Only users with the DOCTOR role are allowed to download session attachments.",
      };
    }

    if (!attachmentId) {
      return {
        success: false,
        data: null,
        message: "Attachment ID is required",
        reason: "No attachment ID was provided for the download request.",
      };
    }

    const attachment = await prisma.sessionAttachment.findUnique({
      where: {
        id: attachmentId,
      },
      select: {
        id: true,
        name: true,
        url: true,
        type: true,
      },
    });

    if (!attachment) {
      return {
        success: false,
        data: null,
        message: "Attachment not found",
        reason: `No attachment was found with ID "${attachmentId}".`,
      };
    }

    const response = await fetch(attachment.url);

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: "Failed to download attachment",
        reason: `The file server returned HTTP ${response.status} while downloading the attachment.`,
      };
    }

    const arrayBuffer = await response.arrayBuffer();

    return {
      success: true,
      data: {
        name: attachment.name,
        type: attachment.type,
        file: Buffer.from(arrayBuffer).toString("base64"),
      },
      message: "Attachment downloaded successfully",
      reason: null,
    };
  } catch (error) {
    console.error("DOWNLOAD_SESSION_ATTACHMENT_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to download attachment",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while downloading the attachment.",
    };
  }
}
