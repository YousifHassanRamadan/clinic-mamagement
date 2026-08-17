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

  date: string;
  time: string;

  status: AppointmentStatus;

  reason?: string;
  phone?: string;

  createdAt: string;
}
