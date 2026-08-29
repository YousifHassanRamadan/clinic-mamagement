// app/actions/patient-actions/profile/update-profile.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import { profileSchema, ProfileFormValues } from "@/schemas/profile.schema";

export async function updateProfile(input: ProfileFormValues) {
  const validation = profileSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false as const,
      message: "Invalid profile data",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false as const,
      message: "Unauthorized",
    };
  }

  const userId = session.user.id;

  const {
    firstName,
    lastName,
    phone,
    address,
    governorate,
    city,
    district,
    street,
    buildingNumber,
    apartmentNumber,
    postalCode,
  } = validation.data;

  try {
    const existingPhone = await prisma.user.findFirst({
      where: {
        phone,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingPhone) {
      return {
        success: false as const,
        message: "Phone number is already in use",
      };
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },

      data: {
        firstName,
        lastName,
        phone,

        address: address || null,
        governorate: governorate || null,
        city: city || null,
        district: district || null,
        street: street || null,
        buildingNumber: buildingNumber || null,
        apartmentNumber: apartmentNumber || null,
        postalCode: postalCode || null,
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
      },
    });

    return {
      success: true as const,
      message: "Profile updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);

    return {
      success: false as const,
      message: "Failed to update profile",
    };
  }
}
