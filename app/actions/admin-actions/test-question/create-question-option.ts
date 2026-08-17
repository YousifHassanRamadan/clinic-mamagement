"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { createQuestionOptionSchema } from "@/schemas/question.schema";

export async function createQuestionOption(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsed = createQuestionOptionSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const { questionId, text, points } = parsed.data;

    const question = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      select: {
        id: true,
      },
    });

    if (!question) {
      return {
        success: false,
        message: "Question not found",
      };
    }

    const lastOption = await prisma.questionOption.findFirst({
      where: {
        questionId,
      },
      orderBy: {
        order: "desc",
      },
      select: {
        order: true,
      },
    });

    const option = await prisma.questionOption.create({
      data: {
        questionId,
        text,
        points,
        order: (lastOption?.order ?? 0) + 1,
      },
    });

    return {
      success: true,
      message: "Option added successfully",
      data: option,
    };
  } catch (error) {
    console.error("CREATE_QUESTION_OPTION_ERROR:", error);

    return {
      success: false,
      message: "Failed to add option",
    };
  }
}
