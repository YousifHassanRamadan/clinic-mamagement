"use client";

import Link from "next/link";

import SidebarFooter from "./SidebarFooter";
import SidebarGroup from "./SidebarGroup";
import { sidebarItems } from "@/constants/dashboard/dashboard";

interface Props {
  role?: "PATIENT" | "DOCTOR" | "SECRETARY";
}

const Sidebar = ({ role = "PATIENT" }: Props) => {
  console.log("role", role);
  return (
    <aside className="hidden h-screen w-72 shrink-0 border-r bg-background lg:flex lg:flex-col">
      <div className="border-b px-6 py-7">
        <Link href="/dashboard" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-white font-bold">
            S
          </div>

          <div>
            <h2 className="font-semibold">Serene Mind</h2>

            <p className="text-xs text-muted-foreground">Patient Workspace</p>
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
                items: group.items.filter((item) => item.roles.includes(role)),
              }}
            />
          ))}
        </div>
      </div>

      <div className="p-4">
        <SidebarFooter />
      </div>
    </aside>
  );
};

export default Sidebar;
