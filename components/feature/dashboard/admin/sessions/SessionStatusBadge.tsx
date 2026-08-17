"use client";

import { Badge } from "@/components/ui/badge";
import { SessionStatus } from "./types";

interface Props {
  status: SessionStatus;
}

const statusStyles: Record<SessionStatus, string> = {
  COMPLETED: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",

  SCHEDULED: "bg-blue-100 text-blue-700 border-blue-200 hover:bg-blue-100",

  CANCELLED: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",

  DRAFT: "bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100",

  NO_SHOW: "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100",
};

const SessionStatusBadge = ({ status }: Props) => {
  return (
    <Badge
      variant="outline"
      className={`${statusStyles[status]} p-1 rounded-xl`}
    >
      {status}
    </Badge>
  );
};

export default SessionStatusBadge;
