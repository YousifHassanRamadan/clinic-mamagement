// get-books.ts

"use server";

import { prisma } from "@/lib/prisma";

export async function getBooks() {
  try {
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,

        title: true,
        titleAr: true,

        description: true,
        descriptionAr: true,

        coverImage: true,
        fileUrl: true,

        isActive: true,
        createdAt: true,
        price: true,

        _count: {
          select: {
            accesses: true,
          },
        },
      },
    });

    const serializedBooks = books.map((book) => ({
      ...book,
      price: Number(book.price),
    }));

    return {
      success: true,
      books: serializedBooks,
    };
  } catch (error) {
    console.error("GET_BOOKS_ERROR:", error);

    return {
      success: false,
      books: [],
      message: "Failed to fetch books.",
    };
  }
}
