// delete-question.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function deleteQuestion(questionId: string) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    if (!questionId) {
      return {
        success: false,
        message: "Question ID is required",
      };
    }

    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      select: {
        id: true,
        testId: true,
        order: true,
      },
    });

    if (!question) {
      return {
        success: false,
        message: "Question not found",
      };
    }

    await prisma.question.delete({
      where: {
        id: questionId,
      },
    });

    await prisma.$transaction(async (tx) => {
      const remainingQuestions = await tx.question.findMany({
        where: {
          testId: question.testId,
        },
        orderBy: {
          order: "asc",
        },
        select: {
          id: true,
        },
      });

      for (const [index, item] of remainingQuestions.entries()) {
        await tx.question.update({
          where: {
            id: item.id,
          },
          data: {
            order: index + 1,
          },
        });
      }
    });

    return {
      success: true,
      message: "Question deleted successfully",
    };
  } catch (error) {
    console.error("DELETE_QUESTION_ERROR:", error);

    return {
      success: false,
      message: "Failed to delete question",
    };
  }
}
