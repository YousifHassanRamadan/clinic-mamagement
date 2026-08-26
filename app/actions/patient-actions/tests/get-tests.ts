// app/actions/patient-actions/tests/get-tests.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getTests() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "Unauthorized.",
        tests: [],
      };
    }

    const userId = session.user.id;

    const tests = await prisma.psychologicalTest.findMany({
      where: {
        isActive: true,
      },

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

        _count: {
          select: {
            questions: true,
          },
        },

        testAccesses: {
          where: {
            userId,
          },

          select: {
            approval: true,
          },

          take: 1,
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedTests = tests.map((test) => ({
      id: test.id,

      // AR: عنوان الاختبار العربي من قاعدة البيانات
      // EN: Arabic test title from the database
      title: test.title,
      titleAr: test.titleAr,

      // AR: وصف الاختبار العربي من قاعدة البيانات
      // EN: Arabic test description from the database
      description: test.description,
      descriptionAr: test.descriptionAr,

      category: test.category
        ? {
            id: test.category.id,
            name: test.category.name,
            nameAr: test.category.nameAr,
          }
        : null,

      _count: {
        questions: test._count.questions,
      },

      isApproved: test.testAccesses[0]?.approval === true,
    }));

    return {
      success: true as const,
      tests: formattedTests,
    };
  } catch (error) {
    console.error("GET_TESTS_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to load psychological tests.",
      tests: [],
    };
  }
}
