// get-test-questions.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getTestQuestions(testId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!testId) {
      return {
        success: false,
        message: "Test ID is required",
      };
    }

    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
      select: {
        id: true,
        title: true,
        titleAr: true,

        questions: {
          orderBy: {
            order: "asc",
          },

          include: {
            options: {
              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    if (!test) {
      return {
        success: false,
        message: "Test not found",
      };
    }

    return {
      success: true,
      data: test,
    };
  } catch (error) {
    console.error("GET_TEST_QUESTIONS_ERROR:", error);

    return {
      success: false,
      message: "Failed to load test questions",
    };
  }
}
