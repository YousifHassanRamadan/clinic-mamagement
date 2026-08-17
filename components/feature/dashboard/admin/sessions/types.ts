import type {
  ClinicSession,
  Appointment,
  SessionAttachment,
} from "@/app/generated/prisma/client";
import { Mood, SessionStatus, SessionType } from "@/app/generated/prisma/enums";

export { Mood, SessionStatus, SessionType };

export type SessionWithRelations = Omit<ClinicSession, "fee"> & {
  fee: number;

  patient: {
    id: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  appointment: Pick<Appointment, "id" | "date" | "status"> | null;

  attachments: SessionAttachment[];
};

export type SessionPatient = {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
};

export type SessionAppointment = {
  id: string;
  userId: string;
  date: Date;
  status: string;
};

export type SessionFormValues = {
  patientId: string;
  appointmentId?: string;

  date: string;
  time: string;

  duration: number;

  sessionType: SessionType;

  diagnosis: string;

  mood?: Mood;

  publicNotes: string;
  privateClinicalNotes: string;

  shareNotes: boolean;
  sendSummaryEmail: boolean;

  fee: number;
};
