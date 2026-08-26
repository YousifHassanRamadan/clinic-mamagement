// components/feature/dashboard/admin/appointments/AppointmentsHeader.tsx

import { CalendarCheck2, Plus } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

interface Props {
  translations: {
    eyebrow: string;
    title: string;
    description: string;
    createAppointment: string;
  };
}

const AppointmentsHeader = ({ translations }: Props) => {
  return (
    <div className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-primary">
          <CalendarCheck2 className="h-4 w-4" />
          {translations.eyebrow}
        </div>

        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {translations.title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {translations.description}
        </p>
      </div>

      <Button asChild className="rounded-xl">
        <Link href="/dashboard/admin/appoinments/management-appoinments">
          <Plus className="mr-2 h-4 w-4" />
          {translations.createAppointment}
        </Link>
      </Button>
    </div>
  );
};

export default AppointmentsHeader;
