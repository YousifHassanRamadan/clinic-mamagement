import { cn } from "@/lib/utils";

export type AppointmentStatus =
  | "PENDING"
  | "CONFIRMED"
  | "COMPLETED"
  | "CANCELLED";

interface Props {
  status: AppointmentStatus;
}

const styles = {
  PENDING: "bg-yellow-100 text-yellow-700 border-yellow-200",

  CONFIRMED: "bg-blue-100 text-blue-700 border-blue-200",

  COMPLETED: "bg-green-100 text-green-700 border-green-200",

  CANCELLED: "bg-red-100 text-red-700 border-red-200",
};

const AppointmentStatus = ({ status }: Props) => {
  return (
    <span
      className={cn(
        "rounded-full border px-3 py-1 text-xs font-medium",
        styles[status],
      )}
    >
      {status}
    </span>
  );
};

export default AppointmentStatus;
