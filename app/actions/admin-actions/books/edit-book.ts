// edit-book.ts

"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function updateBook(bookId: string, formData: FormData) {
  let newFilePublicId: string | null = null;
  let newCoverPublicId: string | null = null;

  try {
    // =========================
    // VALIDATION
    // =========================

    if (!bookId) {
      return {
        success: false,
        message: "Book ID is required.",
      };
    }

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

    // =========================
    // GET EXISTING BOOK
    // =========================

    const existingBook = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!existingBook) {
      return {
        success: false,
        message: "Book not found.",
      };
    }

    // =========================
    // BOOK DATA
    // =========================

    const data: {
      title: string;
      titleAr: string | null;
      description: string | null;
      descriptionAr: string | null;
      price: number;
      fileUrl?: string;
      cloudinaryPublicId?: string;
      pageCount?: number;
      coverImage?: string;
      coverImagePublicId?: string;
    } = {
      title,
      titleAr: titleAr || null,
      description: description || null,
      descriptionAr: descriptionAr || null,
      price,
    };

    // =========================
    // NEW PDF
    // =========================

    if (file instanceof File && file.size > 0) {
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

      const buffer = Buffer.from(await file.arrayBuffer());

      const uploadedFile = await new Promise<{
        secure_url: string;
        public_id: string;
        pages: number;
      }>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            // IMPORTANT:
            // PDF must be uploaded as an image resource
            // so Cloudinary can generate individual pages.
            resource_type: "image",

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

            console.log("CLOUDINARY PDF UPLOAD:", {
              publicId: result.public_id,
              resourceType: result.resource_type,
              format: result.format,
              pages: result.pages,
              secureUrl: result.secure_url,
            });

            resolve({
              secure_url: result.secure_url,
              public_id: result.public_id,
              pages: result.pages || 0,
            });
          },
        );

        uploadStream.end(buffer);
      });

      newFilePublicId = uploadedFile.public_id;

      // Make sure Cloudinary actually detected the pages.
      if (!uploadedFile.pages || uploadedFile.pages < 1) {
        throw new Error("Cloudinary could not determine the PDF page count.");
      }

      data.fileUrl = uploadedFile.secure_url;
      data.cloudinaryPublicId = uploadedFile.public_id;
      data.pageCount = uploadedFile.pages;
    }

    // =========================
    // NEW COVER
    // =========================

    if (coverImage instanceof File && coverImage.size > 0) {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

      if (!allowedTypes.includes(coverImage.type)) {
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

      const buffer = Buffer.from(await coverImage.arrayBuffer());

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

        uploadStream.end(buffer);
      });

      newCoverPublicId = uploadedCover.public_id;

      data.coverImage = uploadedCover.secure_url;
      data.coverImagePublicId = uploadedCover.public_id;
    }

    // =========================
    // UPDATE DATABASE
    // =========================

    await prisma.book.update({
      where: {
        id: bookId,
      },
      data,
    });

    // =========================
    // DELETE OLD PDF
    // =========================

    if (newFilePublicId && existingBook.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(existingBook.cloudinaryPublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (error) {
        console.error("OLD_PDF_DELETE_ERROR:", error);
      }
    }

    // =========================
    // DELETE OLD COVER
    // =========================

    if (newCoverPublicId && existingBook.coverImagePublicId) {
      try {
        await cloudinary.uploader.destroy(existingBook.coverImagePublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (error) {
        console.error("OLD_COVER_DELETE_ERROR:", error);
      }
    }

    // =========================
    // REVALIDATE
    // =========================

    revalidatePath("/dashboard/admin/books");

    return {
      success: true,
      message: "Book updated successfully.",
    };
  } catch (error) {
    console.error("UPDATE_BOOK_ERROR:", error);

    // =========================
    // CLEANUP NEW PDF
    // =========================

    if (newFilePublicId) {
      try {
        await cloudinary.uploader.destroy(newFilePublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (cleanupError) {
        console.error("PDF_CLEANUP_ERROR:", cleanupError);
      }
    }

    // =========================
    // CLEANUP NEW COVER
    // =========================

    if (newCoverPublicId) {
      try {
        await cloudinary.uploader.destroy(newCoverPublicId, {
          resource_type: "image",
          invalidate: true,
        });
      } catch (cleanupError) {
        console.error("COVER_CLEANUP_ERROR:", cleanupError);
      }
    }

    return {
      success: false,
      message: "Failed to update book.",
    };
  }
}
