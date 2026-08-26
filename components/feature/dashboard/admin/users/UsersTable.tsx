// components/feature/dashboard/admin/users/UsersTable.tsx

import { AdminUser } from "./types";
import UserRow from "./UserRow";

interface Props {
  users: AdminUser[];
  onUserDeleted: () => void;

  translations: {
    user: string;
    contact: string;
    address: string;
    role: string;
    status: string;
    joined: string;
    actions: string;

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

const UsersTable = ({ users, onUserDeleted, translations }: Props) => {
  return (
    <div className="overflow-hidden rounded-xl border bg-card shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px]">
          <thead>
            <tr className="border-b bg-muted/40">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {translations.user}
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {translations.contact}
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {translations.address}
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {translations.role}
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {translations.status}
              </th>

              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {translations.joined}
              </th>

              <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {translations.actions}
              </th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onUserDeleted={onUserDeleted}
                translations={translations}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
