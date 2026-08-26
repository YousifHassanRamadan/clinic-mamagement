// app/actions/patient-actions/books/get-my-book-reader.ts

"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import {
  BOOK_READER_COOKIE,
  createBookReaderToken,
  verifyBookReaderToken,
} from "@/lib/book-reader-token";

export async function getMyBookReader(bookId?: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "Unauthorized",
      };
    }

    const cookieStore = await cookies();

    const existingToken = cookieStore.get(BOOK_READER_COOKIE)?.value;

    let targetBookId = bookId;

    if (!targetBookId && existingToken) {
      const tokenData = verifyBookReaderToken(existingToken);

      if (tokenData && tokenData.userId === session.user.id) {
        targetBookId = tokenData.bookId;
      }
    }

    if (!targetBookId) {
      return {
        success: false as const,
        message: "Book ID is required",
      };
    }

    const access = await prisma.bookAccess.findUnique({
      where: {
        userId_bookId: {
          userId: session.user.id,
          bookId: targetBookId,
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
      cookieStore.delete(BOOK_READER_COOKIE);

      return {
        success: false as const,
        message: "You don't have access to this book.",
      };
    }

    const token = createBookReaderToken(session.user.id, access.book.id);

    cookieStore.set(BOOK_READER_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 15 * 60,
    });

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
