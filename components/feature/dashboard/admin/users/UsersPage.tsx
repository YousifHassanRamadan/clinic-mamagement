"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import UsersHeader from "./UsersHeader";
import UsersToolbar from "./UsersToolbar";
import UsersTable from "./UsersTable";
import UserCard from "./UserCard";

import { AdminUser, UserApproval, UserRole } from "./types";
import { getUsers } from "@/app/actions/admin-actions/user/get-users";

interface Props {
  initialUsers: AdminUser[];
}

const UsersPage = ({ initialUsers }: Props) => {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);

  const [search, setSearch] = useState("");
  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [approval, setApproval] = useState<UserApproval>("ALL");

  const [isPending, startTransition] = useTransition();

  const refreshUsers = useCallback(() => {
    startTransition(async () => {
      const result = await getUsers({
        search,
        role,
        approval,
      });

      setUsers(result);
    });
  }, [search, role, approval]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      refreshUsers();
    }, 300);

    return () => clearTimeout(timeout);
  }, [refreshUsers]);

  return (
    <div className="space-y-6">
      <UsersHeader totalUsers={users.length} />

      <UsersToolbar
        search={search}
        role={role}
        approval={approval}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onApprovalChange={setApproval}
      />

      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 z-10 rounded-xl bg-background/50 backdrop-blur-[1px]" />
        )}

        {users.length > 0 ? (
          <>
            {/* Desktop */}
            <div className="hidden md:block">
              <UsersTable users={users} onUserDeleted={refreshUsers} />
            </div>

            {/* Mobile */}
            <div className="grid gap-3 md:hidden">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onUserDeleted={refreshUsers}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyUsers />
        )}
      </div>
    </div>
  );
};

const EmptyUsers = () => {
  return (
    <div className="rounded-xl border bg-card px-6 py-16 text-center shadow-sm">
      <h3 className="font-semibold">No users found</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        Try changing your search or filters.
      </p>
    </div>
  );
};

export default UsersPage;
