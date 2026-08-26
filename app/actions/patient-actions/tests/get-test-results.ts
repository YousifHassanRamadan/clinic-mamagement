"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getTestResults() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "Unauthorized",
      };
    }

    const patientId = session.user.id;

    const patient = await prisma.user.findUnique({
      where: {
        id: patientId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!patient || patient.role !== "PATIENT") {
      return {
        success: false as const,
        message: "Only patients can access test results",
      };
    }

    const results = await prisma.patientTest.findMany({
      where: {
        patientId,
        status: "COMPLETED",
      },

      orderBy: {
        completedAt: "desc",
      },

      select: {
        id: true,

        status: true,
        score: true,
        result: true,

        startedAt: true,
        completedAt: true,

        test: {
          select: {
            id: true,
            title: true,
            titleAr: true,
            description: true,
            descriptionAr: true,

            category: {
              select: {
                id: true,
                name: true,
                nameAr: true,
              },
            },

            resultRanges: {
              select: {
                result: true,
                resultAr: true,
                minScore: true,
                maxScore: true,
                order: true,
              },

              orderBy: {
                order: "asc",
              },
            },
          },
        },
      },
    });

    const data = results.map((item) => {
      const matchedRange = item.test.resultRanges.find(
        (range) =>
          item.score !== null &&
          item.score >= range.minScore &&
          item.score <= range.maxScore,
      );

      return {
        id: item.id,
        status: item.status,
        score: item.score,
        result: item.result,
        resultAr: matchedRange?.resultAr ?? null,
        startedAt: item.startedAt,
        completedAt: item.completedAt,

        test: {
          id: item.test.id,
          title: item.test.title,
          titleAr: item.test.titleAr,
          description: item.test.description,
          descriptionAr: item.test.descriptionAr,

          category: item.test.category
            ? {
                id: item.test.category.id,
                name: item.test.category.name,
                nameAr: item.test.category.nameAr,
              }
            : null,
        },
      };
    });

    return {
      success: true as const,
      message: "Test results fetched successfully",
      data,
    };
  } catch (error) {
    console.error("GET_TEST_RESULTS_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to get test results",
    };
  }
}
