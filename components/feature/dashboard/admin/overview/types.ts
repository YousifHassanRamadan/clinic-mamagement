import { LucideIcon } from "lucide-react";

export interface Stat {
  title: string;
  value: string | number;
  subtitle: string;
  icon: LucideIcon;
}

export interface Appointment {
  id: number;
  patient: string;
  type: string;
  duration: string;
  time: string;
}

export interface Session {
  id: number;
  patient: string;
  diagnosis: string;
  mood: string;
  status: string;
}

export interface Activity {
  id: number;
  title: string;
  description: string;
  time: string;
}
