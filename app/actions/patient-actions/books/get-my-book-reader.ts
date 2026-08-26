// app/actions/patient-actions/books/get-my-book-reader.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getMyBookReader(bookId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "Unauthorized",
      };
    }

    if (!bookId) {
      return {
        success: false as const,
        message: "Book ID is required",
      };
    }

    const access = await prisma.bookAccess.findUnique({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId,
        },
      },

      select: {
        approval: true,

        book: {
          select: {
            id: true,
            title: true,
            titleAr: true,
            description: true,
            isActive: true,
            pageCount: true,
          },
        },

        user: {
          select: {
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    if (!access || !access.approval || !access.book || !access.book.isActive) {
      return {
        success: false as const,
        message: "You don't have access to this book.",
      };
    }

    return {
      success: true as const,

      book: {
        id: access.book.id,
        title: access.book.title,
        titleAr: access.book.titleAr,
        description: access.book.description,
        pageCount: access.book.pageCount,
      },

      reader: {
        name: `${access.user.firstName} ${access.user.lastName}`,
      },
    };
  } catch (error) {
    console.error("GET_MY_BOOK_READER_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to load book",
    };
  }
}
