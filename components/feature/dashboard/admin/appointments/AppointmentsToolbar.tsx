"use client";

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
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground rtl:left-auto rtl:right-3" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={translations.searchPlaceholder}
          className="
            h-11 rounded-xl border-input bg-background
            pl-10 pr-4
            shadow-sm
            transition-all duration-200
            hover:border-primary/40
            focus:ring-2 focus:ring-primary/20
            rtl:pl-4 rtl:pr-10
            placeholder:pl-1
            rtl:placeholder:pl-0 rtl:placeholder:pr-1
          "
        />
      </div>

      {/* Status Filter */}
      <Select value={status} onValueChange={onStatusChange}>
        <SelectTrigger
          className="
            h-11 w-full rounded-xl border-input bg-background px-4
            shadow-sm
            transition-all duration-200
            hover:border-primary/40
            hover:bg-muted/30
            focus:ring-2 focus:ring-primary/20
            lg:w-44
          "
          aria-label={translations.filterStatus}
        >
          <div className="flex min-w-0 items-center gap-2">
            <SlidersHorizontal className="h-4 w-4 shrink-0 text-muted-foreground" />

            <SelectValue placeholder={translations.filterStatus} />
          </div>
        </SelectTrigger>

        <SelectContent
          position="popper"
          sideOffset={6}
          className="
            min-w-[var(--radix-select-trigger-width)]
            overflow-hidden
            rounded-xl
            border
            bg-popover
            p-1.5
            shadow-lg
          "
        >
          <SelectItem
            value="ALL"
            className="
              cursor-pointer rounded-lg px-3 py-2.5
              text-sm font-medium
              transition-colors
              focus:bg-primary/10
              focus:text-primary
            "
          >
            {translations.allStatuses}
          </SelectItem>

          <SelectItem
            value="PENDING"
            className="
              cursor-pointer rounded-lg px-3 py-2.5
              text-sm font-medium
              transition-colors
              focus:bg-primary/10
              focus:text-primary
            "
          >
            {translations.pending}
          </SelectItem>

          <SelectItem
            value="CONFIRMED"
            className="
              cursor-pointer rounded-lg px-3 py-2.5
              text-sm font-medium
              transition-colors
              focus:bg-primary/10
              focus:text-primary
            "
          >
            {translations.confirmed}
          </SelectItem>

          <SelectItem
            value="CANCELLED"
            className="
              cursor-pointer rounded-lg px-3 py-2.5
              text-sm font-medium
              transition-colors
              focus:bg-primary/10
              focus:text-primary
            "
          >
            {translations.cancelled}
          </SelectItem>

          <SelectItem
            value="COMPLETED"
            className="
              cursor-pointer rounded-lg px-3 py-2.5
              text-sm font-medium
              transition-colors
              focus:bg-primary/10
              focus:text-primary
            "
          >
            {translations.completed}
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AppointmentsToolbar;
