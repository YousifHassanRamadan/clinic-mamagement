import { ReactNode } from "react";

import Header from "./Header";
import Sidebar from "./Sidebar";

interface Props {
  children: ReactNode;
  role?: "PATIENT" | "DOCTOR";
}

const DashboardLayout = ({ children, role }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden bg-muted/30">
      <Sidebar role={role} />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Header role={role} />

        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
