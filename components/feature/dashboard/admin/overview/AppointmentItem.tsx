import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Appointment {
  id: string;
  patient: string;
  date: Date;
  time: string;
  status: string;
  type: string;
  duration: string;
}

interface AppointmentItemProps {
  appointment: Appointment;
}

const AppointmentItem = ({ appointment }: AppointmentItemProps) => {
  const initials = appointment.patient
    .split(" ")
    .map((name) => name[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex items-center justify-between rounded-xl border p-4">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>

        <div>
          <h4 className="font-medium">{appointment.patient}</h4>

          <p className="text-sm text-muted-foreground">
            {appointment.type
              .replaceAll("_", " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </p>

          <p className="text-xs text-muted-foreground">
            {appointment.duration}
          </p>
        </div>
      </div>

      <span className="text-sm font-semibold">{appointment.time}</span>
    </div>
  );
};

export default AppointmentItem;
