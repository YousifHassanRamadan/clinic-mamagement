"use client";

import AppointmentRow from "./AppointmentRow";
import { AdminAppointment } from "./types";

interface Props {
  appointments: AdminAppointment[];

  onConfirm: (appointment: AdminAppointment) => void;
  onReschedule: (appointment: AdminAppointment) => void;
  onCancel: (appointment: AdminAppointment) => void;
}

const AppointmentsTable = ({
  appointments,
  onConfirm,
  onReschedule,
  onCancel,
}: Props) => {
  return (
    <div>
      {/* Desktop header */}
      <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 border-b bg-muted/30 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
        <span>Patient</span>
        <span>Date & time</span>
        <span>Appointment</span>

        <span />
      </div>

      {appointments.length === 0 ? (
        <div className="flex min-h-60 items-center justify-center p-6 text-center">
          <div>
            <p className="font-medium">No appointments found</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Try changing your search or filters.
            </p>
          </div>
        </div>
      ) : (
        appointments.map((appointment) => (
          <AppointmentRow
            key={appointment.id}
            appointment={appointment}
            onConfirm={() => onConfirm(appointment)}
            onReschedule={() => onReschedule(appointment)}
            onCancel={() => onCancel(appointment)}
          />
        ))
      )}
    </div>
  );
};

export default AppointmentsTable;
