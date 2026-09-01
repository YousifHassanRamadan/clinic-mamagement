// app/actions/patient-actions/dashboard/get-dashboard-stats.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

type GroupResult = {
  group: number;
  score: number;
  result: string;
  resultAr: string;
};

const SPECIAL_GROUPED_TEST_ID = "cmtb7wfhh0000f0tqg6zn7u0j";

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

export async function getDashboardStats() {
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
        message: "Only patients can access dashboard stats",
      };
    }

    const now = new Date();

    const startOfWeek = new Date(now);

    const day = startOfWeek.getDay();
    const daysFromSaturday = (day + 1) % 7;

    startOfWeek.setDate(startOfWeek.getDate() - daysFromSaturday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    const [
      totalAppointments,
      upcomingAppointments,
      completedSessions,
      completedTests,
      latestMoodSession,
      latestTest,
    ] = await Promise.all([
      prisma.appointment.count({
        where: {
          userId: patientId,
        },
      }),

      prisma.appointment.findMany({
        where: {
          userId: patientId,
          date: {
            gte: now,
          },
          status: {
            in: ["PENDING", "CONFIRMED"],
          },
        },
        orderBy: {
          date: "asc",
        },
        take: 5,
        select: {
          id: true,
          date: true,
          status: true,
          notes: true,
        },
      }),

      prisma.clinicSession.count({
        where: {
          patientId,
          status: "COMPLETED",
        },
      }),

      prisma.patientTest.count({
        where: {
          patientId,
          status: "COMPLETED",
        },
      }),

      prisma.clinicSession.findFirst({
        where: {
          patientId,
          status: "COMPLETED",
          mood: {
            not: null,
          },
          sessionDate: {
            gte: startOfWeek,
            lt: endOfWeek,
          },
        },
        orderBy: {
          sessionDate: "desc",
        },
        select: {
          mood: true,
        },
      }),

      prisma.patientTest.findFirst({
        where: {
          patientId,
          status: "COMPLETED",
        },
        orderBy: {
          completedAt: "desc",
        },
        select: {
          id: true,
          testId: true,
          score: true,
          result: true,
          completedAt: true,

          test: {
            select: {
              title: true,
              titleAr: true,
            },
          },
        },
      }),
    ]);

    const moodMap = {
      VERY_BAD: "Very Bad",
      BAD: "Bad",
      NEUTRAL: "Neutral",
      GOOD: "Good",
      VERY_GOOD: "Very Good",
    } as const;

    const mood = latestMoodSession?.mood
      ? moodMap[latestMoodSession.mood]
      : "No Data";

    const latestTestData = latestTest
      ? {
          id: latestTest.id,
          score: latestTest.score,
          result: latestTest.result,
          resultAr: null,
          completedAt: latestTest.completedAt,
          test: latestTest.test,

          isSpecialGroupedTest: latestTest.testId === SPECIAL_GROUPED_TEST_ID,

          groupResults:
            latestTest.testId === SPECIAL_GROUPED_TEST_ID
              ? parseGroupResults(latestTest.result)
              : null,
        }
      : null;

    return {
      success: true as const,

      message: "Dashboard stats fetched successfully",

      data: {
        totalAppointments,
        upcomingAppointments,
        completedSessions,
        completedTests,
        mood,
        latestTest: latestTestData,
      },
    };
  } catch (error) {
    console.error("GET_DASHBOARD_STATS_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to get dashboard stats",
    };
  }
}
