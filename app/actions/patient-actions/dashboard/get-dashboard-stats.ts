"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

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

    // =========================
    // Verify Patient
    // =========================
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

    // =========================
    // Start / End of Current Week
    // Saturday -> Friday
    // =========================
    const startOfWeek = new Date(now);

    const day = startOfWeek.getDay();
    const daysFromSaturday = (day + 1) % 7;

    startOfWeek.setDate(startOfWeek.getDate() - daysFromSaturday);
    startOfWeek.setHours(0, 0, 0, 0);

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // =========================
    // Dashboard Queries
    // =========================
    const [
      totalAppointments,
      upcomingAppointments,
      completedSessions,
      completedTests,
      latestMoodSession,
      latestTest,
    ] = await Promise.all([
      // =========================
      // Total Appointments
      // =========================
      prisma.appointment.count({
        where: {
          userId: patientId,
        },
      }),

      // =========================
      // Upcoming Appointments
      // =========================
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

      // =========================
      // Completed Sessions
      // =========================
      prisma.clinicSession.count({
        where: {
          patientId,
          status: "COMPLETED",
        },
      }),

      // =========================
      // Completed Tests
      // =========================
      prisma.patientTest.count({
        where: {
          patientId,
          status: "COMPLETED",
        },
      }),

      // =========================
      // Latest Mood This Week
      // =========================
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

      // =========================
      // Latest Completed Test
      // =========================
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
          score: true,
          result: true,
          completedAt: true,

          test: {
            select: {
              title: true,
            },
          },
        },
      }),
    ]);

    // =========================
    // Mood Map
    // =========================
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

    // =========================
    // Return Dashboard Data
    // =========================
    return {
      success: true as const,

      message: "Dashboard stats fetched successfully",

      data: {
        totalAppointments,
        upcomingAppointments,
        completedSessions,
        completedTests,
        mood,
        latestTest,
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
