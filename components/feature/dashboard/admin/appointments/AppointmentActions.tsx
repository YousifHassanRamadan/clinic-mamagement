// components/feature/dashboard/admin/appointments/AppointmentActions.tsx

"use client";

import { CalendarClock, Check, MoreHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AdminAppointment } from "./types";

interface Props {
  appointment: AdminAppointment;
  onConfirm: () => void;
  onReschedule: () => void;
  onCancel: () => void;

  translations: {
    confirm: string;
    reschedule: string;
    cancelAppointment: string;
  };
}

const AppointmentActions = ({
  appointment,
  onConfirm,
  onReschedule,
  onCancel,
  translations,
}: Props) => {
  const isCancelled = appointment.status === "CANCELLED";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-44">
        {!isCancelled && appointment.status !== "CONFIRMED" && (
          <DropdownMenuItem onClick={onConfirm}>
            <Check className="mr-2 h-4 w-4 text-emerald-600" />
            {translations.confirm}
          </DropdownMenuItem>
        )}

        {/* {!isCancelled && (
          <DropdownMenuItem onClick={onReschedule}>
            <CalendarClock className="mr-2 h-4 w-4 text-sky-600" />
            {translations.reschedule}
          </DropdownMenuItem>
        )} */}

        {!isCancelled && (
          <>
            <DropdownMenuItem
              onClick={onCancel}
              className="text-red-600 focus:text-red-600"
            >
              <X className="mr-2 h-4 w-4" />
              {translations.cancelAppointment}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AppointmentActions;
