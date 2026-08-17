"use server";

import { prisma } from "@/lib/prisma";

export type PsychologicalTestWithStats = {
  id: string;
  title: string;
  description: string | null;
  isActive: boolean;
  categoryId: string | null;
  createdById: string;
  createdAt: Date;
  updatedAt: Date;

  category: {
    id: string;
    name: string;
  } | null;

  _count: {
    questions: number;
    patientTests: number;
  };

  completedCount: number;
};

interface GetTestsInput {
  search?: string;
  status?: "all" | "active" | "inactive";
  categoryId?: string;
}

export async function getTests(input: GetTestsInput = {}) {
  try {
    const { search = "", status = "all", categoryId = "" } = input;

    const tests = await prisma.psychologicalTest.findMany({
      where: {
        ...(search.trim()
          ? {
              title: {
                contains: search.trim(),
                mode: "insensitive",
              },
            }
          : {}),

        ...(status === "active"
          ? {
              isActive: true,
            }
          : status === "inactive"
            ? {
                isActive: false,
              }
            : {}),

        ...(categoryId
          ? {
              categoryId,
            }
          : {}),
      },

      include: {
        category: {
          select: {
            id: true,
            name: true,
          },
        },

        _count: {
          select: {
            questions: true,
            patientTests: true,
          },
        },

        patientTests: {
          where: {
            status: "COMPLETED",
          },
          select: {
            id: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const data: PsychologicalTestWithStats[] = tests.map((test) => ({
      id: test.id,
      title: test.title,
      description: test.description,
      isActive: test.isActive,
      categoryId: test.categoryId,
      createdById: test.createdById,
      createdAt: test.createdAt,
      updatedAt: test.updatedAt,

      category: test.category,

      _count: test._count,

      completedCount: test.patientTests.length,
    }));

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("GET_TESTS_ERROR:", error);

    return {
      success: false,
      data: [] as PsychologicalTestWithStats[],
      message: "Failed to fetch tests",
    };
  }
}

export async function getTestById(testId: string) {
  if (!testId) {
    return {
      success: false,
      data: null,
      message: "Test ID is required",
    };
  }

  try {
    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },

      select: {
        id: true,
        title: true,
        description: true,
        isActive: true,
        categoryId: true,
      },
    });

    if (!test) {
      return {
        success: false,
        data: null,
        message: "Test not found",
      };
    }

    return {
      success: true,
      data: test,
    };
  } catch (error) {
    console.error("GET_TEST_BY_ID_ERROR:", error);

    return {
      success: false,
      data: null,
      message: "Failed to fetch test",
    };
  }
}
