// components/feature/dashboard/admin/users/UsersHeader.tsx

import { Users } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  totalUsers: number;

  translations: {
    title: string;
    description: string;
    totalUsers: string;
  };
}

const UsersHeader = ({ totalUsers, translations }: Props) => {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Users className="h-5 w-5" />
        </div>

        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {translations.title}
          </h1>

          <p className="text-sm text-muted-foreground">
            {translations.description}
          </p>
        </div>
      </div>

      <Card className="flex w-fit flex-row items-center justify-center gap-3 rounded-xl px-4 py-2 shadow-none">
        <p className="text-xs text-muted-foreground">
          {translations.totalUsers}
        </p>

        <p className="text-xl font-semibold">{totalUsers}</p>
      </Card>
    </div>
  );
};

export default UsersHeader;
