"use client";

import { ChevronDown, LogOut, Settings, User } from "lucide-react";

import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Props {
  user: {
    name: string;
    email: string | null;
    image: string | null;
  };
}

const UserMenuClient = ({ user }: Props) => {
  const router = useRouter();

  const initials = user.name
    .split(" ")
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className="flex items-center gap-3 rounded-full border px-2 py-1 transition hover:bg-muted"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image ?? undefined} alt={user.name} />

            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="hidden text-left md:block">
            <p className="text-sm font-medium">{user.name}</p>
          </div>

          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-56 rounded-xl">
        <div className="px-3 py-2">
          <p className="text-sm font-medium">{user.name}</p>

          {user.email && (
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          )}
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/profile")}
        >
          <User className="mr-2 h-4 w-4" />
          Profile
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onClick={() => router.push("/dashboard/settings")}
        >
          <Settings className="mr-2 h-4 w-4" />
          Settings
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
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenuClient;
