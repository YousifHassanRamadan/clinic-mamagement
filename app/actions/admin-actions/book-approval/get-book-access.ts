"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

async function verifyAdmin() {
  const session = await auth();

  if (!session?.user?.id) return false;

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  });

  return user?.role === "DOCTOR";
}

export async function getBookAccessUsers() {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized.",
        data: [],
      };
    }

    const users = await prisma.user.findMany({
      where: {
        role: "PATIENT",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error("GET_BOOK_ACCESS_USERS_ERROR:", error);

    return {
      success: false,
      message: "Failed to load patients.",
      data: [],
    };
  }
}

export async function getAvailableBooksForUser(userId: string) {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized.",
        data: [],
      };
    }

    if (!userId) {
      return {
        success: false,
        message: "User ID is required.",
        data: [],
      };
    }

    const books = await prisma.book.findMany({
      where: {
        isActive: true,

        accesses: {
          none: {
            userId,
            approval: true,
          },
        },
      },
      select: {
        id: true,
        title: true,
        description: true,
        coverImage: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: books,
    };
  } catch (error) {
    console.error("GET_AVAILABLE_BOOKS_ERROR:", error);

    return {
      success: false,
      message: "Failed to load available books.",
      data: [],
    };
  }
}
