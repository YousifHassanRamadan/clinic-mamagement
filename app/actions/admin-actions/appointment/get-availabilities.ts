// get-availabilities.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { getTranslations } from "@/i18n/getTranslations";
import { type Locale } from "@/i18n/config";

export async function getAvailabilities(locale: Locale) {
  const t = await getTranslations(locale);

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: [],
        message: t("appointments.server.unauthorized"),
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        data: [],
        message: t("appointments.server.onlyDoctorsView"),
      };
    }

    const availabilities = await prisma.availability.findMany({
      where: {
        doctorId: session.user.id,
      },
      orderBy: {
        date: "asc",
      },
      include: {
        slots: {
          orderBy: {
            time: "asc",
          },
        },
      },
    });

    const availabilityDates = availabilities.map((availability) => {
      const date = new Date(availability.date);

      return {
        start: new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            0,
            0,
            0,
            0,
          ),
        ),
        end: new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            23,
            59,
            59,
            999,
          ),
        ),
      };
    });

    const bookedAppointments =
      availabilityDates.length > 0
        ? await prisma.appointment.findMany({
            where: {
              OR: availabilityDates.map(({ start, end }) => ({
                date: {
                  gte: start,
                  lte: end,
                },
              })),
              status: {
                not: "CANCELLED",
              },
            },
            select: {
              date: true,
            },
          })
        : [];

    const bookedTimesByDate = new Map<string, Set<string>>();

    for (const appointment of bookedAppointments) {
      const date = appointment.date;

      const dateKey = [
        date.getUTCFullYear(),
        String(date.getUTCMonth() + 1).padStart(2, "0"),
        String(date.getUTCDate()).padStart(2, "0"),
      ].join("-");

      const time = `${String(date.getUTCHours()).padStart(2, "0")}:${String(
        date.getUTCMinutes(),
      ).padStart(2, "0")}`;

      if (!bookedTimesByDate.has(dateKey)) {
        bookedTimesByDate.set(dateKey, new Set());
      }

      bookedTimesByDate.get(dateKey)!.add(time);
    }

    const data = availabilities.map((availability) => {
      const date = new Date(availability.date);

      const dateKey = [
        date.getUTCFullYear(),
        String(date.getUTCMonth() + 1).padStart(2, "0"),
        String(date.getUTCDate()).padStart(2, "0"),
      ].join("-");

      const bookedTimes = bookedTimesByDate.get(dateKey) ?? new Set<string>();

      return {
        ...availability,
        slots: availability.slots.map((slot) => ({
          id: slot.id,
          time: slot.time,
          isAvailable: slot.isAvailable,
          isBooked: bookedTimes.has(slot.time),
        })),
      };
    });

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error("GET_AVAILABILITIES_ERROR:", error);

    return {
      success: false,
      data: [],
      message: t("appointments.server.fetchError"),
    };
  }
}
