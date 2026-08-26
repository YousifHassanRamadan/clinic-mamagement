import { redirect } from "next/navigation";

import { auth } from "@/providers/auth/auth";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const role = session.user.role;

  if (role === "DOCTOR") {
    redirect("/dashboard/admin/overview");
  }

  if (role === "PATIENT") {
    redirect("/dashboard/patient/overview");
  }

  redirect("/unauthorized");
}
