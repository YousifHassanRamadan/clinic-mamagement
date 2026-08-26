// AppointmentStatus.tsx

"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import enCommon from "@/locales/en/common.json";
import arCommon from "@/locales/ar/common.json";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

interface Props {
  status: AppointmentStatus;
}

const styles = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",
  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",
  COMPLETED: "bg-green-100 text-green-700 border-green-200",
  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

const AppointmentStatus = ({ status }: Props) => {
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

  const statusKey = status.toLowerCase() as
    | "pending"
    | "confirmed"
    | "completed"
    | "cancelled";

  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium",
        styles[status],
      )}
    >
      {translations.appointmentStatus[statusKey]}
    </span>
  );
};

export default AppointmentStatus;
