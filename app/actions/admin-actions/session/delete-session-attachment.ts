"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import cloudinary from "@/lib/cloudinary";
import { z } from "zod";

const deleteAttachmentSchema = z.object({
  attachmentId: z.string().optional(),
  url: z.string().url(),
  type: z.string().min(1),
  publicId: z.string().optional(),
  resourceType: z.enum(["image", "raw", "video"]).optional(),
});

type DeleteAttachmentInput = z.infer<typeof deleteAttachmentSchema>;

export async function deleteSessionAttachment(input: DeleteAttachmentInput) {
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

    const data = parsed.data;

    let publicId = data.publicId;
    let resourceType = data.resourceType as
      | "image"
      | "raw"
      | "video"
      | undefined;

    /*
     * If this attachment already exists in DB,
     * use the stored Cloudinary information.
     */
    if (data.attachmentId) {
      const attachment = await prisma.sessionAttachment.findUnique({
        where: {
          id: data.attachmentId,
        },
        select: {
          id: true,
          url: true,
          type: true,
          publicId: true,
          resourceType: true,
        },
      });

      if (!attachment) {
        return {
          success: false,
          message: "Attachment not found",
        };
      }

      publicId = attachment.publicId ?? undefined;

      resourceType =
        (attachment.resourceType as "image" | "raw" | "video" | null) ??
        undefined;

      /*
       * Backward compatibility for old attachments
       * where publicId/resourceType were not saved.
       */
      if (!publicId) {
        const url = new URL(attachment.url);

        const pathParts = url.pathname.split("/").filter(Boolean);

        const uploadIndex = pathParts.indexOf("upload");

        if (uploadIndex === -1) {
          return {
            success: false,
            message: "Invalid Cloudinary URL",
          };
        }

        const publicIdParts = pathParts.slice(uploadIndex + 1);

        if (
          publicIdParts[0]?.startsWith("v") &&
          /^\d+$/.test(publicIdParts[0].substring(1))
        ) {
          publicIdParts.shift();
        }

        const fileName = publicIdParts.pop();

        if (!fileName) {
          return {
            success: false,
            message: "Could not determine Cloudinary public ID",
          };
        }

        const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");

        publicId = [...publicIdParts, fileNameWithoutExtension].join("/");
      }

      if (!resourceType) {
        resourceType = attachment.type.startsWith("image/")
          ? "image"
          : attachment.type.startsWith("audio/")
            ? "video"
            : "raw";
      }
    }

    /*
     * Attachment was uploaded to Cloudinary but
     * has not been saved to the database yet.
     */
    if (!data.attachmentId) {
      if (!publicId) {
        const url = new URL(data.url);

        const pathParts = url.pathname.split("/").filter(Boolean);

        const uploadIndex = pathParts.indexOf("upload");

        if (uploadIndex === -1) {
          return {
            success: false,
            message: "Invalid Cloudinary URL",
          };
        }

        const publicIdParts = pathParts.slice(uploadIndex + 1);

        if (
          publicIdParts[0]?.startsWith("v") &&
          /^\d+$/.test(publicIdParts[0].substring(1))
        ) {
          publicIdParts.shift();
        }

        const fileName = publicIdParts.pop();

        if (!fileName) {
          return {
            success: false,
            message: "Could not determine Cloudinary public ID",
          };
        }

        const fileNameWithoutExtension = fileName.replace(/\.[^/.]+$/, "");

        publicId = [...publicIdParts, fileNameWithoutExtension].join("/");
      }

      if (!resourceType) {
        resourceType = data.type.startsWith("image/")
          ? "image"
          : data.type.startsWith("audio/")
            ? "video"
            : "raw";
      }
    }

    if (!publicId || !resourceType) {
      return {
        success: false,
        message: "Cloudinary asset information is missing",
      };
    }

    /*
     * Delete from Cloudinary first.
     */
    const cloudinaryResult = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    if (
      cloudinaryResult.result !== "ok" &&
      cloudinaryResult.result !== "not found"
    ) {
      console.error("CLOUDINARY_DELETE_ERROR:", cloudinaryResult);

      return {
        success: false,
        message: "Failed to remove attachment from Cloudinary",
      };
    }

    /*
     * Delete from database only if it exists there.
     */
    if (data.attachmentId) {
      await prisma.sessionAttachment.delete({
        where: {
          id: data.attachmentId,
        },
      });
    }

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
