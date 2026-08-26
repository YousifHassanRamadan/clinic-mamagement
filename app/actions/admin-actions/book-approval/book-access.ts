"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function grantBookAccess(userId: string, bookId: string) {
  try {
    const session = await auth();

    // Admin only
    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized.",
      };
    }

    const admin = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    if (!admin || admin.role !== "DOCTOR") {
      return {
        success: false,
        message: "You are not authorized to perform this action.",
      };
    }

    if (!userId || !bookId) {
      return {
        success: false,
        message: "User and book are required.",
      };
    }

    // Make sure user exists and is a patient
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: "User not found.",
      };
    }

    if (user.role !== "PATIENT") {
      return {
        success: false,
        message: "Book access can only be granted to patients.",
      };
    }

    // Make sure book exists
    const book = await prisma.book.findUnique({
      where: {
        id: bookId,
      },
      select: {
        id: true,
        title: true,
        isActive: true,
      },
    });

    if (!book) {
      return {
        success: false,
        message: "Book not found.",
      };
    }

    if (!book.isActive) {
      return {
        success: false,
        message: "This book is not active.",
      };
    }

    // Create access if it doesn't exist,
    // otherwise update the existing access.
    const bookAccess = await prisma.bookAccess.upsert({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
      create: {
        userId,
        bookId,
        approval: true,
      },
      update: {
        approval: true,
      },
      select: {
        id: true,
        approval: true,
        userId: true,
        bookId: true,
      },
    });

    return {
      success: true,
      message: `${book.title} access granted successfully.`,
      data: bookAccess,
    };
  } catch (error) {
    console.error("GRANT_BOOK_ACCESS_ERROR:", error);

    return {
      success: false,
      message: "Something went wrong. Please try again.",
    };
  }
}
