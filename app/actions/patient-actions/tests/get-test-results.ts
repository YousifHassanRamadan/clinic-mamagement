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
            description: true,

            category: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    return {
      success: true as const,
      message: "Test results fetched successfully",
      data: results,
    };
  } catch (error) {
    console.error("GET_TEST_RESULTS_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to get test results",
    };
  }
}
