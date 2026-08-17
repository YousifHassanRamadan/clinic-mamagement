"use client";

import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "./Sidebar";

interface Props {
  role?: "PATIENT" | "DOCTOR" | "SECRETARY";
}

const MobileSidebar = ({ role }: Props) => {
  return (
    <div className="lg:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button className="rounded-xl border p-2">
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-72 p-0">
          <Sidebar role={role} />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
