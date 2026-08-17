"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { z } from "zod";

const submitTestSchema = z.object({
  patientTestId: z.string().min(1, "Patient test ID is required"),

  answers: z
    .array(
      z.object({
        questionId: z.string().min(1),
        optionId: z.string().min(1),
      }),
    )
    .min(1, "At least one answer is required"),
});

type SubmitTestSuccess = {
  success: true;
  message: string;
  data: {
    patientTestId: string;
    score: number | null;
    result: string | null;
    completedAt: Date | null;
  };
};

type SubmitTestError = {
  success: false;
  message: string;
};

type SubmitTestResponse = SubmitTestSuccess | SubmitTestError;

export async function submitTest(input: unknown): Promise<SubmitTestResponse> {
  const validation = submitTestSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid test submission",
    };
  }

  const { patientTestId, answers } = validation.data;

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    const patientTest = await prisma.patientTest.findUnique({
      where: {
        id: patientTestId,
      },

      include: {
        test: {
          include: {
            questions: {
              include: {
                options: true,
              },
              orderBy: {
                order: "asc",
              },
            },

            resultRanges: {
              orderBy: {
                minScore: "asc",
              },
            },
          },
        },
      },
    });

    if (!patientTest) {
      return {
        success: false,
        message: "Test attempt not found",
      };
    }

    if (patientTest.patientId !== session.user.id) {
      return {
        success: false,
        message: "You are not allowed to submit this test",
      };
    }

    if (patientTest.status !== "IN_PROGRESS") {
      return {
        success: false,
        message: "This test is not currently in progress",
      };
    }

    const questions = patientTest.test.questions;

    if (answers.length !== questions.length) {
      return {
        success: false,
        message: "Please answer all questions before submitting the test",
      };
    }

    const questionIds = answers.map((answer) => answer.questionId);

    if (new Set(questionIds).size !== questionIds.length) {
      return {
        success: false,
        message: "Duplicate answers are not allowed",
      };
    }

    const preparedAnswers: {
      questionId: string;
      optionId: string;
      points: number;
    }[] = [];

    for (const answer of answers) {
      const question = questions.find(
        (question) => question.id === answer.questionId,
      );

      if (!question) {
        return {
          success: false,
          message: "Invalid question submitted",
        };
      }

      const option = question.options.find(
        (option) => option.id === answer.optionId,
      );

      if (!option) {
        return {
          success: false,
          message: "Invalid answer option submitted",
        };
      }

      preparedAnswers.push({
        questionId: question.id,
        optionId: option.id,
        points: option.points,
      });
    }

    const score = preparedAnswers.reduce(
      (total, answer) => total + answer.points,
      0,
    );

    const resultRange = patientTest.test.resultRanges.find(
      (range) => score >= range.minScore && score <= range.maxScore,
    );

    if (!resultRange) {
      return {
        success: false,
        message: `No result range found for score ${score}`,
      };
    }

    const completedAt = new Date();

    const completedTest = await prisma.$transaction(async (tx) => {
      await tx.answer.createMany({
        data: preparedAnswers.map((answer) => ({
          patientTestId,
          questionId: answer.questionId,
          optionId: answer.optionId,
          points: answer.points,
        })),
      });

      return tx.patientTest.update({
        where: {
          id: patientTestId,
        },

        data: {
          status: "COMPLETED",
          score,
          result: resultRange.result,
          completedAt,
        },
      });
    });

    return {
      success: true,
      message: "Test completed successfully",
      data: {
        patientTestId: completedTest.id,
        score: completedTest.score,
        result: completedTest.result,
        completedAt: completedTest.completedAt,
      },
    };
  } catch (error) {
    console.error("SUBMIT_TEST_ERROR:", error);

    return {
      success: false,
      message: "Failed to submit test",
    };
  }
}
