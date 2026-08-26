// Sidebar.tsx

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import SidebarGroup from "./SidebarGroup";
import { sidebarItems } from "@/constants/dashboard/dashboard";
import { getProfile } from "@/app/actions/patient-actions/profile/get-profile";

interface SidebarTranslations {
  brand: string;
  patientWorkspace: string;
  items: Record<string, string>;
}

interface Props {
  role?: "PATIENT" | "DOCTOR" | "SECRETARY";
  mobile?: boolean;
  onNavigate?: () => void;
  locale: "en" | "ar";
  translations: SidebarTranslations;
}

const Sidebar = ({
  role = "PATIENT",
  mobile = false,
  onNavigate,
  locale,
  translations,
}: Props) => {
  const isArabic = locale === "ar";

  const [user, setUser] = useState<{
    firstName: string | null;
    firstNameAr: string | null;
    lastName: string | null;
    lastNameAr: string | null;
    role: "PATIENT" | "DOCTOR" | "SECRETARY";
  } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const result = await getProfile();

      if (result.success) {
        setUser({
          firstName: result.data.firstName,
          firstNameAr: result.data.firstNameAr,
          lastName: result.data.lastName,
          lastNameAr: result.data.lastNameAr,
          role: result.data.role,
        });
      }
    };

    fetchProfile();
  }, []);

  const firstName = isArabic
    ? user?.firstNameAr || user?.firstName
    : user?.firstName || user?.firstNameAr;

  const lastName = isArabic
    ? user?.lastNameAr || user?.lastName
    : user?.lastName || user?.lastNameAr;

  const fullName = [firstName, lastName].filter(Boolean).join(" ");

  const roleLabel =
    user?.role === "DOCTOR"
      ? isArabic
        ? "طبيب"
        : "Doctor"
      : user?.role === "SECRETARY"
        ? isArabic
          ? "سكرتير"
          : "Secretary"
        : isArabic
          ? "مريض"
          : "Patient";

  return (
    <aside
      dir={isArabic ? "rtl" : "ltr"}
      className={
        mobile
          ? "flex h-full w-full flex-col bg-background"
          : `hidden h-screen w-72 shrink-0 border-${
              isArabic ? "l" : "r"
            } bg-background lg:flex lg:flex-col`
      }
    >
      <div className="border-b px-6 py-7">
        <Link
          href={role === "DOCTOR" ? "/dashboard/admin/overview" : "/dashboard/"}
          className="flex items-center gap-3"
          onClick={onNavigate}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-primary font-bold text-white">
            {user?.firstName?.charAt(0).toUpperCase() || "Y"}
          </div>

          <div className="min-w-0">
            <h2 className="truncate font-semibold">
              {fullName || translations.brand}
            </h2>

            <p className="text-xs text-muted-foreground">
              {user ? roleLabel : translations.patientWorkspace}
            </p>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="space-y-6">
          {sidebarItems.map((group, index) => (
            <SidebarGroup
              key={index}
              group={{
                ...group,
                items: group.items
                  .filter((item) => item.roles.includes(role))
                  .map((item) => ({
                    ...item,
                    title: translations.items[item.href] ?? item.title,
                  })),
              }}
              onNavigate={onNavigate}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
