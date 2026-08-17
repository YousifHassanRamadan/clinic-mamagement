"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import { profileSchema, ProfileFormValues } from "@/schemas/profile.schema";

export async function updateProfile(input: ProfileFormValues) {
  const validation = profileSchema.safeParse(input);

  if (!validation.success) {
    return {
      success: false,
      message: "Invalid profile data",
      errors: validation.error.flatten().fieldErrors,
    };
  }

  const session = await auth();

  if (!session?.user?.id) {
    return {
      success: false,
      message: "Unauthorized",
    };
  }

  const userId = session.user.id;

  const { firstName, lastName, email, phone, address, gender } =
    validation.data;

  try {
    const existingEmail = await prisma.user.findFirst({
      where: {
        email,
        NOT: {
          id: userId,
        },
      },
      select: {
        id: true,
      },
    });

    if (existingEmail) {
      return {
        success: false,
        message: "Email is already in use",
      };
    }

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
        success: false,
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
        email,
        phone,
        address: address || null,
        gender: gender ?? null,
      },

      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        address: true,
        gender: true,
        image: true,
        role: true,
      },
    });

    return {
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    };
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);

    return {
      success: false,
      message: "Failed to update profile",
    };
  }
}
