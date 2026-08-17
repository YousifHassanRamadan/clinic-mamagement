"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getDashboardStats() {
  try {
    // =========================
    // Authentication
    // =========================
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "Unauthorized",
      };
    }

    // =========================
    // Verify Admin / Doctor
    // =========================
    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user || user.role !== "DOCTOR") {
      return {
        success: false as const,
        message: "Only doctors can access dashboard statistics.",
      };
    }

    const now = new Date();

    // =========================
    // Dashboard Queries
    // =========================
    const [patients, sessions, tests, recentSessions, upcomingAppointments] =
      await Promise.all([
        // =========================
        // Total Patients
        // =========================
        prisma.user.count({
          where: {
            role: "PATIENT",
          },
        }),

        // =========================
        // Total Sessions
        // =========================
        prisma.clinicSession.count(),

        // =========================
        // Total Psychological Tests
        // =========================
        prisma.psychologicalTest.count(),

        // =========================
        // Recent Sessions
        // =========================
        prisma.clinicSession.findMany({
          orderBy: {
            sessionDate: "desc",
          },

          take: 5,

          select: {
            id: true,
            sessionDate: true,
            duration: true,
            sessionType: true,
            mood: true,
            diagnosis: true,
            status: true,
            fee: true,

            patient: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
              },
            },
          },
        }),

        // =========================
        // Upcoming Appointments
        // =========================
        prisma.appointment.findMany({
          where: {
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

            user: {
              select: {
                firstName: true,
                lastName: true,
              },
            },

            session: {
              select: {
                sessionType: true,
                duration: true,
              },
            },
          },
        }),
      ]);

    // =========================
    // Format Recent Sessions
    // =========================
    const formattedRecentSessions = recentSessions.map((session) => {
      const firstName = session.patient.firstName ?? "";
      const lastName = session.patient.lastName ?? "";

      const name = `${firstName} ${lastName}`.trim();

      const initials =
        `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();

      return {
        id: session.id,
        date: session.sessionDate,
        duration: session.duration,
        type: session.sessionType,
        mood: session.mood,
        diagnosis: session.diagnosis,
        status: session.status,
        fee: Number(session.fee),

        patient: {
          id: session.patient.id,
          name,
          initials,
        },
      };
    });

    // =========================
    // Format Upcoming Appointments
    // =========================
    const formattedUpcomingAppointments = upcomingAppointments.map(
      (appointment) => {
        const firstName = appointment.user.firstName ?? "";
        const lastName = appointment.user.lastName ?? "";

        const patientName = `${firstName} ${lastName}`.trim();

        return {
          id: appointment.id,
          patient: patientName,
          date: appointment.date,
          time: appointment.date.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          status: appointment.status,
          type: appointment.session?.sessionType ?? "OTHER",
          duration: appointment.session?.duration
            ? `${appointment.session.duration} min`
            : "N/A",
        };
      },
    );

    // =========================
    // Return Dashboard Data
    // =========================
    return {
      success: true as const,

      message: "Dashboard statistics fetched successfully.",

      data: {
        patients,
        sessions,
        tests,
        recentSessions: formattedRecentSessions,
        upcomingAppointments: formattedUpcomingAppointments,
      },
    };
  } catch (error) {
    console.error("GET_ADMIN_DASHBOARD_STATS_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to fetch dashboard statistics.",
    };
  }
}
