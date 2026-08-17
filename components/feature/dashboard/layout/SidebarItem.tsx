"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { SidebarItemType } from "./types";

interface Props {
  item: SidebarItemType;
  onNavigate?: () => void;
}

const SidebarItem = ({ item, onNavigate }: Props) => {
  const pathname = usePathname();

  const Icon = item.icon;

  const active = pathname === item.href;

  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
        active
          ? "bg-primary text-primary-foreground"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
      onClick={onNavigate}
    >
      <Icon className="h-5 w-5 shrink-0" />

      <span className="flex-1">{item.title}</span>

      {item.badge && (
        <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
          {item.badge}
        </span>
      )}
    </Link>
  );
};

export default SidebarItem;
