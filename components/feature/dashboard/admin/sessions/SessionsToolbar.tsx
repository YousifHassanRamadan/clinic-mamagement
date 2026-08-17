"use client";

import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import SessionsFilters from "./SessionsFilters";

import { SessionStatus, SessionType } from "@/app/generated/prisma/enums";

interface SessionsToolbarProps {
  search: string;

  status: SessionStatus | "all";
  sessionType: SessionType | "all";

  onSearchChange: (value: string) => void;

  onStatusChange: (value: SessionStatus | "all") => void;
  onSessionTypeChange: (value: SessionType | "all") => void;
}

const SessionsToolbar = ({
  search,
  status,
  sessionType,
  onSearchChange,
  onStatusChange,
  onSessionTypeChange,
}: SessionsToolbarProps) => {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        {/* Search */}

        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground p-2" />

          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search patient, session ID or diagnosis..."
            className="pl-10 p-2"
          />
        </div>

        {/* Filters */}

        <div className="flex flex-col gap-3 sm:flex-row ">
          <SessionsFilters
            status={status}
            sessionType={sessionType}
            onStatusChange={onStatusChange}
            onSessionTypeChange={onSessionTypeChange}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionsToolbar;
