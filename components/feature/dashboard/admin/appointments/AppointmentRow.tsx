// components/feature/dashboard/admin/appointments/AppointmentRow.tsx

"use client";

import { CalendarDays, Clock } from "lucide-react";

import { AdminAppointment } from "./types";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import AppointmentActions from "./AppointmentActions";

interface Props {
  appointment: AdminAppointment;
  onConfirm: () => void;
  onReschedule: () => void;
  onCancel: () => void;

  translations: {
    patient: string;
    dateTime: string;
    appointment: string;
    noAppointmentsFound: string;
    changeSearchOrFilters: string;
    confirm: string;
    reschedule: string;
    cancelAppointment: string;
  };
}

const AppointmentRow = ({
  appointment,
  onConfirm,
  onReschedule,
  onCancel,
  translations,
}: Props) => {
  const isCancelled = appointment.status === "CANCELLED";
  const isCompleted = appointment.status === "COMPLETED";
  const isConfirmed = appointment.status === "CONFIRMED";
  return (
    <div className="grid gap-4 border-b p-4 last:border-b-0 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-center">
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
          {appointment.patientInitials}
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">
            {appointment.patientName}
          </p>

          <p className="truncate text-xs text-muted-foreground">
            {appointment.patientId}
          </p>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span>{appointment.date}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />
          <span>{appointment.time}</span>
          <span>•</span>
        </div>
      </div>

      <div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>

      <div className="flex justify-end">
        {!isCancelled && !isCompleted && !isConfirmed && (
          <AppointmentActions
            appointment={appointment}
            onConfirm={onConfirm}
            onReschedule={onReschedule}
            onCancel={onCancel}
            translations={translations}
          />
        )}
      </div>
    </div>
  );
};

export default AppointmentRow;
