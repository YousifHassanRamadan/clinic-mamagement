"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SessionStatus, SessionType } from "@/app/generated/prisma/enums";

interface SessionsFiltersProps {
  status: SessionStatus | "all";
  sessionType: SessionType | "all";

  onStatusChange: (value: SessionStatus | "all") => void;
  onSessionTypeChange: (value: SessionType | "all") => void;
}

const SessionsFilters = ({
  status,
  sessionType,
  onStatusChange,
  onSessionTypeChange,
}: SessionsFiltersProps) => {
  return (
    <>
      {/* Status */}

      <Select
        value={status}
        onValueChange={(value) =>
          onStatusChange(value as SessionStatus | "all")
        }
      >
        <SelectTrigger className="w-full rounded-xl sm:w-[170px] p-3">
          <SelectValue placeholder="Status" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Statuses</SelectItem>

          <SelectItem value={SessionStatus.COMPLETED}>Completed</SelectItem>

          <SelectItem value={SessionStatus.SCHEDULED}>Scheduled</SelectItem>

          <SelectItem value={SessionStatus.DRAFT}>Draft</SelectItem>

          <SelectItem value={SessionStatus.CANCELLED}>Cancelled</SelectItem>

          <SelectItem value={SessionStatus.NO_SHOW}>No Show</SelectItem>
        </SelectContent>
      </Select>

      {/* Session Type */}

      <Select
        value={sessionType}
        onValueChange={(value) =>
          onSessionTypeChange(value as SessionType | "all")
        }
      >
        <SelectTrigger className="w-full rounded-xl sm:w-[180px] p-3">
          <SelectValue placeholder="Type" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>

          <SelectItem value={SessionType.INITIAL}>Initial Session</SelectItem>

          <SelectItem value={SessionType.FOLLOW_UP}>Follow-up</SelectItem>

          <SelectItem value={SessionType.INDIVIDUAL}>Individual</SelectItem>

          <SelectItem value={SessionType.EMERGENCY}>Emergency</SelectItem>

          <SelectItem value={SessionType.OTHER}>Other</SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SessionsFilters;
