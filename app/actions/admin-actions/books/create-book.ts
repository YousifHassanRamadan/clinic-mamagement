// create-book.ts

"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function createBook(formData: FormData) {
  let uploadedFilePublicId: string | null = null;
  let uploadedCoverPublicId: string | null = null;

  try {
    const title = formData.get("title")?.toString().trim();
    const titleAr = formData.get("titleAr")?.toString().trim();

    const description = formData.get("description")?.toString().trim();
    const descriptionAr = formData.get("descriptionAr")?.toString().trim();

    const priceValue = formData.get("price")?.toString();

    const file = formData.get("file");
    const coverImage = formData.get("coverImage");

    if (!title) {
      return {
        success: false,
        message: "Book title is required.",
      };
    }

    if (!titleAr) {
      return {
        success: false,
        message: "اسم الكتاب بالعربي مطلوب.",
      };
    }

    const price = Number(priceValue);

    if (!Number.isFinite(price) || price < 0) {
      return {
        success: false,
        message: "Please enter a valid price.",
      };
    }

    if (!(file instanceof File) || file.size === 0) {
      return {
        success: false,
        message: "Book PDF is required.",
      };
    }

    if (file.type !== "application/pdf") {
      return {
        success: false,
        message: "Only PDF files are allowed.",
      };
    }

    const MAX_FILE_SIZE = 20 * 1024 * 1024;

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: "PDF maximum size is 20MB.",
      };
    }

    if (!(coverImage instanceof File) || coverImage.size === 0) {
      return {
        success: false,
        message: "Book cover is required.",
      };
    }

    const allowedCoverTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedCoverTypes.includes(coverImage.type)) {
      return {
        success: false,
        message: "Cover must be JPG, PNG, or WEBP.",
      };
    }

    const MAX_COVER_SIZE = 5 * 1024 * 1024;

    if (coverImage.size > MAX_COVER_SIZE) {
      return {
        success: false,
        message: "Cover image maximum size is 5MB.",
      };
    }

    // =========================
    // UPLOAD PDF
    // =========================

    const fileBuffer = Buffer.from(await file.arrayBuffer());

    const uploadedFile = await new Promise<{
      secure_url: string;
      public_id: string;
      pages: number;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "clinic/books",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("PDF upload failed."));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
            pages: result.pages || 0,
          });
        },
      );

      uploadStream.end(fileBuffer);
    });

    uploadedFilePublicId = uploadedFile.public_id;

    // =========================
    // UPLOAD COVER
    // =========================

    const coverBuffer = Buffer.from(await coverImage.arrayBuffer());

    const uploadedCover = await new Promise<{
      secure_url: string;
      public_id: string;
    }>((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "image",
          folder: "clinic/book-covers",
          use_filename: true,
          unique_filename: true,
          overwrite: false,
        },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }

          if (!result) {
            reject(new Error("Cover upload failed."));
            return;
          }

          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        },
      );

      uploadStream.end(coverBuffer);
    });

    uploadedCoverPublicId = uploadedCover.public_id;

    // =========================
    // CREATE BOOK
    // =========================

    await prisma.book.create({
      data: {
        title,
        titleAr: titleAr || null,

        description: description || null,
        descriptionAr: descriptionAr || null,

        price,

        fileUrl: uploadedFile.secure_url,
        cloudinaryPublicId: uploadedFile.public_id,

        coverImage: uploadedCover.secure_url,
        coverImagePublicId: uploadedCover.public_id,

        pageCount: uploadedFile.pages,
      },
    });

    revalidatePath("/dashboard/admin/books");

    return {
      success: true,
      message: "Book created successfully.",
    };
  } catch (error) {
    console.error("CREATE_BOOK_ERROR:", error);

    if (uploadedFilePublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedFilePublicId, {
          resource_type: "raw",
          invalidate: true,
        });
      } catch (cleanupError) {
        console.error("PDF_CLEANUP_ERROR:", cleanupError);
      }
    }

    if (uploadedCoverPublicId) {
      try {
        await cloudinary.uploader.destroy(uploadedCoverPublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (cleanupError) {
        console.error("COVER_CLEANUP_ERROR:", cleanupError);
      }
    }

    return {
      success: false,
      message: "Failed to create book.",
    };
  }
}
