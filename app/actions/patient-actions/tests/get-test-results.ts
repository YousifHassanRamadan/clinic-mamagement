// app/actions/patient-actions/tests/get-test-results.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

const SPECIAL_GROUPED_TEST_ID = "cmtb7wfhh0000f0tqg6zn7u0j";

type GroupResult = {
  group: number;
  score: number;
  result: string;
  resultAr: string;
};

function parseGroupResults(result: string | null): GroupResult[] | null {
  if (!result) return null;

  try {
    const parsed = JSON.parse(result);

    if (!Array.isArray(parsed)) {
      return null;
    }

    if (
      parsed.every(
        (item) =>
          typeof item?.group === "number" &&
          typeof item?.score === "number" &&
          typeof item?.result === "string" &&
          typeof item?.resultAr === "string",
      )
    ) {
      return parsed as GroupResult[];
    }

    return null;
  } catch {
    return null;
  }
}

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
      const isSpecialGroupedTest = item.test.id === SPECIAL_GROUPED_TEST_ID;

      const groupResults = isSpecialGroupedTest
        ? parseGroupResults(item.result)
        : null;

      const matchedRange = !isSpecialGroupedTest
        ? item.test.resultRanges.find(
            (range) =>
              item.score !== null &&
              item.score >= range.minScore &&
              item.score <= range.maxScore,
          )
        : null;

      return {
        id: item.id,
        status: item.status,
        score: item.score,
        result: isSpecialGroupedTest ? null : item.result,
        resultAr: isSpecialGroupedTest
          ? null
          : (matchedRange?.resultAr ?? null),

        groupResults,

        isSpecialGroupedTest,

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
