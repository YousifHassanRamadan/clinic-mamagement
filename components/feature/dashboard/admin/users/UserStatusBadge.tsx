// components/feature/dashboard/admin/users/UserStatusBadge.tsx

import { CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface Props {
  approved: boolean;

  translations: {
    approved: string;
    pending: string;
  };
}

const UserStatusBadge = ({ approved, translations }: Props) => {
  if (approved) {
    return (
      <Badge
        variant="outline"
        className="rounded-full border-success/30 bg-success/10 text-success p-1"
      >
        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
        {translations.approved}
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="rounded-full border-warning/30 bg-warning/10 text-warning"
    >
      <Clock3 className="mr-1 h-3.5 w-3.5" />
      {translations.pending}
    </Badge>
  );
};

export default UserStatusBadge;
