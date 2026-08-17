import { LucideIcon } from "lucide-react";

export interface SidebarItemType {
  title: string;
  href: string;
  icon: LucideIcon;
  roles: ("PATIENT" | "DOCTOR" | "SECRETARY")[];
  badge?: number;
}

export interface SidebarGroupType {
  title?: string;
  items: SidebarItemType[];
}
