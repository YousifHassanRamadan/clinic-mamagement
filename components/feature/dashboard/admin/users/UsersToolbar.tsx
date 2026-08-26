// components/feature/dashboard/admin/users/UsersToolbar.tsx

import { CheckCircle2, Search, UsersRound } from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserApproval, UserRole } from "./types";

interface Props {
  search: string;
  role: UserRole | "ALL";
  approval: UserApproval;

  onSearchChange: (value: string) => void;
  onRoleChange: (value: UserRole | "ALL") => void;
  onApprovalChange: (value: UserApproval) => void;

  translations: {
    searchPlaceholder: string;
    allRoles: string;
    patients: string;
    doctors: string;
    allStatuses: string;
    approved: string;
    pending: string;
  };
}

const UsersToolbar = ({
  search,
  role,
  approval,
  onSearchChange,
  onRoleChange,
  onApprovalChange,
  translations,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm lg:flex-row">
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder={translations.searchPlaceholder}
          className="h-10 rounded-lg pl-9 pr-4"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:flex">
        <Select
          value={role}
          onValueChange={(value) => onRoleChange(value as UserRole | "ALL")}
        >
          <SelectTrigger className="h-10 rounded-lg p-3 lg:w-40">
            <UsersRound className="mr-2 h-4 w-4 text-muted-foreground" />

            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">{translations.allRoles}</SelectItem>

            <SelectItem value="PATIENT">{translations.patients}</SelectItem>

            <SelectItem value="DOCTOR">{translations.doctors}</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={approval}
          onValueChange={(value) => onApprovalChange(value as UserApproval)}
        >
          <SelectTrigger className="h-10 rounded-lg p-3 lg:w-40">
            <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />

            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">{translations.allStatuses}</SelectItem>

            <SelectItem value="APPROVED">{translations.approved}</SelectItem>

            <SelectItem value="PENDING">{translations.pending}</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UsersToolbar;
