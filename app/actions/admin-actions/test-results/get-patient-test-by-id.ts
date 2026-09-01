// app/actions/admin-actions/test-results/get-patient-test-by-id.ts

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

export async function getPatientTestById(patientTestId: string) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "DOCTOR") {
    return {
      success: false as const,
      message: "Unauthorized",
      data: null,
    };
  }

  if (!patientTestId) {
    return {
      success: false as const,
      message: "Patient test ID is required",
      data: null,
    };
  }

  try {
    const patientTest = await prisma.patientTest.findUnique({
      where: {
        id: patientTestId,
      },

      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            firstNameAr: true,
            lastName: true,
            lastNameAr: true,
            email: true,
            phone: true,
          },
        },

        test: {
          select: {
            id: true,
            title: true,
            titleAr: true,
            description: true,
            descriptionAr: true,

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
          orderBy: {
            createdAt: "asc",
          },

          include: {
            question: {
              select: {
                id: true,
                question: true,
                questionAr: true,
                order: true,
              },
            },

            option: {
              select: {
                id: true,
                text: true,
                textAr: true,
                points: true,
                order: true,
              },
            },
          },
        },
      },
    });

    if (!patientTest) {
      return {
        success: false as const,
        message: "Patient test not found",
        data: null,
      };
    }

    const isSpecialGroupedTest =
      patientTest.test.id === SPECIAL_GROUPED_TEST_ID;

    const groupResults = isSpecialGroupedTest
      ? parseGroupResults(patientTest.result)
      : null;

    const matchedRange =
      !isSpecialGroupedTest && patientTest.score !== null
        ? patientTest.test.resultRanges.find(
            (range) =>
              patientTest.score! >= range.minScore &&
              patientTest.score! <= range.maxScore,
          )
        : null;

    return {
      success: true as const,

      data: {
        id: patientTest.id,

        status: patientTest.status,

        score: patientTest.score,

        result: isSpecialGroupedTest
          ? null
          : (patientTest.result ?? matchedRange?.result ?? null),

        resultAr: isSpecialGroupedTest
          ? null
          : (matchedRange?.resultAr ?? null),

        groupResults,

        isSpecialGroupedTest,

        startedAt: patientTest.startedAt,

        completedAt: patientTest.completedAt,

        createdAt: patientTest.createdAt,

        patient: patientTest.patient,

        test: {
          id: patientTest.test.id,
          title: patientTest.test.title,
          titleAr: patientTest.test.titleAr,
          description: patientTest.test.description,
          descriptionAr: patientTest.test.descriptionAr,
        },

        answers: patientTest.answers.map((answer) => ({
          id: answer.id,

          points: answer.points,

          question: answer.question,

          option: answer.option,

          createdAt: answer.createdAt,
        })),
      },
    };
  } catch (error) {
    console.error("GET_PATIENT_TEST_BY_ID_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to load patient test",
      data: null,
    };
  }
}
