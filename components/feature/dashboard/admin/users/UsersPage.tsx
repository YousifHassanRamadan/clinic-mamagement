// components/feature/dashboard/admin/users/UsersPage.tsx

"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import UsersHeader from "./UsersHeader";
import UsersToolbar from "./UsersToolbar";
import UsersTable from "./UsersTable";
import UserCard from "./UserCard";

import { AdminUser, UserApproval, UserRole } from "./types";
import { getUsers } from "@/app/actions/admin-actions/user/get-users";

import type { Locale } from "@/i18n/config";

interface Translations {
  header: {
    title: string;
    description: string;
    totalUsers: string;
  };

  toolbar: {
    searchPlaceholder: string;
    allRoles: string;
    patients: string;
    doctors: string;
    allStatuses: string;
    approved: string;
    pending: string;
  };

  table: {
    user: string;
    contact: string;
    address: string;
    role: string;
    status: string;
    joined: string;
    actions: string;
  };

  empty: {
    title: string;
    description: string;
  };

  user: {
    male: string;
    female: string;
    genderNotSpecified: string;
    noAddress: string;
    joined: string;
    joinedLabel: string;
  };

  status: {
    approved: string;
    pending: string;
  };

  actions: {
    approve: string;
    unapprove: string;
    delete: string;
    deleteUser: string;
    deleteDescription: string;
    cancel: string;
    deleting: string;
  };
}

interface Props {
  initialUsers: AdminUser[];
  locale: Locale;
  translations: Translations;
}

const UsersPage = ({ initialUsers, locale, translations }: Props) => {
  const [users, setUsers] = useState<AdminUser[]>(initialUsers);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [role, setRole] = useState<UserRole | "ALL">("ALL");
  const [approval, setApproval] = useState<UserApproval>("ALL");

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const refreshUsers = useCallback(() => {
    startTransition(async () => {
      const result = await getUsers({
        search: debouncedSearch,
        role,
        approval,
      });

      setUsers(result);
    });
  }, [debouncedSearch, role, approval]);

  useEffect(() => {
    refreshUsers();
  }, [refreshUsers]);

  return (
    <div className="space-y-6">
      <UsersHeader
        totalUsers={users.length}
        translations={translations.header}
      />

      <UsersToolbar
        search={search}
        role={role}
        approval={approval}
        onSearchChange={setSearch}
        onRoleChange={setRole}
        onApprovalChange={setApproval}
        translations={translations.toolbar}
      />

      <div className="relative">
        {isPending && (
          <div className="absolute inset-0 z-10 rounded-xl bg-background/50 backdrop-blur-[1px]" />
        )}

        {users.length > 0 ? (
          <>
            <div className="hidden md:block">
              <UsersTable
                users={users}
                onUserDeleted={refreshUsers}
                translations={{
                  ...translations.table,
                  ...translations.user,
                  ...translations.status,
                  ...translations.actions,
                }}
              />
            </div>

            <div className="grid gap-3 md:hidden">
              {users.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  onUserDeleted={refreshUsers}
                  locale={locale}
                  translations={{
                    ...translations.user,
                    ...translations.status,
                    ...translations.actions,
                  }}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyUsers translations={translations.empty} />
        )}
      </div>
    </div>
  );
};

interface EmptyUsersProps {
  translations: {
    title: string;
    description: string;
  };
}

const EmptyUsers = ({ translations }: EmptyUsersProps) => {
  return (
    <div className="rounded-xl border bg-card px-6 py-16 text-center shadow-sm">
      <h3 className="font-semibold">{translations.title}</h3>

      <p className="mt-1 text-sm text-muted-foreground">
        {translations.description}
      </p>
    </div>
  );
};

export default UsersPage;
