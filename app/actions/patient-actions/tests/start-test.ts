"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

interface StartTestInput {
  testId: string;
}

export async function startTest({ testId }: StartTestInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "You must be logged in to start a test",
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
        message: "Only patients can start tests",
      };
    }

    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
      select: {
        id: true,
        title: true,
        description: true,
        isActive: true,

        questions: {
          orderBy: {
            order: "asc",
          },

          select: {
            id: true,
            question: true,
            order: true,

            options: {
              orderBy: {
                order: "asc",
              },

              select: {
                id: true,
                text: true,
                order: true,
              },
            },
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

    if (!test.isActive) {
      return {
        success: false as const,
        message: "This test is no longer available",
      };
    }

    if (test.questions.length === 0) {
      return {
        success: false as const,
        message: "This test has no questions",
      };
    }

    const existingPatientTest = await prisma.patientTest.findFirst({
      where: {
        patientId,
        testId,
        status: {
          in: ["NOT_STARTED", "IN_PROGRESS"],
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (existingPatientTest) {
      return {
        success: true as const,
        message: "You already have an unfinished test",
        patientTestId: existingPatientTest.id,
        test,
      };
    }

    const patientTest = await prisma.patientTest.create({
      data: {
        patientId,
        testId,
        status: "IN_PROGRESS",
        startedAt: new Date(),
      },
    });

    return {
      success: true as const,
      message: "Test started successfully",
      patientTestId: patientTest.id,
      test,
    };
  } catch (error) {
    console.error("START_TEST_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to start test",
    };
  }
}
