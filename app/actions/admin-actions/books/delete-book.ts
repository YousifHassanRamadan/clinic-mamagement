// delete-book.ts

"use server";

import { revalidatePath } from "next/cache";

import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";

export async function deleteBook(bookId: string) {
  try {
    if (!bookId) {
      return {
        success: false,
        message: "Book ID is required.",
      };
    }

    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        id: true,
        cloudinaryPublicId: true,
        coverImagePublicId: true,
      },
    });

    if (!book) {
      return {
        success: false,
        message: "Book not found.",
      };
    }

    // Delete PDF
    if (book.cloudinaryPublicId) {
      await cloudinary.uploader.destroy(book.cloudinaryPublicId, {
        resource_type: "raw",
        invalidate: true,
      });
    }

    // Delete Cover
    if (book.coverImagePublicId) {
      await cloudinary.uploader.destroy(book.coverImagePublicId, {
        resource_type: "image",
        invalidate: true,
      });
    }

    // Delete DB record
    await prisma.book.delete({
      where: {
        id: bookId,
      },
    });

    revalidatePath("/dashboard/admin/books");

    return {
      success: true,
      message: "Book deleted successfully.",
    };
  } catch (error) {
    console.error("DELETE_BOOK_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete book.",
    };
  }
}
