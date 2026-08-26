// components/feature/dashboard/admin/users/UserRow.tsx

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

  translations: {
    male: string;
    female: string;
    genderNotSpecified: string;
    noAddress: string;
    joinedLabel: string;

    approved: string;
    pending: string;

    approve: string;
    unapprove: string;
    delete: string;
    deleteUser: string;
    deleteDescription: string;
    cancel: string;
    deleting: string;
  };
}

const UserRow = ({ user, onUserDeleted, translations }: Props) => {
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
                ? translations.male
                : user.gender === "FEMALE"
                  ? translations.female
                  : translations.genderNotSpecified}
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
          <span className="truncate">
            {user.address ?? translations.noAddress}
          </span>
        </div>
      </td>

      <td className="px-4 py-4">
        <UserRoleBadge role={user.role} />
      </td>

      <td className="px-4 py-4">
        <UserStatusBadge
          approved={user.approval}
          translations={{
            approved: translations.approved,
            pending: translations.pending,
          }}
        />
      </td>

      <td className="whitespace-nowrap px-4 py-4 text-sm text-muted-foreground">
        {format(new Date(user.createdAt), "MMM d, yyyy")}
      </td>

      <td className="px-4 py-4 text-right">
        <UserActions
          userId={user.id}
          approval={user.approval}
          onUpdated={onUserDeleted}
          translations={{
            approve: translations.approve,
            unapprove: translations.unapprove,
            delete: translations.delete,
            deleteUser: translations.deleteUser,
            deleteDescription: translations.deleteDescription,
            cancel: translations.cancel,
            deleting: translations.deleting,
          }}
        />
      </td>
    </tr>
  );
};

export default UserRow;
