import { format } from "date-fns";
import { Mail, MapPin, Phone } from "lucide-react";

import { AdminUser } from "./types";

import UserAvatar from "./UserAvatar";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

interface Props {
  user: AdminUser;
  onUserDeleted: () => void;
}

const UserRow = ({ user, onUserDeleted }: Props) => {
  return (
    <tr className="border-b transition-colors last:border-0 hover:bg-muted/40">
      <td className="px-4 py-4">
        <div className="flex items-center gap-3">
          <UserAvatar
            firstName={user.firstName}
            lastName={user.lastName}
            image={user.image}
          />

          <div className="min-w-0">
            <p className="truncate font-medium">
              {user.firstName} {user.lastName}
            </p>

            <p className="text-xs text-muted-foreground">
              {user.gender === "MALE"
                ? "Male"
                : user.gender === "FEMALE"
                  ? "Female"
                  : "Gender not specified"}
            </p>
          </div>
        </div>
      </td>

      <td className="px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">{user.email}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Phone className="h-3.5 w-3.5 shrink-0" />
          {user.phone}
        </div>
      </td>

      <td className="max-w-48 px-4 py-4">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">{user.address ?? "—"}</span>
        </div>
      </td>

      <td className="px-4 py-4">
        <UserRoleBadge role={user.role} />
      </td>

      <td className="px-4 py-4">
        <UserStatusBadge approved={user.approval} />
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        {format(new Date(user.createdAt), "MMM d, yyyy")}
      </td>

      <td className="px-4 py-4 text-right">
        <UserActions
          userId={user.id}
          approval={user.approval}
          onUpdated={onUserDeleted}
        />
      </td>
    </tr>
  );
};

export default UserRow;
