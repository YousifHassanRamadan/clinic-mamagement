"use server";

import { prisma } from "@/lib/prisma";
import { createTestSchema } from "@/schemas/test.schema";
import { auth } from "@/providers/auth/auth";

export async function createTest(input: unknown) {
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

    const test = await prisma.$transaction(async (tx) => {
      const createdTest = await tx.psychologicalTest.create({
        data: {
          title,
          description: description || null,
          categoryId,
          isActive,
          createdById: session.user.id,

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

      return createdTest;
    });

    return {
      success: true,
      message: "Test created successfully",
      data: test,
    };
  } catch (error) {
    console.error("CREATE_TEST_ERROR:", error);

    return {
      success: false,
      message: "Failed to create test",
    };
  }
}
