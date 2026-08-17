"use client";

import { useEffect, useState } from "react";
import { CalendarDays, Clock3, User2, Stethoscope } from "lucide-react";

import { useFormContext } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { durations } from "@/constants/dashboard/admin/admin";

import MoodSelector from "./MoodSelector";

import type { SessionFormInput } from "@/schemas/session.schema";

import { getSessionAppointments } from "@/app/actions/admin-actions/session/get-session-appointments";
import { getSessionPatients } from "@/app/actions/admin-actions/session/get-session-patients";

import { SessionType } from "@/app/generated/prisma/enums";

const sessionTypes: { id: SessionType; name: string }[] = [
  {
    id: SessionType.INITIAL,
    name: "Initial Session",
  },
  {
    id: SessionType.FOLLOW_UP,
    name: "Follow-up",
  },
  {
    id: SessionType.INDIVIDUAL,
    name: "Individual",
  },
  {
    id: SessionType.EMERGENCY,
    name: "Emergency",
  },
  {
    id: SessionType.OTHER,
    name: "Other",
  },
];

const SessionDetailsCard = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SessionFormInput>();

  const patientId = watch("patientId");
  const sessionType = watch("sessionType");
  const duration = watch("duration");
  const mood = watch("mood");
  const appointmentId = watch("appointmentId");

  const [patients, setPatients] = useState<
    {
      id: string;
      firstName: string;
      lastName: string;
      phone: string;
    }[]
  >([]);

  const [appointments, setAppointments] = useState<
    {
      id: string;
      userId: string;
      date: Date;
      status: string;
    }[]
  >([]);

  // LOAD PATIENTS
  useEffect(() => {
    const loadPatients = async () => {
      const result = await getSessionPatients();

      if (result.success) {
        setPatients(result.data);
      }
    };

    loadPatients();
  }, []);

  // LOAD APPOINTMENTS
  useEffect(() => {
    if (!patientId) {
      setAppointments([]);
      setValue("appointmentId", "");
      return;
    }

    const loadAppointments = async () => {
      const result = await getSessionAppointments(patientId);

      if (result.success) {
        setAppointments(result.data);
      }
    };

    loadAppointments();
  }, [patientId, setValue]);

  return (
    <Card className="rounded-2xl p-6 shadow-sm">
      <div className="mb-8">
        <h2 className="text-xl font-semibold">Session Details</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Basic information about this therapy session.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* PATIENT */}
        <div className="space-y-2">
          <Label>Patient</Label>

          <Select
            value={patientId}
            onValueChange={(value) =>
              setValue("patientId", value, {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="h-11 rounded-xl p-3">
              <User2 className="mr-2 h-4 w-4 text-muted-foreground" />

              <SelectValue placeholder="Choose patient" />
            </SelectTrigger>

            <SelectContent>
              {patients.map((patient) => (
                <SelectItem key={patient.id} value={patient.id}>
                  {patient.firstName} {patient.lastName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {errors.patientId && (
            <p className="text-sm text-destructive">
              {errors.patientId.message}
            </p>
          )}
        </div>

        {/* APPOINTMENT */}
        <div className="space-y-2">
          <Label>Appointment (Optional)</Label>

          <Select
            value={appointmentId || "none"}
            onValueChange={(value) =>
              setValue("appointmentId", value === "none" ? "" : value, {
                shouldValidate: true,
              })
            }
            disabled={!patientId}
          >
            <SelectTrigger className="h-11 rounded-xl p-3">
              <SelectValue
                placeholder={
                  patientId ? "Choose appointment" : "Select patient first"
                }
              />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="none">No Appointment — Walk-in</SelectItem>

              {appointments.map((appointment) => (
                <SelectItem key={appointment.id} value={appointment.id}>
                  {new Date(appointment.date).toLocaleString()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* SESSION TYPE */}
        <div className="space-y-2">
          <Label>Session Type</Label>

          <Select
            value={sessionType}
            onValueChange={(value) =>
              setValue(
                "sessionType",
                value as SessionFormInput["sessionType"],
                {
                  shouldValidate: true,
                },
              )
            }
          >
            <SelectTrigger className="h-11 rounded-xl p-3">
              <Stethoscope className="mr-2 h-4 w-4 text-muted-foreground" />

              <SelectValue placeholder="Select type" />
            </SelectTrigger>

            <SelectContent>
              {sessionTypes.map((type) => (
                <SelectItem key={type.id} value={type.id}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* DATE */}
        <div className="space-y-2">
          <Label>Date</Label>

          <div className="relative">
            <CalendarDays className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="date"
              className="h-11 rounded-xl pl-10 pr-5"
              {...register("date")}
            />
          </div>

          {errors.date && (
            <p className="text-sm text-destructive">{errors.date.message}</p>
          )}
        </div>

        {/* TIME */}
        <div className="space-y-2">
          <Label>Time</Label>

          <div className="relative">
            <Clock3 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              type="time"
              className="h-11 rounded-xl pl-10 pr-5"
              {...register("time")}
            />
          </div>
        </div>

        {/* DURATION */}
        <div className="space-y-2">
          <Label>Duration</Label>

          <Select
            value={String(duration)}
            onValueChange={(value) =>
              setValue("duration", Number(value), {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger className="h-11 rounded-xl p-3">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>

            <SelectContent>
              {durations.map((duration) => (
                <SelectItem key={duration.id} value={String(duration.id)}>
                  {duration.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* DIAGNOSIS */}
        <div className="space-y-2">
          <Label>Diagnosis</Label>

          <Input
            placeholder="Generalized Anxiety Disorder..."
            className="h-11 rounded-xl p-3"
            {...register("diagnosis")}
          />
        </div>
      </div>

      {/* MOOD */}
      <div className="mt-8">
        <Label className="mb-3 block">Patient Mood</Label>

        <MoodSelector
          value={mood}
          onChange={(value) =>
            setValue("mood", value, {
              shouldValidate: true,
            })
          }
        />
      </div>
    </Card>
  );
};

export default SessionDetailsCard;
