// components/feature/dashboard/admin/appointments/AppointmentsTable.tsx

"use client";

import AppointmentRow from "./AppointmentRow";
import { AdminAppointment } from "./types";

interface Props {
  appointments: AdminAppointment[];

  onConfirm: (appointment: AdminAppointment) => void;
  onReschedule: (appointment: AdminAppointment) => void;
  onCancel: (appointment: AdminAppointment) => void;

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

const AppointmentsTable = ({
  appointments,
  onConfirm,
  onReschedule,
  onCancel,
  translations,
}: Props) => {
  return (
    <div>
      <div className="hidden grid-cols-[1.5fr_1fr_1fr_1fr_auto] gap-4 border-b bg-muted/30 px-4 py-3 text-xs font-medium uppercase tracking-wide text-muted-foreground md:grid">
        <span>{translations.patient}</span>
        <span>{translations.dateTime}</span>
        <span>{translations.appointment}</span>
        <span />
      </div>

      {appointments.length === 0 ? (
        <div className="flex min-h-60 items-center justify-center p-6 text-center">
          <div>
            <p className="font-medium">{translations.noAppointmentsFound}</p>

            <p className="mt-1 text-sm text-muted-foreground">
              {translations.changeSearchOrFilters}
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
            translations={translations}
          />
        ))
      )}
    </div>
  );
};

export default AppointmentsTable;
