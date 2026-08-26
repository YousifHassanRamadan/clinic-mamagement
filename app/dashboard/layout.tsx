import { redirect } from "next/navigation";

import DashboardLayout from "@/components/feature/dashboard/layout/DashboardLayout";
import { auth } from "@/providers/auth/auth";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;

  if (!role) {
    redirect("/unauthorized");
  }

  return <DashboardLayout role={role}>{children}</DashboardLayout>;
}
