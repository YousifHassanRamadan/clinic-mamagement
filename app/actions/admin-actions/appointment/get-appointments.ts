"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getAppointments() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: [],
        message: "Unauthorized",
      };
    }

    const doctor = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        role: true,
      },
    });

    if (doctor?.role !== "DOCTOR") {
      return {
        success: false,
        data: [],
        message: "Only doctors can view appointments",
      };
    }

    const appointments = await prisma.appointment.findMany({
      orderBy: {
        date: "asc",
      },

      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
            email: true,
          },
        },

        session: {
          select: {
            id: true,
            status: true,
          },
        },
      },
    });

    const data = appointments.map((appointment) => {
      const patientName =
        `${appointment.user.firstName} ${appointment.user.lastName}`.trim();

      const patientInitials =
        `${appointment.user.firstName.charAt(0)}${appointment.user.lastName.charAt(0)}`.toUpperCase();

      return {
        id: appointment.id,

        patientId: appointment.user.id,

        patientName,

        patientInitials,

        date: appointment.date.toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),

        time: appointment.date.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),

        status: appointment.status,

        createdAt: appointment.createdAt.toISOString(),
      };
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("GET_APPOINTMENTS_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch appointments",
    };
  }
}
