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
}

const UsersToolbar = ({
  search,
  role,
  approval,
  onSearchChange,
  onRoleChange,
  onApprovalChange,
}: Props) => {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card p-3 shadow-sm lg:flex-row">
      {/* Search */}
      <div className="relative min-w-0 flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search name, email or phone..."
          className="h-10 rounded-lg pl-9 "
        />
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-3 lg:flex">
        <Select
          value={role}
          onValueChange={(value) => onRoleChange(value as UserRole | "ALL")}
        >
          <SelectTrigger className="h-10 rounded-lg lg:w-40 p-3">
            <UsersRound className="mr-2 h-4 w-4 text-muted-foreground" />

            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All roles</SelectItem>

            <SelectItem value="PATIENT">Patients</SelectItem>

            <SelectItem value="DOCTOR">Doctors</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={approval}
          onValueChange={(value) => onApprovalChange(value as UserApproval)}
        >
          <SelectTrigger className="h-10 rounded-lg lg:w-40 p-3">
            <CheckCircle2 className="mr-2 h-4 w-4 text-muted-foreground" />

            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ALL">All statuses</SelectItem>

            <SelectItem value="APPROVED">Approved</SelectItem>

            <SelectItem value="PENDING">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default UsersToolbar;
