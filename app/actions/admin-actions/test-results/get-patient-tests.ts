// app/actions/admin-actions/test-results/get-patient-tests.ts

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

export async function getPatientTests(search = "") {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "DOCTOR") {
    return {
      success: false as const,
      message: "Unauthorized",
      data: [],
    };
  }

  try {
    const normalizedSearch = search.trim();

    const patientTests = await prisma.patientTest.findMany({
      where: normalizedSearch
        ? {
            OR: [
              {
                patient: {
                  firstName: {
                    contains: normalizedSearch,
                    mode: "insensitive",
                  },
                },
              },
              {
                patient: {
                  lastName: {
                    contains: normalizedSearch,
                    mode: "insensitive",
                  },
                },
              },
              {
                patient: {
                  firstNameAr: {
                    contains: normalizedSearch,
                    mode: "insensitive",
                  },
                },
              },
              {
                patient: {
                  lastNameAr: {
                    contains: normalizedSearch,
                    mode: "insensitive",
                  },
                },
              },
              {
                patient: {
                  email: {
                    contains: normalizedSearch,
                    mode: "insensitive",
                  },
                },
              },
              {
                test: {
                  title: {
                    contains: normalizedSearch,
                    mode: "insensitive",
                  },
                },
              },
              {
                test: {
                  titleAr: {
                    contains: normalizedSearch,
                    mode: "insensitive",
                  },
                },
              },
            ],
          }
        : undefined,

      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            firstNameAr: true,
            lastName: true,
            lastNameAr: true,
            email: true,
          },
        },

        test: {
          select: {
            id: true,
            title: true,
            titleAr: true,
            price: true,

            resultRanges: {
              select: {
                minScore: true,
                maxScore: true,
                result: true,
                resultAr: true,
                order: true,
              },
              orderBy: {
                order: "asc",
              },
            },
          },
        },

        answers: {
          select: {
            id: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true as const,

      data: patientTests.map((item) => {
        const isSpecialGroupedTest = item.test.id === SPECIAL_GROUPED_TEST_ID;

        const groupResults = isSpecialGroupedTest
          ? parseGroupResults(item.result)
          : null;

        const matchedRange =
          !isSpecialGroupedTest && item.score !== null
            ? item.test.resultRanges.find(
                (range) =>
                  item.score! >= range.minScore &&
                  item.score! <= range.maxScore,
              )
            : null;

        return {
          id: item.id,

          patient: item.patient,

          test: {
            id: item.test.id,
            title: item.test.title,
            titleAr: item.test.titleAr,
            price: Number(item.test.price),
          },

          status: item.status,

          score: item.score,

          result: isSpecialGroupedTest
            ? null
            : (item.result ?? matchedRange?.result ?? null),

          resultAr: isSpecialGroupedTest
            ? null
            : (matchedRange?.resultAr ?? null),

          groupResults,

          isSpecialGroupedTest,

          answersCount: item.answers.length,

          startedAt: item.startedAt,

          completedAt: item.completedAt,

          createdAt: item.createdAt,
        };
      }),
    };
  } catch (error) {
    console.error("GET_PATIENT_TESTS_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to load patient tests",
      data: [],
    };
  }
}
