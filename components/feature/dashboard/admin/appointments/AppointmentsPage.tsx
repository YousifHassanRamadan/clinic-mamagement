// components/feature/dashboard/admin/appointments/AppointmentsPage.tsx

"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

import { AdminAppointment } from "./types";

import AppointmentsHeader from "./AppointmentsHeader";
import AppointmentsToolbar from "./AppointmentsToolbar";
import AppointmentsTable from "./AppointmentsTable";
import RescheduleDialog from "./RescheduleDialog";

import { getAppointments } from "@/app/actions/admin-actions/appointment/get-appointments";
import { updateAppointmentStatus } from "@/app/actions/admin-actions/appointment/update-appointment-status";

import type { Locale } from "@/i18n/config";

interface Translations {
  header: {
    eyebrow: string;
    title: string;
    description: string;
    createAppointment: string;
  };

  stats: {
    total: string;
    pending: string;
    confirmed: string;
    cancelled: string;
  };

  toolbar: {
    searchPlaceholder: string;
    filterStatus: string;
    allStatuses: string;
    pending: string;
    confirmed: string;
    cancelled: string;
    completed: string;
  };

  table: {
    loading: string;
    showing: string;
    of: string;
    appointments: string;
    patient: string;
    dateTime: string;
    appointment: string;
    noAppointmentsFound: string;
    changeSearchOrFilters: string;
  };

  actions: {
    confirm: string;
    reschedule: string;
    cancelAppointment: string;
  };

  messages: {
    failedToLoad: string;
    appointmentConfirmed: string;
    appointmentCancelled: string;
    confirmationDescription: string;
    cancellationDescription: string;
    failedToUpdateStatus: string;
    appointmentRescheduled: string;
    rescheduleDescription: string;
  };
}

interface Props {
  locale: Locale;
  translations: Translations;
}

const AppointmentsPage = ({ locale, translations }: Props) => {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [rescheduleAppointment, setRescheduleAppointment] =
    useState<AdminAppointment | null>(null);

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        setIsLoading(true);

        const result = await getAppointments();

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        setAppointments(result.data);
      } catch (error) {
        console.error("LOAD_APPOINTMENTS_ERROR:", error);
        toast.error(translations.messages.failedToLoad);
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, [translations.messages.failedToLoad]);

  const filteredAppointments = useMemo(() => {
    const searchValue = search.trim().toLowerCase();

    return appointments.filter((appointment) => {
      const matchesName = appointment.patientName
        .toLowerCase()
        .includes(searchValue);

      const matchesEmail =
        appointment.email?.toLowerCase().includes(searchValue) ?? false;

      const matchesPhone =
        appointment.phone?.toLowerCase().includes(searchValue) ?? false;

      const matchesId = appointment.id.toLowerCase().includes(searchValue);

      const matchesSearch =
        !searchValue ||
        matchesName ||
        matchesEmail ||
        matchesPhone ||
        matchesId;

      const matchesStatus = status === "ALL" || appointment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, status]);

  const handleStatusUpdate = async (
    appointment: AdminAppointment,
    newStatus: "CONFIRMED" | "CANCELLED",
  ) => {
    try {
      const result = await updateAppointmentStatus(appointment.id, newStatus);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      setAppointments((current) =>
        current.map((item) =>
          item.id === appointment.id
            ? {
                ...item,
                status: newStatus,
              }
            : item,
        ),
      );

      const isConfirmed = newStatus === "CONFIRMED";

      toast.success(
        isConfirmed
          ? translations.messages.appointmentConfirmed
          : translations.messages.appointmentCancelled,
        {
          description: (isConfirmed
            ? translations.messages.confirmationDescription
            : translations.messages.cancellationDescription
          ).replace("{{patientName}}", appointment.patientName),
        },
      );
    } catch (error) {
      console.error("UPDATE_APPOINTMENT_STATUS_ERROR:", error);

      toast.error(translations.messages.failedToUpdateStatus);
    }
  };

  const confirmAppointment = (appointment: AdminAppointment) => {
    handleStatusUpdate(appointment, "CONFIRMED");
  };

  const cancelAppointment = (appointment: AdminAppointment) => {
    handleStatusUpdate(appointment, "CANCELLED");
  };

  const handleReschedule = (
    appointment: AdminAppointment,
    date: Date,
    time: string,
  ) => {
    const formattedDate = date.toLocaleDateString(
      locale === "ar" ? "ar-EG" : "en-GB",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      },
    );

    setAppointments((current) =>
      current.map((item) =>
        item.id === appointment.id
          ? {
              ...item,
              date: formattedDate,
              time,
            }
          : item,
      ),
    );

    toast.success(translations.messages.appointmentRescheduled, {
      description: translations.messages.rescheduleDescription.replace(
        "{{patientName}}",
        appointment.patientName,
      ),
    });
  };

  return (
    <div className="space-y-6">
      <AppointmentsHeader translations={translations.header} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            {translations.stats.total}
          </p>
          <p className="mt-2 text-2xl font-bold">{appointments.length}</p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            {translations.stats.pending}
          </p>
          <p className="mt-2 text-2xl font-bold text-amber-600">
            {appointments.filter((item) => item.status === "PENDING").length}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            {translations.stats.confirmed}
          </p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {appointments.filter((item) => item.status === "CONFIRMED").length}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">
            {translations.stats.cancelled}
          </p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {appointments.filter((item) => item.status === "CANCELLED").length}
          </p>
        </div>
      </div>

      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <AppointmentsToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
          translations={translations.toolbar}
        />

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              {translations.table.loading}
            </p>
          </div>
        ) : (
          <AppointmentsTable
            appointments={filteredAppointments}
            onConfirm={confirmAppointment}
            onReschedule={setRescheduleAppointment}
            onCancel={cancelAppointment}
            translations={{
              ...translations.table,
              ...translations.actions,
            }}
          />
        )}

        <div className="border-t bg-muted/20 px-4 py-3">
          <p className="text-xs text-muted-foreground">
            {translations.table.showing} {filteredAppointments.length}{" "}
            {translations.table.of} {appointments.length}{" "}
            {translations.table.appointments}
          </p>
        </div>
      </section>

      {/* <RescheduleDialog
        appointment={rescheduleAppointment}
        open={!!rescheduleAppointment}
        onOpenChange={(open) => {
          if (!open) {
            setRescheduleAppointment(null);
          }
        }}
        onSave={(date, time) => {
          if (rescheduleAppointment) {
            handleReschedule(rescheduleAppointment, date, time);
          }
        }}
      /> */}
    </div>
  );
};

export default AppointmentsPage;
