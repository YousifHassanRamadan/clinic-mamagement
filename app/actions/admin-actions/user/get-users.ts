// app/actions/admin-actions/user/get-users.ts

"use server";

import { Role } from "@/app/generated/prisma/enums";
import { GetUsersFilters } from "@/components/feature/dashboard/admin/users/types";
import { prisma } from "@/lib/prisma";

export const getUsers = async ({
  search = "",
  role = "ALL",
  approval = "ALL",
}: GetUsersFilters = {}) => {
  const query = search.trim();

  const users = await prisma.user.findMany({
    where: {
      ...(query
        ? {
            OR: [
              {
                firstName: {
                  contains: query,
                  mode: "insensitive" as const,
                },
              },
              {
                lastName: {
                  contains: query,
                  mode: "insensitive" as const,
                },
              },
              {
                email: {
                  contains: query,
                  mode: "insensitive" as const,
                },
              },
              {
                phone: {
                  contains: query,
                },
              },
            ],
          }
        : {}),

      ...(role !== "ALL"
        ? {
            role: role as Role,
          }
        : {}),

      ...(approval !== "ALL"
        ? {
            approval: approval === "APPROVED",
          }
        : {}),
    },

    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      address: true,
      gender: true,
      role: true,
      approval: true,
      image: true,
      createdAt: true,
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return users.map((user) => ({
    ...user,
    createdAt: user.createdAt.toISOString(),
  }));
};
