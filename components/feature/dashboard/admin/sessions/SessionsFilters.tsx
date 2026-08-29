"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface SessionsFiltersProps {
  status: SessionStatus | "all";
  sessionType: SessionType | "all";

  onStatusChange: (value: SessionStatus | "all") => void;
  onSessionTypeChange: (value: SessionType | "all") => void;

  translations: Translations;
}

const selectTriggerClass =
  "h-11 w-full rounded-xl border-input bg-background px-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-muted/30 focus:ring-2 focus:ring-primary/20 sm:w-[170px]";

const selectContentClass =
  "min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border bg-popover p-1.5 shadow-lg";

const selectItemClass =
  "cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:bg-primary/10 focus:text-primary";

const SessionsFilters = ({
  status,
  sessionType,
  onStatusChange,
  onSessionTypeChange,
  translations,
}: SessionsFiltersProps) => {
  return (
    <>
      <Select
        value={status}
        onValueChange={(value) =>
          onStatusChange(value as SessionStatus | "all")
        }
      >
        <SelectTrigger className={selectTriggerClass}>
          <SelectValue placeholder={translations.status} />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={6}
          className={selectContentClass}
        >
          <SelectItem value="all" className={selectItemClass}>
            {translations.allStatuses}
          </SelectItem>

          <SelectItem
            value={SessionStatus.COMPLETED}
            className={selectItemClass}
          >
            {translations.completed}
          </SelectItem>

          <SelectItem
            value={SessionStatus.SCHEDULED}
            className={selectItemClass}
          >
            {translations.scheduled}
          </SelectItem>

          <SelectItem value={SessionStatus.DRAFT} className={selectItemClass}>
            {translations.draft}
          </SelectItem>

          <SelectItem
            value={SessionStatus.CANCELLED}
            className={selectItemClass}
          >
            {translations.cancelled}
          </SelectItem>

          <SelectItem value={SessionStatus.NO_SHOW} className={selectItemClass}>
            {translations.noShow}
          </SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={sessionType}
        onValueChange={(value) =>
          onSessionTypeChange(value as SessionType | "all")
        }
      >
        <SelectTrigger className={`${selectTriggerClass} sm:w-[180px]`}>
          <SelectValue placeholder={translations.type} />
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={6}
          className={selectContentClass}
        >
          <SelectItem value="all" className={selectItemClass}>
            {translations.allTypes}
          </SelectItem>

          <SelectItem value={SessionType.INITIAL} className={selectItemClass}>
            {translations.initialSession}
          </SelectItem>

          <SelectItem value={SessionType.FOLLOW_UP} className={selectItemClass}>
            {translations.followUp}
          </SelectItem>

          <SelectItem
            value={SessionType.INDIVIDUAL}
            className={selectItemClass}
          >
            {translations.individual}
          </SelectItem>

          <SelectItem value={SessionType.EMERGENCY} className={selectItemClass}>
            {translations.emergency}
          </SelectItem>

          <SelectItem value={SessionType.OTHER} className={selectItemClass}>
            {translations.other}
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SessionsFilters;
