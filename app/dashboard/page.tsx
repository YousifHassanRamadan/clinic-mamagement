import DashboardOverview from "@/components/feature/dashboard/overview/DashboardOverview";
import { auth } from "@/providers/auth/auth";
import { redirect } from "next/navigation";

const DashboardPage = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role === "DOCTOR") {
    redirect("/dashboard/admin/overview");
  }

  return (
    <div>
      <DashboardOverview />
    </div>
  );
};

export default DashboardPage;
