// update-question.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { updateQuestionSchema } from "@/schemas/question.schema";

export async function updateQuestion(input: unknown) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: "Unauthorized",
      };
    }

    const parsed = updateQuestionSchema.safeParse(input);

    if (!parsed.success) {
      return {
        success: false,
        message: parsed.error.issues[0]?.message ?? "Invalid input",
      };
    }

    const { questionId, question, questionAr, options } = parsed.data;

    const existingQuestion = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        options: true,
      },
    });

    if (!existingQuestion) {
      return {
        success: false,
        message: "Question not found",
      };
    }

    const existingOptionIds = new Set(
      existingQuestion.options.map((option) => option.id),
    );

    const incomingOptionIds = new Set(
      options
        .filter((option) => option.id)
        .map((option) => option.id as string),
    );

    const deletedOptionIds = existingQuestion.options
      .filter((option) => !incomingOptionIds.has(option.id))
      .map((option) => option.id);

    await prisma.$transaction(async (tx) => {
      await tx.question.update({
        where: {
          id: questionId,
        },
        data: {
          question,
          questionAr: questionAr || null,
        },
      });

      if (deletedOptionIds.length > 0) {
        await tx.questionOption.deleteMany({
          where: {
            id: {
              in: deletedOptionIds,
            },
          },
        });
      }

      for (const option of options) {
        if (option.id && existingOptionIds.has(option.id)) {
          await tx.questionOption.update({
            where: {
              id: option.id,
            },
            data: {
              text: option.text,
              textAr: option.textAr || null,
              points: option.points,
              order: option.order,
            },
          });
        } else {
          await tx.questionOption.create({
            data: {
              questionId,
              text: option.text,
              textAr: option.textAr || null,
              points: option.points,
              order: option.order,
            },
          });
        }
      }
    });

    const updatedQuestion = await prisma.question.findUnique({
      where: {
        id: questionId,
      },
      include: {
        options: {
          orderBy: {
            order: "asc",
          },
        },
      },
    });

    if (!updatedQuestion) {
      return {
        success: false,
        message: "Question not found after update",
      };
    }

    return {
      success: true,
      message: "Question saved successfully",
      data: {
        ...updatedQuestion,
        questionAr: updatedQuestion.questionAr ?? "",
        options: updatedQuestion.options.map((option) => ({
          ...option,
          textAr: option.textAr ?? "",
        })),
      },
    };
  } catch (error) {
    console.error("UPDATE_QUESTION_ERROR:", error);

    return {
      success: false,
      message: "Failed to save question",
    };
  }
}
