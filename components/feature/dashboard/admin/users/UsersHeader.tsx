import { Users } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  totalUsers: number;
}

const UsersHeader = ({ totalUsers }: Props) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>

          <p className="text-sm text-muted-foreground">
            Manage patients and doctors
          </p>
        </div>
      </div>

      <Card className="w-fit rounded-xl px-4 py-2 shadow-none flex justify-center flex-row items-center">
        <p className="text-xs text-muted-foreground">Total Users</p>

        <p className="text-xl font-semibold">{totalUsers}</p>
      </Card>
    </div>
  );
};

export default UsersHeader;
