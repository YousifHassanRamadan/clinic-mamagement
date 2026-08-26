// app/actions/patient-actions/books/get-books.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export type PatientBook = {
  id: string;
  title: string;
  titleAr: string | null;
  description: string | null;
  descriptionAr: string | null;
  price: number;
  coverImage: string | null;
  fileUrl: string | null;
};

export async function getPatientBooks() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        books: [] as PatientBook[],
        message: "Unauthorized",
      };
    }

    const books = await prisma.book.findMany({
      where: {
        isActive: true,

        accesses: {
          none: {
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
        fileUrl: true,
      },
    });

    const data: PatientBook[] = books.map((book) => ({
      id: book.id,
      title: book.title,
      titleAr: book.titleAr,
      description: book.description,
      descriptionAr: book.descriptionAr,
      price: Number(book.price),
      coverImage: book.coverImage,
      fileUrl: book.fileUrl,
    }));

    return {
      success: true as const,
      books: data,
    };
  } catch (error) {
    console.error("GET_PATIENT_BOOKS_ERROR:", error);

    return {
      success: false as const,
      books: [] as PatientBook[],
      message: "Failed to fetch books",
    };
  }
}
