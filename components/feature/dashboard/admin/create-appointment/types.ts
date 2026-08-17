export type SessionDuration = 30 | 45 | 60 | 90;

export interface Doctor {
  id: string;
  name: string;
  role: string;
  initials: string;
}

export interface TimeSlot {
  id: string;
  time: string;
  selected: boolean;
}

export interface WorkingHours {
  start: string;
  end: string;
}

export interface AppointmentAvailability {
  date: Date;
  doctorId: string;
  workingHours: WorkingHours;
  sessionDuration: SessionDuration;
  selectedSlots: string[];
}
