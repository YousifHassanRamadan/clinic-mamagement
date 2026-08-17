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

const UserCard = ({ user, onUserDeleted }: Props) => {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
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

        <UserActions
          userId={user.id}
          approval={user.approval}
          onUpdated={onUserDeleted}
        />
      </div>

      {/* Contact */}
      <div className="mt-4 space-y-2.5">
        <div className="flex items-center gap-2 text-sm">
          <Mail className="h-4 w-4 shrink-0 text-muted-foreground" />

          <span className="truncate">{user.email}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <Phone className="h-4 w-4 shrink-0 text-muted-foreground" />

          <span>{user.phone}</span>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />

          <span className="truncate">{user.address ?? "No address"}</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <UserRoleBadge role={user.role} />

        <UserStatusBadge approved={user.approval} />
      </div>

      {/* Joined */}
      <p className="mt-3 text-xs text-muted-foreground">
        Joined {format(new Date(user.createdAt), "MMM d, yyyy")}
      </p>
    </div>
  );
};

export default UserCard;
