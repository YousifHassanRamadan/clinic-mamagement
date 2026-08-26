// components/feature/dashboard/admin/sessions/SessionsFilters.tsx

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
        <SelectTrigger className="w-full rounded-xl sm:w-[170px] p-3">
          <SelectValue placeholder={translations.status} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">{translations.allStatuses}</SelectItem>

          <SelectItem value={SessionStatus.COMPLETED}>
            {translations.completed}
          </SelectItem>

          <SelectItem value={SessionStatus.SCHEDULED}>
            {translations.scheduled}
          </SelectItem>

          <SelectItem value={SessionStatus.DRAFT}>
            {translations.draft}
          </SelectItem>

          <SelectItem value={SessionStatus.CANCELLED}>
            {translations.cancelled}
          </SelectItem>

          <SelectItem value={SessionStatus.NO_SHOW}>
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
        <SelectTrigger className="w-full rounded-xl sm:w-[180px] p-3">
          <SelectValue placeholder={translations.type} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="all">{translations.allTypes}</SelectItem>

          <SelectItem value={SessionType.INITIAL}>
            {translations.initialSession}
          </SelectItem>

          <SelectItem value={SessionType.FOLLOW_UP}>
            {translations.followUp}
          </SelectItem>

          <SelectItem value={SessionType.INDIVIDUAL}>
            {translations.individual}
          </SelectItem>

          <SelectItem value={SessionType.EMERGENCY}>
            {translations.emergency}
          </SelectItem>

          <SelectItem value={SessionType.OTHER}>
            {translations.other}
          </SelectItem>
        </SelectContent>
      </Select>
    </>
  );
};

export default SessionsFilters;
