// components/feature/dashboard/admin/sessions/SessionsToolbar.tsx

"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

import SessionsFilters from "./SessionsFilters";

import { SessionStatus, SessionType } from "@/app/generated/prisma/enums";

interface Translations {
  searchPlaceholder: string;
  status: string;
  allStatuses: string;
  completed: string;
  scheduled: string;
  draft: string;
  cancelled: string;
  noShow: string;
  type: string;
  allTypes: string;
  initialSession: string;
  followUp: string;
  individual: string;
  emergency: string;
  other: string;
}

interface SessionsToolbarProps {
  search: string;

  status: SessionStatus | "all";
  sessionType: SessionType | "all";

  onSearchChange: (value: string) => void;

  onStatusChange: (value: SessionStatus | "all") => void;
  onSessionTypeChange: (value: SessionType | "all") => void;

  translations: Translations;
}

const SessionsToolbar = ({
  search,
  status,
  sessionType,
  onSearchChange,
  onStatusChange,
  onSessionTypeChange,
  translations,
}: SessionsToolbarProps) => {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder={translations.searchPlaceholder}
            className="
    h-10 rounded-xl
    pl-10
    pr-4
    rtl:pl-4
    rtl:pr-10
    placeholder:pl-1
    rtl:placeholder:pl-0
    rtl:placeholder:pr-1
  "
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <SessionsFilters
            status={status}
            sessionType={sessionType}
            onStatusChange={onStatusChange}
            onSessionTypeChange={onSessionTypeChange}
            translations={translations}
          />
        </div>
      </div>
    </div>
  );
};

export default SessionsToolbar;
