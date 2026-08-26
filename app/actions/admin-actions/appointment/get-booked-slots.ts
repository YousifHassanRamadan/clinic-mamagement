// get-booked-slots.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { getTranslations } from "@/i18n/getTranslations";
import { type Locale } from "@/i18n/config";

export async function getBookedSlots(date: string, locale: Locale) {
  const t = await getTranslations(locale);

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: t("appointments.server.unauthorized"),
        slots: [],
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        message: t("appointments.server.onlyDoctorsView"),
        slots: [],
      };
    }

    const startOfDay = new Date(`${date}T00:00:00.000+03:00`);

    const endOfDay = new Date(`${date}T23:59:59.999+03:00`);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: startOfDay,
          lte: endOfDay,
        },
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        date: true,
      },
      orderBy: {
        date: "asc",
      },
    });

    const bookedSlots = appointments.map((appointment) =>
      new Intl.DateTimeFormat("en-GB", {
        timeZone: "Africa/Cairo",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(appointment.date),
    );

    return {
      success: true,
      slots: [...new Set(bookedSlots)],
    };
  } catch (error) {
    console.error("GET_BOOKED_SLOTS_ERROR:", error);

    return {
      success: false,
      message: t("appointments.server.bookedSlotsError"),
      slots: [],
    };
  }
}
