"use server";

import { cookies } from "next/headers";
import i18next from "i18next";

import { prisma } from "@/lib/prisma";
import { auth } from "@/providers/auth/auth";

import en from "@/locales/en/common.json";
import ar from "@/locales/ar/common.json";

const resources = {
  en: {
    common: en,
  },
  ar: {
    common: ar,
  },
};

const getServerTranslation = async () => {
  const cookieStore = await cookies();

  const localeCookie = cookieStore.get("locale")?.value;

  const locale = localeCookie === "ar" ? "ar" : "en";

  const instance = i18next.createInstance();

  await instance.init({
    lng: locale,
    fallbackLng: "en",
    ns: ["common"],
    defaultNS: "common",
    resources,
    interpolation: {
      escapeValue: false,
    },
  });

  return {
    t: instance.t.bind(instance),
    locale,
  };
};

async function verifyAdmin() {
  const session = await auth();

  if (!session?.user?.id) {
    return false;
  }

  const user = await prisma.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: {
      role: true,
    },
  });

  return user?.role === "DOCTOR";
}

// ==========================================
// GET PATIENTS
// ==========================================

export async function getTestAccessUsers() {
  const { t } = await getServerTranslation();

  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return {
        success: false,
        message: t("testAccess.server.unauthorized"),
        data: [],
      };
    }

    const users = await prisma.user.findMany({
      where: {
        role: "PATIENT",
      },
      select: {
        id: true,
        firstName: true,
        firstNameAr: true,
        lastName: true,
        lastNameAr: true,
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return {
      success: true,
      data: users,
    };
  } catch (error) {
    console.error("GET_TEST_ACCESS_USERS_ERROR:", error);

    return {
      success: false,
      message: t("testAccess.server.loadPatientsFailed"),
      data: [],
    };
  }
}

// ==========================================
// GET AVAILABLE TESTS FOR USER
// ==========================================

export async function getTestAccessTests(userId: string) {
  const { t, locale } = await getServerTranslation();

  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return {
        success: false,
        message: t("testAccess.server.unauthorized"),
        data: [],
      };
    }

    if (!userId) {
      return {
        success: false,
        message: t("testAccess.server.userRequired"),
        data: [],
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        role: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: t("testAccess.server.userNotFound"),
        data: [],
      };
    }

    if (user.role !== "PATIENT") {
      return {
        success: false,
        message: t("testAccess.server.onlyPatients"),
        data: [],
      };
    }

    const tests = await prisma.psychologicalTest.findMany({
      where: {
        isActive: true,
        testAccesses: {
          none: {
            userId,
            approval: true,
          },
        },
      },
      select: {
        id: true,
        title: true,
        titleAr: true,
        description: true,
        descriptionAr: true,
        category: {
          select: {
            id: true,
            name: true,
            nameAr: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const localizedTests = tests.map((test) => ({
      id: test.id,

      title: locale === "ar" ? test.titleAr || test.title : test.title,

      description:
        locale === "ar"
          ? test.descriptionAr || test.description
          : test.description,

      category: test.category
        ? {
            id: test.category.id,

            name:
              locale === "ar"
                ? test.category.nameAr || test.category.name
                : test.category.name,
          }
        : null,
    }));

    return {
      success: true,
      data: localizedTests,
    };
  } catch (error) {
    console.error("GET_TEST_ACCESS_TESTS_ERROR:", error);

    return {
      success: false,
      message: t("testAccess.server.loadTestsFailed"),
      data: [],
    };
  }
}

// ==========================================
// GRANT TEST ACCESS
// ==========================================

export async function grantTestAccess(userId: string, testId: string) {
  const { t, locale } = await getServerTranslation();

  try {
    const isAdmin = await verifyAdmin();

    if (!isAdmin) {
      return {
        success: false,
        message: t("testAccess.server.unauthorizedAction"),
      };
    }

    if (!userId || !testId) {
      return {
        success: false,
        message: t("testAccess.server.userAndTestRequired"),
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        firstName: true,
        firstNameAr: true,
        lastName: true,
        lastNameAr: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      return {
        success: false,
        message: t("testAccess.server.userNotFound"),
      };
    }

    if (user.role !== "PATIENT") {
      return {
        success: false,
        message: t("testAccess.server.onlyPatients"),
      };
    }

    const test = await prisma.psychologicalTest.findUnique({
      where: {
        id: testId,
      },
      select: {
        id: true,
        title: true,
        titleAr: true,
        isActive: true,
      },
    });

    if (!test) {
      return {
        success: false,
        message: t("testAccess.server.testNotFound"),
      };
    }

    if (!test.isActive) {
      return {
        success: false,
        message: t("testAccess.server.testInactive"),
      };
    }

    const testAccess = await prisma.testAccess.upsert({
      where: {
        userId_testId: {
          userId,
          testId,
        },
      },

      create: {
        userId,
        testId,
        approval: true,
      },

      update: {
        approval: true,
      },

      select: {
        id: true,
        approval: true,
        userId: true,
        testId: true,
      },
    });

    const localizedTitle =
      locale === "ar" ? test.titleAr || test.title : test.title;

    return {
      success: true,
      message: t("testAccess.server.accessGranted", {
        title: localizedTitle,
      }),
      data: testAccess,
    };
  } catch (error) {
    console.error("GRANT_TEST_ACCESS_ERROR:", error);

    return {
      success: false,
      message: t("testAccess.server.genericError"),
    };
  }
}
