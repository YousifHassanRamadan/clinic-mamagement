"use server";

import { prisma } from "@/lib/prisma";

interface GetAvailableSlotsInput {
  date: string;
}

export async function getAvailableSlots({ date }: GetAvailableSlotsInput) {
  console.log("========================================");
  console.log("🚀 GET_AVAILABLE_SLOTS START");
  console.log("📅 Received date:", date);
  console.log("========================================");

  try {
    // =========================
    // 1. Validate date
    // =========================
    if (!date) {
      console.log("❌ Date is missing");

      return {
        success: false,
        message: "Date is required",
        slots: [],
      };
    }

    console.log("✅ Date exists:", date);

    // =========================
    // 2. Create date range
    // =========================
    const startOfDay = new Date(`${date}T00:00:00.000+03:00`);

    const endOfDay = new Date(`${date}T23:59:59.999+03:00`);

    console.log("🕐 Start of day:", startOfDay);
    console.log("🕐 End of day:", endOfDay);

    console.log("🌍 Start ISO:", startOfDay.toISOString());

    console.log("🌍 End ISO:", endOfDay.toISOString());

    // =========================
    // 3. Find doctor
    // =========================
    console.log("🔎 Searching for doctor...");

    const doctor = await prisma.user.findFirst({
      where: {
        role: "DOCTOR",
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        approval: true,
      },
    });

    console.log("👨‍⚕️ Doctor result:", doctor);

    if (!doctor) {
      console.log("❌ No doctor found");

      return {
        success: true,
        slots: [],
      };
    }

    console.log("✅ Doctor found:", {
      id: doctor.id,
      name: `${doctor.firstName} ${doctor.lastName}`,
      email: doctor.email,
      approval: doctor.approval,
    });

    // =========================
    // 4. Find availability
    // =========================
    console.log("🔎 Searching availability...");

    const availability = await prisma.availability.findFirst({
      where: {
        doctorId: doctor.id,

        date: {
          gte: startOfDay,
          lte: endOfDay,
        },

        isAvailable: true,
      },

      include: {
        slots: {
          orderBy: {
            time: "asc",
          },
        },
      },
    });

    console.log("📋 Availability result:", availability);

    // =========================
    // 5. Check availability
    // =========================
    if (!availability) {
      console.log("❌ No availability found for:", date);

      // DEBUG:
      // Get ALL availability records for this doctor
      const allAvailabilities = await prisma.availability.findMany({
        where: {
          doctorId: doctor.id,
        },
        orderBy: {
          date: "asc",
        },
        include: {
          slots: true,
        },
      });

      console.log("🧪 ALL DOCTOR AVAILABILITIES:", allAvailabilities);

      return {
        success: true,
        slots: [],
      };
    }

    console.log("✅ Availability found:", {
      id: availability.id,
      date: availability.date,
      startTime: availability.startTime,
      endTime: availability.endTime,
      duration: availability.duration,
      isAvailable: availability.isAvailable,
    });

    // =========================
    // 6. Log all slots
    // =========================
    console.log("🕒 ALL SLOTS:", availability.slots);

    // =========================
    // 7. Filter available slots
    // =========================
    const availableSlots = availability.slots.filter(
      (slot) => slot.isAvailable,
    );

    console.log("✅ AVAILABLE SLOTS:", availableSlots);

    // =========================
    // 8. Final response
    // =========================
    console.log("📤 Returning slots:", availableSlots);

    console.log("========================================");
    console.log("✅ GET_AVAILABLE_SLOTS END");
    console.log("========================================");

    return {
      success: true,
      slots: availableSlots,
    };
  } catch (error) {
    console.error("========================================");
    console.error("🔥 GET_AVAILABLE_SLOTS_ERROR");
    console.error(error);
    console.error("========================================");

    return {
      success: false,
      message: "Failed to get available slots",
      slots: [],
    };
  }
}
