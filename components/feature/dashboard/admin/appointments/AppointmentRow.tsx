"use client";

import { CalendarDays, Clock, Phone } from "lucide-react";

import { AdminAppointment } from "./types";
import AppointmentStatusBadge from "./AppointmentStatusBadge";
import AppointmentActions from "./AppointmentActions";

interface Props {
  appointment: AdminAppointment;
  onConfirm: () => void;
  onReschedule: () => void;
  onCancel: () => void;
}

const AppointmentRow = ({
  appointment,
  onConfirm,
  onReschedule,
  onCancel,
}: Props) => {
  return (
    <div className="grid gap-4 border-b p-4 last:border-b-0 md:grid-cols-[1.5fr_1fr_1fr_1fr_auto] md:items-center">
      {/* Patient */}
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

      {/* Date */}
      <div>
        <div className="flex items-center gap-2 text-sm">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />

          <span>{appointment.date}</span>
        </div>

        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3.5 w-3.5" />

          <span>{appointment.time}</span>

          <span>•</span>

          {/* <span>{appointment.duration} min</span> */}
        </div>
      </div>

      {/* Type */}

      {/* Status */}
      <div>
        <AppointmentStatusBadge status={appointment.status} />
      </div>

      {/* Actions */}
      <div className="flex justify-end">
        <AppointmentActions
          appointment={appointment}
          onConfirm={onConfirm}
          onReschedule={onReschedule}
          onCancel={onCancel}
        />
      </div>
    </div>
  );
};

export default AppointmentRow;
