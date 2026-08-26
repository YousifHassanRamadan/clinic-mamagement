"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { getTranslations } from "@/i18n/getTranslations";
import { type Locale } from "@/i18n/config";

import {
  createAvailabilitySchema,
  type CreateAvailabilityInput,
} from "@/schemas/availability.schema";

export async function createAvailability(
  values: CreateAvailabilityInput,
  locale: Locale,
) {
  const t = await getTranslations(locale);

  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        message: t("appointments.server.unauthorized"),
      };
    }

    if (session.user.role !== "DOCTOR") {
      return {
        success: false,
        message: t("appointments.server.onlyDoctorsCreate"),
      };
    }

    const parsed = createAvailabilitySchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]?.message ??
          t("appointments.server.invalidData"),
      };
    }

    const { date, startTime, endTime, duration, slots } = parsed.data;

    /*
     * IMPORTANT:
     *
     * date/startTime/endTime are clinic-local scheduling values.
     * We store the clock time exactly as selected by the doctor.
     *
     * Do NOT use:
     * new Date(`${date}T${startTime}:00`)
     *
     * because that applies the server timezone.
     *
     * Using Z here makes the stored UTC clock values deterministic:
     * 09:00 -> 09:00 UTC
     * 16:00 -> 16:00 UTC
     * 17:00 -> 17:00 UTC
     */

    const availabilityDate = new Date(`${date}T00:00:00.000Z`);

    const startTimeDate = new Date(`${date}T${startTime}:00.000Z`);

    const endTimeDate = new Date(`${date}T${endTime}:00.000Z`);

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    if (startTotalMinutes >= endTotalMinutes) {
      return {
        success: false,
        message: t("appointments.server.endTimeAfterStart"),
      };
    }

    const totalMinutes = endTotalMinutes - startTotalMinutes;

    if (duration > totalMinutes) {
      return {
        success: false,
        message: t("appointments.server.durationTooLong"),
      };
    }

    const uniqueSlots = [...new Set(slots)];

    if (uniqueSlots.length !== slots.length) {
      return {
        success: false,
        message: t("appointments.server.duplicateSlots"),
      };
    }

    for (const slot of uniqueSlots) {
      const [slotHour, slotMinute] = slot.split(":").map(Number);

      const slotTotalMinutes = slotHour * 60 + slotMinute;

      if (
        slotTotalMinutes < startTotalMinutes ||
        slotTotalMinutes >= endTotalMinutes
      ) {
        return {
          success: false,
          message: t("appointments.server.slotOutsideHours", {
            slot,
          }),
        };
      }

      const offset = slotTotalMinutes - startTotalMinutes;

      if (offset % duration !== 0) {
        return {
          success: false,
          message: t("appointments.server.slotDurationMismatch", {
            slot,
          }),
        };
      }

      if (slotTotalMinutes + duration > endTotalMinutes) {
        return {
          success: false,
          message: t("appointments.server.slotExceedsHours", {
            slot,
          }),
        };
      }
    }

    const existingAvailability = await prisma.availability.findUnique({
      where: {
        doctorId_date: {
          doctorId: session.user.id,
          date: availabilityDate,
        },
      },
    });

    if (existingAvailability) {
      return {
        success: false,
        message: t("appointments.server.availabilityExists"),
      };
    }

    await prisma.availability.create({
      data: {
        doctorId: session.user.id,

        date: availabilityDate,

        // Store exactly the selected clock time.
        startTime: startTimeDate,

        // Store exactly the selected clock time.
        endTime: endTimeDate,

        duration,

        slots: {
          create: uniqueSlots.map((time) => ({
            time,
          })),
        },
      },
    });

    return {
      success: true,
      message: t("appointments.server.createdSuccessfully"),
    };
  } catch (error) {
    console.error("CREATE_AVAILABILITY_ERROR:", error);

    return {
      success: false,
      message: t("appointments.server.createError"),
    };
  }
}
