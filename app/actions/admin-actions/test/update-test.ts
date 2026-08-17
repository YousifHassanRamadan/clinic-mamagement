"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { createTestSchema } from "@/schemas/test.schema";

export async function updateTest(testId: string, input: unknown) {
  if (!testId) {
    return {
      success: false,
      message: "Test ID is required",
    };
  }

  const validation = createTestSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid test data",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const { title, description, categoryId, isActive, ranges } = validation.data;

  try {
    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
    });

    if (!test) {
      return {
        success: false,
        message: "Test not found",
      };
    }

    const category = await prisma.testCategory.findUnique({
      where: {
        id: categoryId,
      },
    });

    if (!category) {
      return {
        success: false,
        message: "Category not found",
      };
    }

    const updatedTest = await prisma.$transaction(async (tx) => {
      await tx.testResultRange.deleteMany({
        where: {
          testId,
        },
      });

      return tx.psychologicalTest.update({
        where: {
          id: testId,
        },

        data: {
          title,
          description: description || null,
          categoryId,
          isActive,

          resultRanges: {
            create: ranges.map((range, index) => ({
              minScore: range.minScore,
              maxScore: range.maxScore,
              result: range.result,
              order: index + 1,
            })),
          },
        },

        include: {
          resultRanges: {
            orderBy: {
              order: "asc",
            },
          },
        },
      });
    });

    return {
      success: true,
      message: "Test updated successfully",
      data: updatedTest,
    };
  } catch (error) {
    console.error("UPDATE_TEST_ERROR:", error);

    return {
      success: false,
      message: "Failed to update test",
    };
  }
}
