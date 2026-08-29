// app/actions/patient-actions/profile/get-profile.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

export async function getProfile() {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false as const,
        message: "Unauthorized",
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },

      select: {
        id: true,

        firstName: true,
        firstNameAr: true,

        lastName: true,
        lastNameAr: true,

        email: true,
        phone: true,

        address: true,
        addressAr: true,

        governorate: true,
        governorateAr: true,

        city: true,
        cityAr: true,

        district: true,
        districtAr: true,

        street: true,
        streetAr: true,

        buildingNumber: true,
        apartmentNumber: true,
        postalCode: true,

        gender: true,
        image: true,
        role: true,
        approval: true,
        createdAt: true,
      },
    });

    if (!user) {
      return {
        success: false as const,
        message: "User not found",
      };
    }

    return {
      success: true as const,
      message: "Profile fetched successfully",
      data: user,
    };
  } catch (error) {
    console.error("GET_PROFILE_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to get profile",
    };
  }
}
