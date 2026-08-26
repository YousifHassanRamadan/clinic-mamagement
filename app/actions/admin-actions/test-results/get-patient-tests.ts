// app/actions/admin-actions/test-results/get-patient-tests.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getPatientTests(search = "") {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "DOCTOR") {
    return {
      success: false,
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
      success: true,
      data: patientTests.map((item) => ({
        id: item.id,
        patient: item.patient,
        test: {
          ...item.test,
          price: Number(item.test.price),
        },
        status: item.status,
        score: item.score,
        result: item.result,
        answersCount: item.answers.length,
        startedAt: item.startedAt,
        completedAt: item.completedAt,
        createdAt: item.createdAt,
      })),
    };
  } catch (error) {
    console.error("GET_PATIENT_TESTS_ERROR:", error);

    return {
      success: false,
      message: "Failed to load patient tests",
      data: [],
    };
  }
}
