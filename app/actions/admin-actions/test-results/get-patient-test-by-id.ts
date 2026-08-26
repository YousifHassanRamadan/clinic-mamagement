// app/actions/admin-actions/test-results/get-patient-test-by-id.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getPatientTestById(patientTestId: string) {
  const session = await auth();

  if (!session?.user?.id || session.user.role !== "DOCTOR") {
    return {
      success: false,
      message: "Unauthorized",
      data: null,
    };
  }

  if (!patientTestId) {
    return {
      success: false,
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
        success: false,
        message: "Patient test not found",
        data: null,
      };
    }

    return {
      success: true,
      data: {
        id: patientTest.id,
        status: patientTest.status,
        score: patientTest.score,
        result: patientTest.result,
        startedAt: patientTest.startedAt,
        completedAt: patientTest.completedAt,
        createdAt: patientTest.createdAt,

        patient: patientTest.patient,

        test: patientTest.test,

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
      success: false,
      message: "Failed to load patient test",
      data: null,
    };
  }
}
