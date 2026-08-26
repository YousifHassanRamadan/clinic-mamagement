// download-session-attachment.ts

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
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        data: null,
        message: "You are not allowed to download attachments",
      };
    }

    if (!attachmentId) {
      return {
        success: false,
        data: null,
        message: "Attachment ID is required",
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
      };
    }

    const response = await fetch(attachment.url);

    if (!response.ok) {
      return {
        success: false,
        data: null,
        message: "Failed to download attachment",
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
    };
  } catch (error) {
    console.error("DOWNLOAD_SESSION_ATTACHMENT_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to download attachment",
    };
  }
}
