// app/.../users/page.tsx

import { getUsers } from "@/app/actions/admin-actions/user/get-users";
import UsersPage from "@/components/feature/dashboard/admin/users/UsersPage";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

const Users = async () => {
  const users = await getUsers();

  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <div className="p-4 sm:p-6">
      <UsersPage
        initialUsers={users}
        locale={locale}
        translations={{
          header: {
            title: t("users.page.header.title"),
            description: t("users.page.header.description"),
            totalUsers: t("users.page.header.totalUsers"),
          },

          toolbar: {
            searchPlaceholder: t("users.page.toolbar.searchPlaceholder"),
            allRoles: t("users.page.toolbar.allRoles"),
            patients: t("users.page.toolbar.patients"),
            doctors: t("users.page.toolbar.doctors"),
            allStatuses: t("users.page.toolbar.allStatuses"),
            approved: t("users.page.toolbar.approved"),
            pending: t("users.page.toolbar.pending"),
          },

          table: {
            user: t("users.page.table.user"),
            contact: t("users.page.table.contact"),
            address: t("users.page.table.address"),
            role: t("users.page.table.role"),
            status: t("users.page.table.status"),
            joined: t("users.page.table.joined"),
            actions: t("users.page.table.actions"),
          },

          empty: {
            title: t("users.page.empty.title"),
            description: t("users.page.empty.description"),
          },

          user: {
            male: t("users.page.user.male"),
            female: t("users.page.user.female"),
            genderNotSpecified: t("users.page.user.genderNotSpecified"),
            noAddress: t("users.page.user.noAddress"),
            joined: t("users.page.user.joined"),
            joinedLabel: t("users.page.user.joined"),
          },

          status: {
            approved: t("users.page.status.approved"),
            pending: t("users.page.status.pending"),
          },

          actions: {
            approve: t("users.page.actions.approve"),
            unapprove: t("users.page.actions.unapprove"),
            delete: t("users.page.actions.delete"),
            deleteUser: t("users.page.actions.deleteUser"),
            deleteDescription: t("users.page.actions.deleteDescription"),
            cancel: t("users.page.actions.cancel"),
            deleting: t("users.page.actions.deleting"),
          },
        }}
      />
    </div>
  );
};

export default Users;
