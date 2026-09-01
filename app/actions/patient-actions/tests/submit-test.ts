"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { z } from "zod";

const SPECIAL_GROUPED_TEST_ID = "cmtb7wfhh0000f0tqg6zn7u0j";

const GROUP_SIZE = 15;

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

type GroupResult = {
  group: number;
  score: number;
  result: string;
  resultAr: string;
};

type SubmitTestSuccess = {
  success: true;
  message: string;
  data: {
    patientTestId: string;
    score: number | null;
    result: string | null;
    completedAt: Date | null;
    groupResults?: GroupResult[];
  };
};

type SubmitTestError = {
  success: false;
  message: string;
};

type SubmitTestResponse = SubmitTestSuccess | SubmitTestError;

function getSpecialGroupResult(score: number): {
  result: string;
  resultAr: string;
} {
  if (score >= 1 && score <= 7) {
    return {
      result: "Weak",
      resultAr: "ضعيف",
    };
  }

  if (score >= 8 && score <= 10) {
    return {
      result: "Moderate",
      resultAr: "متوسط",
    };
  }

  if (score >= 11 && score <= 15) {
    return {
      result: "Certain",
      resultAr: "أكيد",
    };
  }

  return {
    result: "No Result",
    resultAr: "لا توجد نتيجة",
  };
}

export async function submitTest(input: unknown): Promise<SubmitTestResponse> {
  // ==========================================
  // VALIDATE INPUT
  // ==========================================

  const validation = submitTestSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid test submission",
    };
  }

  const { patientTestId, answers } = validation.data;

  // ==========================================
  // AUTH
  // ==========================================

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  try {
    // ==========================================
    // GET PATIENT TEST
    // ==========================================

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

    // ==========================================
    // CHECK OWNERSHIP
    // ==========================================

    if (patientTest.patientId !== session.user.id) {
      return {
        success: false,
        message: "You are not allowed to submit this test",
      };
    }

    // ==========================================
    // CHECK TEST STATUS
    // ==========================================

    if (patientTest.status !== "IN_PROGRESS") {
      return {
        success: false,
        message: "This test is not currently in progress",
      };
    }

    // ==========================================
    // CHECK ACCESS
    // ==========================================

    const testAccess = await prisma.testAccess.findUnique({
      where: {
        userId_testId: {
          userId: patientTest.patientId,
          testId: patientTest.testId,
        },
      },

      select: {
        id: true,
        approval: true,
      },
    });

    if (!testAccess || !testAccess.approval) {
      return {
        success: false,
        message: "You no longer have access to this test",
      };
    }

    // ==========================================
    // GET QUESTIONS
    // ==========================================

    const questions = patientTest.test.questions;

    if (answers.length !== questions.length) {
      return {
        success: false,
        message: "Please answer all questions before submitting the test",
      };
    }

    // ==========================================
    // CHECK DUPLICATE QUESTIONS
    // ==========================================

    const questionIds = answers.map((answer) => answer.questionId);

    if (new Set(questionIds).size !== questionIds.length) {
      return {
        success: false,
        message: "Duplicate answers are not allowed",
      };
    }

    // ==========================================
    // VALIDATE ANSWERS
    // ==========================================

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

    // ==========================================
    // SPECIAL 225 QUESTIONS / 15 GROUPS TEST
    // ==========================================

    const isSpecialGroupedTest = patientTest.testId === SPECIAL_GROUPED_TEST_ID;

    let score: number;
    let result: string;
    let groupResults: GroupResult[] | undefined;

    if (isSpecialGroupedTest) {
      if (questions.length !== 225) {
        return {
          success: false,
          message: "This special test must contain exactly 225 questions",
        };
      }

      const answersMap = new Map(
        preparedAnswers.map((answer) => [answer.questionId, answer]),
      );

      groupResults = [];

      for (let groupIndex = 0; groupIndex < 15; groupIndex++) {
        const startIndex = groupIndex * GROUP_SIZE;
        const endIndex = startIndex + GROUP_SIZE;

        const groupQuestions = questions.slice(startIndex, endIndex);

        const groupScore = groupQuestions.reduce((total, question) => {
          const answer = answersMap.get(question.id);

          return total + (answer?.points ?? 0);
        }, 0);

        const groupRange = getSpecialGroupResult(groupScore);

        groupResults.push({
          group: groupIndex + 1,
          score: groupScore,
          result: groupRange.result,
          resultAr: groupRange.resultAr,
        });
      }

      score = preparedAnswers.reduce(
        (total, answer) => total + answer.points,
        0,
      );

      result = JSON.stringify(groupResults);
    } else {
      // ==========================================
      // NORMAL TEST SCORING
      // ==========================================

      score = preparedAnswers.reduce(
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

      result = resultRange.result;
    }

    const completedAt = new Date();

    // ==========================================
    // COMPLETE TEST + REVOKE ACCESS
    // ==========================================

    const completedTest = await prisma.$transaction(async (tx) => {
      await tx.answer.createMany({
        data: preparedAnswers.map((answer) => ({
          patientTestId,
          questionId: answer.questionId,
          optionId: answer.optionId,
          points: answer.points,
        })),
      });

      const completedTest = await tx.patientTest.update({
        where: {
          id: patientTestId,
        },

        data: {
          status: "COMPLETED",
          score,
          result,
          completedAt,
        },
      });

      await tx.testAccess.update({
        where: {
          userId_testId: {
            userId: patientTest.patientId,
            testId: patientTest.testId,
          },
        },

        data: {
          approval: false,
        },
      });

      return completedTest;
    });

    // ==========================================
    // SUCCESS
    // ==========================================

    return {
      success: true,
      message: "Test completed successfully",
      data: {
        patientTestId: completedTest.id,
        score: completedTest.score,
        result: completedTest.result,
        completedAt: completedTest.completedAt,
        groupResults,
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
