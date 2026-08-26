// create-question.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

interface CreateQuestionInput {
  testId: string;
  question: string;
  questionAr?: string;
  options: {
    text: string;
    textAr?: string;
    points: number;
  }[];
}

export async function createQuestion(input: CreateQuestionInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const { testId, question, questionAr, options } = input;

    if (!testId) {
      return {
        success: false,
        message: "Test ID is required",
      };
    }

    if (!question.trim()) {
      return {
        success: false,
        message: "Question is required",
      };
    }

    if (!options || options.length < 2) {
      return {
        success: false,
        message: "At least two options are required",
      };
    }

    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
      select: {
        id: true,
      },
    });

    if (!test) {
      return {
        success: false,
        message: "Test not found",
      };
    }

    const lastQuestion = await prisma.question.findFirst({
      where: {
        testId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const questionOrder = (lastQuestion?.order ?? 0) + 1;

    const newQuestion = await prisma.question.create({
      data: {
        testId,
        question: question.trim(),
        questionAr: questionAr?.trim() || null,
        order: questionOrder,

        options: {
          create: options.map((option, index) => ({
            text: option.text.trim(),
            textAr: option.textAr?.trim() || null,
            points: option.points,
            order: index + 1,
          })),
        },
      },

      include: {
        options: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    return {
      success: true,
      message: "Question created successfully",
      data: {
        ...newQuestion,
        questionAr: newQuestion.questionAr ?? "",
        options: newQuestion.options.map((option) => ({
          ...option,
          textAr: option.textAr ?? "",
        })),
      },
    };
  } catch (error) {
    console.error("CREATE_QUESTION_ERROR:", error);

    return {
      success: false,
      message: "Failed to create question",
    };
  }
}
