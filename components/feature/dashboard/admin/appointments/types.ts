export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "CANCELLED"
  | "COMPLETED";

export interface AdminAppointment {
  id: string;

  patientId: string;
  patientName: string;
  patientInitials: string;

  email?: string;
  phone?: string;

  date: string;
  time: string;

  status: AppointmentStatus;

  reason?: string;

  createdAt: string;
}
