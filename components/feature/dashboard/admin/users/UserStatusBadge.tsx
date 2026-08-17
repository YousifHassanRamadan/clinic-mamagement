import { CheckCircle2, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";

interface Props {
  approved: boolean;
}

const UserStatusBadge = ({ approved }: Props) => {
  if (approved) {
    return (
      <Badge
        variant="outline"
        className="rounded-full border-success/30 bg-success/10 text-success"
      >
        <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
        Approved
      </Badge>
    );
  }

  return (
    <Badge
      variant="outline"
      className="rounded-full border-warning/30 bg-warning/10 text-warning"
    >
      <Clock3 className="mr-1 h-3.5 w-3.5" />
      Pending
    </Badge>
  );
};

export default UserStatusBadge;
