// update-availability.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { getTranslations } from "@/i18n/getTranslations";
import { type Locale } from "@/i18n/config";
import { z } from "zod";

const updateAvailabilitySchema = z.object({
  date: z.string().min(1, "Date is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  duration: z.union([
    z.literal(30),
    z.literal(45),
    z.literal(60),
    z.literal(90),
  ]),
  slots: z.array(z.string()),
});

export async function updateAvailability(
  availabilityId: string,
  values: {
    date: string;
    startTime: string;
    endTime: string;
    duration: 30 | 45 | 60 | 90;
    slots: string[];
  },
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
        message: t("appointments.server.onlyDoctorsUpdate"),
      };
    }

    const parsed = updateAvailabilitySchema.safeParse(values);

    if (!parsed.success) {
      return {
        success: false,
        message:
          parsed.error.issues[0]?.message ??
          t("appointments.server.invalidData"),
      };
    }

    const { date, startTime, endTime, duration, slots } = parsed.data;

    const availabilityDate = new Date(`${date}T00:00:00.000Z`);

    const existingAvailability = await prisma.availability.findFirst({
      where: {
        id: availabilityId,
        doctorId: session.user.id,
      },
      include: {
        slots: {
          orderBy: {
            time: "asc",
          },
        },
      },
    });

    if (!existingAvailability) {
      return {
        success: false,
        message: t("appointments.server.availabilityNotFound"),
      };
    }

    const duplicateDate = await prisma.availability.findFirst({
      where: {
        doctorId: session.user.id,
        date: availabilityDate,
        NOT: {
          id: availabilityId,
        },
      },
    });

    if (duplicateDate) {
      return {
        success: false,
        message: t("appointments.server.availabilityExists"),
      };
    }

    const [startHour, startMinute] = startTime.split(":").map(Number);
    const [endHour, endMinute] = endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    if (
      Number.isNaN(startHour) ||
      Number.isNaN(startMinute) ||
      Number.isNaN(endHour) ||
      Number.isNaN(endMinute)
    ) {
      return {
        success: false,
        message: t("appointments.server.invalidWorkingHours"),
      };
    }

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

      if (
        Number.isNaN(slotHour) ||
        Number.isNaN(slotMinute) ||
        slotHour < 0 ||
        slotHour > 23 ||
        slotMinute < 0 ||
        slotMinute > 59
      ) {
        return {
          success: false,
          message: t("appointments.server.invalidSlot", {
            slot,
          }),
        };
      }

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

    const dayStart = new Date(`${date}T00:00:00.000Z`);
    const dayEnd = new Date(`${date}T23:59:59.999Z`);

    const appointments = await prisma.appointment.findMany({
      where: {
        date: {
          gte: dayStart,
          lte: dayEnd,
        },
        status: {
          not: "CANCELLED",
        },
      },
      select: {
        date: true,
      },
    });

    const bookedTimes = new Set(
      appointments.map((appointment) => {
        const hours = appointment.date
          .getUTCHours()
          .toString()
          .padStart(2, "0");

        const minutes = appointment.date
          .getUTCMinutes()
          .toString()
          .padStart(2, "0");

        return `${hours}:${minutes}`;
      }),
    );

    const removingBookedSlot = existingAvailability.slots.some(
      (existingSlot) =>
        bookedTimes.has(existingSlot.time) &&
        !uniqueSlots.includes(existingSlot.time),
    );

    if (removingBookedSlot) {
      return {
        success: false,
        message: t("appointments.server.cannotRemoveBookedSlot"),
      };
    }

    const existingTimes = new Set(
      existingAvailability.slots.map((slot) => slot.time),
    );

    const slotsToCreate = uniqueSlots.filter(
      (time) => !existingTimes.has(time),
    );

    const slotsToDelete = existingAvailability.slots.filter(
      (slot) => !uniqueSlots.includes(slot.time) && !bookedTimes.has(slot.time),
    );

    await prisma.$transaction(async (tx) => {
      await tx.availability.update({
        where: {
          id: availabilityId,
        },
        data: {
          date: availabilityDate,
          startTime: new Date(`${date}T${startTime}:00.000Z`),
          endTime: new Date(`${date}T${endTime}:00.000Z`),
          duration,
        },
      });

      if (slotsToCreate.length > 0) {
        await tx.availabilitySlot.createMany({
          data: slotsToCreate.map((time) => ({
            availabilityId,
            time,
            isAvailable: true,
          })),
        });
      }

      if (slotsToDelete.length > 0) {
        await tx.availabilitySlot.deleteMany({
          where: {
            id: {
              in: slotsToDelete.map((slot) => slot.id),
            },
          },
        });
      }
    });

    return {
      success: true,
      message: t("appointments.server.updatedSuccessfully"),
    };
  } catch (error) {
    console.error("UPDATE_AVAILABILITY_ERROR:", error);

    return {
      success: false,
      message: t("appointments.server.updateError"),
    };
  }
}
