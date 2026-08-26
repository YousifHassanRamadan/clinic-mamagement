// UserMenu.tsx

import { auth } from "@/providers/auth/auth";

import UserMenuClient from "./UserMenuClient";

interface Props {
  locale: "ar" | "en";
}

const UserMenu = async ({ locale }: Props) => {
  const session = await auth();

  return (
    <UserMenuClient
      locale={locale}
      user={{
        name: session?.user?.name ?? "User",
        email: session?.user?.email ?? null,
        image: session?.user?.image ?? null,
      }}
    />
  );
};

export default UserMenu;
