// app/actions/patient-actions/books/get-my-books.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export type MyBook = {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  price: number;
  coverImage: string | null;
  purchasedAt: Date;
};

export async function getMyBooks() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        books: [] as MyBook[],
        message: "Unauthorized",
      };
    }

    const books = await prisma.book.findMany({
      where: {
        isActive: true,

        accesses: {
          some: {
            userId: session.user.id,
            approval: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      select: {
        id: true,
        title: true,
        titleAr: true,
        description: true,
        descriptionAr: true,
        price: true,
        coverImage: true,

        accesses: {
          where: {
            userId: session.user.id,
            approval: true,
          },

          select: {
            createdAt: true,
          },

          take: 1,
        },
      },
    });

    const data: MyBook[] = books.map((book) => ({
      id: book.id,
      title: book.title,
      titleAr: book.titleAr,
      description: book.description,
      descriptionAr: book.descriptionAr,
      price: Number(book.price),
      coverImage: book.coverImage,
      purchasedAt: book.accesses[0]?.createdAt ?? new Date(),
    }));

    return {
      success: true as const,
      books: data,
    };
  } catch (error) {
    console.error("GET_MY_BOOKS_ERROR:", error);

    return {
      success: false as const,
      books: [] as MyBook[],
      message: "Failed to fetch your books",
    };
  }
}
