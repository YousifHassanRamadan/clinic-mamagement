// MobileSidebar.tsx

"use client";

import { useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import Sidebar from "./Sidebar";

interface SidebarTranslations {
  brand: string;
  patientWorkspace: string;
  items: Record<string, string>;
}

interface Props {
  role?: "PATIENT" | "DOCTOR" | "SECRETARY";
  locale: "en" | "ar";
  translations: SidebarTranslations;
}

const MobileSidebar = ({ role, locale, translations }: Props) => {
  const [open, setOpen] = useState(false);

  const isArabic = locale === "ar";

  const handleNavigate = () => {
    setOpen(false);

    requestAnimationFrame(() => {
      const main = document.querySelector("main");

      if (main) {
        main.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  };

  return (
    <div className="flex items-center gap-2 lg:hidden">
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-xl border bg-background transition-colors hover:bg-accent"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Open menu</span>
          </button>
        </SheetTrigger>

        <SheetContent
          side={isArabic ? "right" : "left"}
          className={`w-72 p-0 ${
            isArabic
              ? "[&>button]:left-4 [&>button]:right-auto"
              : "[&>button]:right-4 [&>button]:left-auto"
          }`}
          dir={isArabic ? "rtl" : "ltr"}
        >
          <Sidebar
            role={role}
            mobile
            locale={locale}
            translations={translations}
            onNavigate={handleNavigate}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileSidebar;
