// DashboardLayout.tsx

import { ReactNode } from "react";
import { cookies } from "next/headers";

import Header from "./Header";
import Sidebar from "./Sidebar";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

interface Props {
  children: ReactNode;
  role?: "PATIENT" | "DOCTOR";
}

const DashboardLayout = async ({ children, role }: Props) => {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  const sidebarTranslations = {
    brand: t("dashboard.sidebar.brand"),
    patientWorkspace: t("dashboard.sidebar.patientWorkspace"),
    items: {
      "/dashboard/": t("dashboard.sidebar.items.dashboard"),

      "/dashboard/admin/overview": t("dashboard.sidebar.items.doctorDashboard"),
      "/dashboard/admin/test-results": t("dashboard.sidebar.items.testResults"),
      "/dashboard/admin/category": t("dashboard.sidebar.items.categories"),
      "/dashboard/admin/tests": t("dashboard.sidebar.items.tests"),
      "/dashboard/admin/book-access": t("dashboard.sidebar.items.bookAccess"),
      "/dashboard/admin/books": t("dashboard.sidebar.items.books"),
      "/dashboard/admin/test-access": t("dashboard.sidebar.items.testAccess"),
      "/dashboard/admin/appoinments": t("dashboard.sidebar.items.appointments"),
      "/dashboard/admin/users": t("dashboard.sidebar.items.users"),
      "/dashboard/admin/sessions": t("dashboard.sidebar.items.sessions"),

      "/dashboard/patient/appointments/new": t(
        "dashboard.sidebar.items.bookAppointment",
      ),
      "/dashboard/patient/appointments": t(
        "dashboard.sidebar.items.myAppointments",
      ),
      "/dashboard/patient/books": t("dashboard.sidebar.items.books"),
      "/dashboard/patient/my-books": t("dashboard.sidebar.items.myBooks"),
      "/dashboard/patient/tests": t(
        "dashboard.sidebar.items.psychologicalTests",
      ),
      "/dashboard/patient/tests/results": t(
        "dashboard.sidebar.items.testResults",
      ),
      "/dashboard/profile": t("dashboard.sidebar.items.myProfile"),
    },
  };

  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <Sidebar role={role} locale={locale} translations={sidebarTranslations} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header role={role} translations={sidebarTranslations} />

        <main className="flex-1 overflow-y-auto scroll-smooth p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
