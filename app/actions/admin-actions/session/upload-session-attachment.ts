"use server";

import { auth } from "@/providers/auth/auth";
import cloudinary from "@/lib/cloudinary";

export async function uploadSessionAttachment(formData: FormData) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: null,
        message: "Unauthorized",
        reason: "You must be logged in to upload a session attachment.",
      };
    }

    const file = formData.get("file");

    if (!(file instanceof File)) {
      return {
        success: false,
        data: null,
        message: "No file provided",
        reason: "The upload request does not contain a valid file.",
      };
    }

    if (file.size <= 0) {
      return {
        success: false,
        data: null,
        message: "Invalid file",
        reason: "The selected file is empty and cannot be uploaded.",
      };
    }

    const maxSize = 10 * 1024 * 1024;

    if (file.size > maxSize) {
      return {
        success: false,
        data: null,
        message: "File size cannot exceed 10 MB",
        reason: `The selected file is ${(file.size / 1024 / 1024).toFixed(
          2,
        )} MB. The maximum allowed size is 10 MB.`,
      };
    }

    const allowedTypes = [
      "image/png",
      "image/jpeg",
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "audio/mpeg",
      "audio/wav",
    ];

    if (!allowedTypes.includes(file.type)) {
      return {
        success: false,
        data: null,
        message: "File type is not supported",
        reason: `The file type "${file.type || "unknown"}" is not supported. Please upload an image, PDF, Word document, or supported audio file.`,
      };
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const resourceType = file.type.startsWith("image/")
      ? "image"
      : file.type.startsWith("audio/")
        ? "video"
        : "raw";

    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      resource_type: string;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: "sessions",
          resource_type: resourceType,
        },
        (error, result) => {
          if (error || !result) {
            reject(error ?? new Error("Cloudinary upload failed"));

            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
          });
        },
      );

      uploadStream.end(buffer);
    });

    return {
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        resourceType: result.resource_type,
        name: file.name,
        size: file.size,
        type: file.type,
      },
      message: "File uploaded successfully",
      reason: null,
    };
  } catch (error) {
    console.error("UPLOAD_SESSION_ATTACHMENT_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to upload file",
      reason:
        error instanceof Error
          ? error.message
          : "An unexpected error occurred while uploading the file.",
    };
  }
}
