import { Badge } from "@/components/ui/badge";

import { UserRole } from "./types";

interface Props {
  role: UserRole;
}

const UserRoleBadge = ({ role }: Props) => {
  const isDoctor = role === "DOCTOR";

  return (
    <Badge variant="secondary" className="rounded-full">
      {isDoctor ? "Doctor" : "Patient"}
    </Badge>
  );
};

export default UserRoleBadge;
