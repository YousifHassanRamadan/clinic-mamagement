"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getTestById(testId: string) {
  if (!testId) {
    return {
      success: false as const,
      message: "Test ID is required",
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false as const,
      message: "Unauthorized",
    };
  }

  try {
    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
      include: {
        category: true,

        resultRanges: {
          orderBy: {
            minScore: "asc",
          },
        },
      },
    });

    if (!test) {
      return {
        success: false as const,
        message: "Test not found",
      };
    }

    return {
      success: true as const,
      data: test,
    };
  } catch (error) {
    console.error("GET_TEST_BY_ID_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to get test",
    };
  }
}
