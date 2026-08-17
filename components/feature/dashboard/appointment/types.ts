import { LucideIcon } from "lucide-react";
export type SessionMode = "ONSITE" | "ONLINE";

export interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

export interface SessionOption {
  id: SessionMode;
  title: string;
  description: string;
}

export type AppointmentStatus =
  | "UPCOMING"
  | "COMPLETED"
  | "PENDING"
  | "CANCELLED";

export interface Appointment {
  id: number;

  date: string;

  time: string;

  doctor: string;

  duration: string;

  location: string;

  notes: string;

  status: AppointmentStatus;

  icon: LucideIcon;
}
