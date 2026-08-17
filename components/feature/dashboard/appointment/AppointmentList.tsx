import AppointmentItem from "./AppointmentItem";

import type { PatientAppointment } from "./AppointmentsPage";

interface Props {
  appointments: PatientAppointment[];
}

const AppointmentList = ({ appointments }: Props) => {
  if (appointments.length === 0) {
    return (
      <div className="rounded-3xl border p-10 text-center">
        <p className="text-muted-foreground">No appointments found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {appointments.map((appointment) => (
        <AppointmentItem key={appointment.id} appointment={appointment} />
      ))}
    </div>
  );
};

export default AppointmentList;
