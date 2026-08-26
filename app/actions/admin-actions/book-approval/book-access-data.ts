"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

async function verifyAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    return false;
  }

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

export async function getBookAccessBooks() {
  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return {
        success: false,
        message: "Unauthorized.",
        data: [],
      };
    }

    const books = await prisma.book.findMany({
      where: {
        isActive: true,
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
    console.error("GET_BOOK_ACCESS_BOOKS_ERROR:", error);

    return {
      success: false,
      message: "Failed to load books.",
      data: [],
    };
  }
}
