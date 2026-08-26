// components/feature/dashboard/admin/appointments/AppointmentsToolbar.tsx

import { Search, SlidersHorizontal } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Props {
  search: string;
  onSearchChange: (value: string) => void;

  status: string;
  onStatusChange: (value: string) => void;

  translations: {
    searchPlaceholder: string;
    filterStatus: string;
    allStatuses: string;
    pending: string;
    confirmed: string;
    cancelled: string;
    completed: string;
  };
}

const AppointmentsToolbar = ({
  search,
  onSearchChange,
  status,
  onStatusChange,
  translations,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 border-b p-4 lg:flex-row lg:items-center">
      {/* Search */}
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

      {/* Status Filter */}
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger
          className="h-10 w-full rounded-xl p-3 lg:w-44"
          aria-label={translations.filterStatus}
        >
          <SlidersHorizontal className="mr-2 h-4 w-4 text-muted-foreground" />

          <SelectValue placeholder={translations.filterStatus} />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="ALL">{translations.allStatuses}</SelectItem>

          <SelectItem value="PENDING">{translations.pending}</SelectItem>

          <SelectItem value="CONFIRMED">{translations.confirmed}</SelectItem>

          <SelectItem value="CANCELLED">{translations.cancelled}</SelectItem>

          <SelectItem value="COMPLETED">{translations.completed}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AppointmentsToolbar;
