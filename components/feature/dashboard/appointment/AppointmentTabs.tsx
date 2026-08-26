// AppointmentTabs.tsx

"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import enCommon from "@/locales/en/common.json";
import arCommon from "@/locales/ar/common.json";

type AppointmentTab = "upcoming" | "completed" | "cancelled";

interface Props {
  activeTab: AppointmentTab;
  setActiveTab: (value: AppointmentTab) => void;
  upcomingCount: number;
  completedCount: number;
  cancelledCount: number;
}

const AppointmentTabs = ({
  activeTab,
  setActiveTab,
  upcomingCount,
  completedCount,
  cancelledCount,
}: Props) => {
  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    const updateLocale = () => {
      setLocale(document.documentElement.lang.startsWith("ar") ? "ar" : "en");
    };

    updateLocale();

    const observer = new MutationObserver(updateLocale);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => observer.disconnect();
  }, []);

  const translations = locale === "ar" ? arCommon : enCommon;

  const tabs = [
    {
      title: translations.appointmentTabs.upcoming.replace(
        "{{count}}",
        String(upcomingCount),
      ),
      value: "upcoming" as const,
    },
    {
      title: translations.appointmentTabs.completed.replace(
        "{{count}}",
        String(completedCount),
      ),
      value: "completed" as const,
    },
    {
      title: translations.appointmentTabs.cancelled.replace(
        "{{count}}",
        String(cancelledCount),
      ),
      value: "cancelled" as const,
    },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => setActiveTab(tab.value)}
          className={cn(
            "rounded-full border px-4 py-2 text-sm transition",
            activeTab === tab.value
              ? "bg-primary text-primary-foreground"
              : "bg-background hover:bg-muted",
          )}
        >
          {tab.title}
        </button>
      ))}
    </div>
  );
};

export default AppointmentTabs;
