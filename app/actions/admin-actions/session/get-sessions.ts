// app/actions/admin-actions/session/get-sessions.ts

"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";
import { SessionStatus, SessionType } from "@/app/generated/prisma/enums";

interface GetSessionsFilters {
  search?: string;
  status?: SessionStatus | "all";
  sessionType?: SessionType | "all";
}

export async function getSessions(filters?: GetSessionsFilters) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return {
        success: false,
        data: [],
        message: "Unauthorized",
      };
    }

    const search = filters?.search?.trim();
    const status = filters?.status;
    const sessionType = filters?.sessionType;

    const sessions = await prisma.clinicSession.findMany({
      where: {
        ...(search
          ? {
              OR: [
                {
                  diagnosis: {
                    contains: search,
                    mode: "insensitive",
                  },
                },
                {
                  patient: {
                    OR: [
                      {
                        firstName: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                      {
                        lastName: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                      {
                        phone: {
                          contains: search,
                          mode: "insensitive",
                        },
                      },
                    ],
                  },
                },
              ],
            }
          : {}),

        ...(status && status !== "all"
          ? {
              status,
            }
          : {}),

        ...(sessionType && sessionType !== "all"
          ? {
              sessionType,
            }
          : {}),
      },

      include: {
        patient: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            phone: true,
          },
        },

        appointment: {
          select: {
            id: true,
            date: true,
            status: true,
          },
        },

        attachments: true,
      },

      orderBy: {
        sessionDate: "desc",
      },
    });

    return {
      success: true,

      data: sessions.map((s) => ({
        ...s,
        fee: Number(s.fee),
      })),
    };
  } catch (error) {
    console.error("GET_SESSIONS_ERROR:", error);

    return {
      success: false,
      data: [],
      message: "Failed to fetch sessions",
    };
  }
}
