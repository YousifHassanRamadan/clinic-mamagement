// components/feature/dashboard/admin/users/UserCard.tsx

import { format } from "date-fns";
import { Mail, MapPin, Phone } from "lucide-react";

import { AdminUser } from "./types";

import UserAvatar from "./UserAvatar";
import UserRoleBadge from "./UserRoleBadge";
import UserStatusBadge from "./UserStatusBadge";
import UserActions from "./UserActions";

import type { Locale } from "@/i18n/config";

interface Props {
  user: AdminUser;
  onUserDeleted: () => void;
  locale: Locale;

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

const UserCard = ({ user, onUserDeleted, locale, translations }: Props) => {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
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
                ? translations.male
                : user.gender === "FEMALE"
                  ? translations.female
                  : translations.genderNotSpecified}
            </p>
          </div>
        </div>

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
      </div>

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
          <span className="truncate">
            {user.address ?? translations.noAddress}
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between border-t pt-4">
        <UserRoleBadge role={user.role} />

        <UserStatusBadge
          approved={user.approval}
          translations={{
            approved: translations.approved,
            pending: translations.pending,
          }}
        />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        {translations.joinedLabel}{" "}
        {new Date(user.createdAt).toLocaleDateString(
          locale === "ar" ? "ar-EG" : "en-GB",
          {
            day: "numeric",
            month: "short",
            year: "numeric",
          },
        )}
      </p>
    </div>
  );
};

export default UserCard;
