"use client";

import { Badge } from "@/components/ui/badge";
import { AppointmentStatus } from "./types";

interface Props {
  status: AppointmentStatus;
}

const statusStyles: Record<AppointmentStatus, string> = {
  PENDING: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-50",

  CONFIRMED:
    "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-50",

  CANCELLED: "bg-red-50 text-red-700 border-red-200 hover:bg-red-50",

  COMPLETED: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-50",
};

const statusLabels: Record<AppointmentStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
};

const AppointmentStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      variant="outline"
      className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[status]}`}
    >
      <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-current" />

      {statusLabels[status]}
    </Badge>
  );
};

export default AppointmentStatusBadge;
