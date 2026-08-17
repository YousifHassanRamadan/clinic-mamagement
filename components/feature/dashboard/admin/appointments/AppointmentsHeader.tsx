import { CalendarCheck2, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const AppointmentsHeader = () => {
  return (
    <div className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <CalendarCheck2 className="h-4 w-4" />
          Appointments
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          All appointments
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Review appointment requests, confirm bookings, reschedule
          appointments, or cancel them when needed.
        </p>
      </div>

      <Button asChild className="rounded-xl">
        <Link href="/dashboard/admin/appoinments/management-appoinments">
          <Plus className="mr-2 h-4 w-4" />
          Create Appointment
        </Link>
      </Button>
    </div>
  );
};

export default AppointmentsHeader;
