"use client";

import { LogOut, Settings, User } from "lucide-react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const UserMenuActions = () => {
  const router = useRouter();

  return (
    <>
      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => router.push("/dashboard/profile")}
      >
        <User className="mr-2 h-4 w-4" />
        <span>Profile</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        className="cursor-pointer"
        onClick={() => router.push("/dashboard/settings")}
      >
        <Settings className="mr-2 h-4 w-4" />
        <span>Settings</span>
      </DropdownMenuItem>

      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="cursor-pointer text-red-600 focus:text-red-600"
        onClick={() =>
          signOut({
            callbackUrl: "/login",
          })
        }
      >
        <LogOut className="mr-2 h-4 w-4" />
        <span>Sign out</span>
      </DropdownMenuItem>
    </>
  );
};

export default UserMenuActions;
