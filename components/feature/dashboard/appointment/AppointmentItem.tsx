import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import AppointmentStatus from "./AppointmentStatus";

import type { PatientAppointment } from "./AppointmentsPage";

interface Props {
  appointment: PatientAppointment;
}

const AppointmentItem = ({ appointment }: Props) => {
  const appointmentDate = new Date(appointment.date);

  const formattedDate = appointmentDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "2-digit",
    year: "numeric",
  });

  const formattedTime = appointmentDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <Card className="rounded-3xl p-6 transition hover:shadow-md">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10">
            <CalendarDays className="h-6 w-6 text-primary" />
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold">{formattedDate}</h3>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-muted-foreground">
              <span className="flex items-center gap-2">
                <Clock3 className="h-4 w-4" />
                {formattedTime}
              </span>

              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Clinic
              </span>

              {appointment.session && (
                <span>{appointment.session.duration} minutes</span>
              )}
            </div>

            {appointment.notes && (
              <p className="text-sm text-muted-foreground">
                {appointment.notes}
              </p>
            )}

            <AppointmentStatus status={appointment.status} />
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AppointmentItem;
