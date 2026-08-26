"use server";

import { cookies } from "next/headers";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import {
  BOOK_READER_COOKIE,
  createBookReaderToken,
  verifyBookReaderToken,
} from "@/lib/book-reader-token";

const TOKEN_TTL_SECONDS = 15 * 60;

export async function startBookReader(bookId: string) {
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
            isActive: true,
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

    const cookieStore = await cookies();
    const existingToken = cookieStore.get(BOOK_READER_COOKIE)?.value;

    let token: string;

    if (existingToken) {
      const existingTokenData = verifyBookReaderToken(existingToken);

      if (
        existingTokenData &&
        existingTokenData.userId === session.user.id &&
        existingTokenData.bookId === access.book.id
      ) {
        token = existingToken;
      } else {
        token = createBookReaderToken(session.user.id, access.book.id);
      }
    } else {
      token = createBookReaderToken(session.user.id, access.book.id);
    }

    cookieStore.set(BOOK_READER_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: TOKEN_TTL_SECONDS,
    });

    return {
      success: true as const,
    };
  } catch (error) {
    console.error("START_BOOK_READER_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to start book reader",
    };
  }
}
