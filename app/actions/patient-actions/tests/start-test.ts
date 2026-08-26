"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

interface StartTestInput {
  testId: string;
  locale: "en" | "ar";
}

export async function startTest({ testId, locale }: StartTestInput) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message:
          locale === "ar"
            ? "يجب تسجيل الدخول لبدء الاختبار"
            : "You must be logged in to start a test",
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
        message:
          locale === "ar"
            ? "يمكن للمرضى فقط بدء الاختبارات"
            : "Only patients can start tests",
      };
    }

    const testAccess = await prisma.testAccess.findUnique({
      where: {
        userId_testId: {
          userId: patientId,
          testId,
        },
      },
      select: {
        id: true,
        approval: true,
      },
    });

    if (!testAccess || !testAccess.approval) {
      return {
        success: false as const,
        message:
          locale === "ar"
            ? "ليس لديك صلاحية للوصول إلى هذا الاختبار"
            : "You do not have access to this test",
      };
    }

    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
      select: {
        id: true,

        title: true,
        titleAr: true,

        description: true,
        descriptionAr: true,

        isActive: true,

        questions: {
          orderBy: {
            order: "asc",
          },

          select: {
            id: true,

            question: true,
            questionAr: true,

            order: true,

            options: {
              orderBy: {
                order: "asc",
              },

              select: {
                id: true,

                text: true,
                textAr: true,

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
        message: locale === "ar" ? "الاختبار غير موجود" : "Test not found",
      };
    }

    if (!test.isActive) {
      return {
        success: false as const,
        message:
          locale === "ar"
            ? "هذا الاختبار لم يعد متاحًا"
            : "This test is no longer available",
      };
    }

    if (test.questions.length === 0) {
      return {
        success: false as const,
        message:
          locale === "ar"
            ? "هذا الاختبار لا يحتوي على أسئلة"
            : "This test has no questions",
      };
    }

    // لو عنده محاولة غير مكتملة، يكمل نفس المحاولة
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

    const localizedTest = {
      id: test.id,

      title: locale === "ar" ? test.titleAr || test.title : test.title,

      description:
        locale === "ar"
          ? test.descriptionAr || test.description
          : test.description,

      isActive: test.isActive,

      questions: test.questions.map((question) => ({
        id: question.id,

        question:
          locale === "ar"
            ? question.questionAr || question.question
            : question.question,

        order: question.order,

        options: question.options.map((option) => ({
          id: option.id,

          text: locale === "ar" ? option.textAr || option.text : option.text,

          order: option.order,
        })),
      })),
    };

    if (existingPatientTest) {
      return {
        success: true as const,

        message:
          locale === "ar"
            ? "لديك اختبار غير مكتمل بالفعل"
            : "You already have an unfinished test",

        patientTestId: existingPatientTest.id,

        test: localizedTest,
      };
    }

    // يسمح بإنشاء محاولة جديدة حتى لو كان المريض
    // قد أكمل نفس الاختبار من قبل
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

      message:
        locale === "ar" ? "بدأ الاختبار بنجاح" : "Test started successfully",

      patientTestId: patientTest.id,

      test: localizedTest,
    };
  } catch (error) {
    console.error("START_TEST_ERROR:", error);

    return {
      success: false as const,
      message: locale === "ar" ? "فشل بدء الاختبار" : "Failed to start test",
    };
  }
}
