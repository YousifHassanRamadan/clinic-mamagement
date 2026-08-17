import { auth } from "@/providers/auth/auth";

import UserMenuClient from "./UserMenuClient";

const UserMenu = async () => {
  const session = await auth();

  return (
    <UserMenuClient
      user={{
        name: session?.user?.name ?? "User",
        email: session?.user?.email ?? null,
        image: session?.user?.image ?? null,
      }}
    />
  );
};

export default UserMenu;
