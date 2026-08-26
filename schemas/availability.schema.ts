// availability.schema.ts

import { z } from "zod";

const availabilityFields = {
  date: z.string().min(1, "Date is required"),

  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid start time"),

  endTime: z.string().regex(/^([01]\d|2[0-3]):([0-5]\d)$/, "Invalid end time"),

  duration: z.union([
    z.literal(30),
    z.literal(45),
    z.literal(60),
    z.literal(90),
  ]),

  slots: z.array(z.string()),
};

const validateAvailability = (
  data: {
    startTime: string;
    endTime: string;
    duration: 30 | 45 | 60 | 90;
    slots: string[];
  },
  ctx: z.RefinementCtx,
) => {
  const [startHour, startMinute] = data.startTime.split(":").map(Number);
  const [endHour, endMinute] = data.endTime.split(":").map(Number);

  const startTotal = startHour * 60 + startMinute;
  const endTotal = endHour * 60 + endMinute;

  if (startTotal >= endTotal) {
    ctx.addIssue({
      code: "custom",
      path: ["endTime"],
      message: "End time must be after start time",
    });

    return;
  }

  const totalMinutes = endTotal - startTotal;

  if (data.duration > totalMinutes) {
    ctx.addIssue({
      code: "custom",
      path: ["duration"],
      message: "Duration cannot be longer than working hours",
    });
  }

  const validSlots: string[] = [];

  for (
    let current = startTotal;
    current + data.duration <= endTotal;
    current += data.duration
  ) {
    const hour = Math.floor(current / 60);
    const minute = current % 60;

    validSlots.push(
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`,
    );
  }

  for (const slot of data.slots) {
    if (!validSlots.includes(slot)) {
      ctx.addIssue({
        code: "custom",
        path: ["slots"],
        message: "One or more selected slots are invalid",
      });

      break;
    }
  }
};

export const createAvailabilitySchema = z
  .object({
    ...availabilityFields,
    slots: z.array(z.string()).min(1, "Please select at least one time slot"),
  })
  .superRefine(validateAvailability);

export type CreateAvailabilityInput = z.infer<typeof createAvailabilitySchema>;

export const updateAvailabilitySchema = z
  .object(availabilityFields)
  .superRefine(validateAvailability);

export type UpdateAvailabilityInput = z.infer<typeof updateAvailabilitySchema>;
