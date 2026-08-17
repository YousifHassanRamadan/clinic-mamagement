"use server";

import { prisma } from "@/lib/prisma";

export async function getTests() {
  try {
    const tests = await prisma.psychologicalTest.findMany({
      where: {
        isActive: true,
      },
      include: {
        category: true,
        _count: {
          select: {
            questions: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      tests,
    };
  } catch (error) {
    console.error("GET_TESTS_ERROR:", error);

    return {
      success: false,
      message: "Failed to get tests",
      tests: [],
    };
  }
}
