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

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState<AdminAppointment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("ALL");

  const [rescheduleAppointment, setRescheduleAppointment] =
    useState<AdminAppointment | null>(null);

  // =========================
  // Get appointments
  // =========================

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
        toast.error("Failed to load appointments");
      } finally {
        setIsLoading(false);
      }
    };

    loadAppointments();
  }, []);

  // =========================
  // Filter
  // =========================

  const filteredAppointments = useMemo(() => {
    return appointments.filter((appointment) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        appointment.patientName.toLowerCase().includes(searchValue) ||
        appointment.patientId.toLowerCase().includes(searchValue) ||
        appointment.id.toLowerCase().includes(searchValue);

      const matchesStatus = status === "ALL" || appointment.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [appointments, search, status]);

  // =========================
  // Update Status
  // =========================

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

      toast.success(
        newStatus === "CONFIRMED"
          ? "Appointment confirmed"
          : "Appointment cancelled",
        {
          description:
            newStatus === "CONFIRMED"
              ? `${appointment.patientName}'s appointment has been confirmed.`
              : `${appointment.patientName}'s appointment has been cancelled.`,
        },
      );
    } catch (error) {
      console.error("UPDATE_APPOINTMENT_STATUS_ERROR:", error);

      toast.error("Failed to update appointment status");
    }
  };

  // =========================
  // Confirm
  // =========================

  const confirmAppointment = (appointment: AdminAppointment) => {
    handleStatusUpdate(appointment, "CONFIRMED");
  };

  // =========================
  // Cancel
  // =========================

  const cancelAppointment = (appointment: AdminAppointment) => {
    handleStatusUpdate(appointment, "CANCELLED");
  };

  // =========================
  // Reschedule
  // =========================

  const handleReschedule = (
    appointment: AdminAppointment,
    date: Date,
    time: string,
  ) => {
    const formattedDate = date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

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

    toast.success("Appointment rescheduled", {
      description: `${appointment.patientName}'s appointment has been moved.`,
    });
  };

  // =========================
  // Render
  // =========================

  console.log("appointments", appointments);

  return (
    <div className="space-y-6">
      <AppointmentsHeader />

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="mt-2 text-2xl font-bold">{appointments.length}</p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Pending</p>
          <p className="mt-2 text-2xl font-bold text-amber-600">
            {appointments.filter((item) => item.status === "PENDING").length}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Confirmed</p>
          <p className="mt-2 text-2xl font-bold text-emerald-600">
            {appointments.filter((item) => item.status === "CONFIRMED").length}
          </p>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-sm">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="mt-2 text-2xl font-bold text-red-600">
            {appointments.filter((item) => item.status === "CANCELLED").length}
          </p>
        </div>
      </div>

      {/* Main table */}
      <section className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <AppointmentsToolbar
          search={search}
          onSearchChange={setSearch}
          status={status}
          onStatusChange={setStatus}
        />

        {isLoading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <p className="text-sm text-muted-foreground">
              Loading appointments...
            </p>
          </div>
        ) : (
          <AppointmentsTable
            appointments={filteredAppointments}
            onConfirm={confirmAppointment}
            onReschedule={setRescheduleAppointment}
            onCancel={cancelAppointment}
          />
        )}

        <div className="border-t bg-muted/20 px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Showing {filteredAppointments.length} of {appointments.length}{" "}
            appointments
          </p>
        </div>
      </section>

      {/* Reschedule */}
      <RescheduleDialog
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
      />
    </div>
  );
};

export default AppointmentsPage;
