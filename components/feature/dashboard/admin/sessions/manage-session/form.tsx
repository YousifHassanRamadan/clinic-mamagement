// components/feature/dashboard/admin/sessions/manage-session/form.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import SessionDetailsCard from "./SessionDetailsCard";
import NotesCard from "./NotesCard";
import AttachmentsCard from "./AttachmentsCard";
import PublishingCard from "./PublishingCard";

import type { SessionFormInput } from "@/schemas/session.schema";

import { SessionStatus } from "@/app/generated/prisma/enums";
import { getSessionById } from "@/app/actions/admin-actions/session/get-session-by-id";
import { createSession } from "@/app/actions/admin-actions/session/create-session";
import { updateSession } from "@/app/actions/admin-actions/session/update-session";
import { updateSessionStatus } from "@/app/actions/admin-actions/session/update-session-status";

type SessionFormProps = {
  mode: "new" | "edit";
  sessionId?: string;

  translations: {
    publishing: string;
    saving: string;
    saveSession: string;
    cancel: string;

    sessionDetails: string;
    sessionDetailsDescription: string;
    patient: string;
    choosePatient: string;
    appointment: string;
    chooseAppointment: string;
    selectPatientFirst: string;
    noAppointment: string;
    walkIn: string;
    sessionType: string;
    selectType: string;
    date: string;
    time: string;
    duration: string;
    selectDuration: string;
    diagnosisEnglish: string;
    diagnosisArabic: string;

    mood: {
      title: string;
      veryGood: string;
      good: string;
      neutral: string;
      bad: string;
      veryBad: string;
    };

    attachments: {
      title: string;
      description: string;
      processing: string;
      dragDrop: string;
      fileTypes: string;
      browseFiles: string;
      download: string;
      delete: string;
      attachmentNotSaved: string;
      uploadSuccess: string;
      uploadError: string;
      deleteSuccess: string;
      deleteError: string;
      downloadError: string;
    };
  };
};

const defaultValues: SessionFormInput = {
  patientId: "",
  appointmentId: "",
  date: "",
  time: "",
  duration: 50,
  sessionType: "INDIVIDUAL",
  diagnosis: "",
  diagnosisAr: "",
  mood: undefined,
  publicNotes: "",
  publicNotesAr: "",
  privateClinicalNotes: "",
  privateClinicalNotesAr: "",
  shareNotes: true,
  sendSummaryEmail: false,
  fee: 0,
  attachments: [],
};

const SessionForm = ({ mode, sessionId, translations }: SessionFormProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(mode === "edit");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const mountedRef = useRef(true);

  const form = useForm<SessionFormInput>({
    defaultValues,
  });

  const { reset, handleSubmit } = form;

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const showError = (message: string) => {
    toast.error(message, {
      id: "session-form-error",
    });
  };

  useEffect(() => {
    if (mode !== "edit" || !sessionId) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    const loadSession = async () => {
      try {
        const result = await getSessionById(sessionId);

        if (cancelled || !mountedRef.current) return;

        if (!result.success || !result.data) {
          showError(result.message ?? "Failed to load session");
          router.replace("/dashboard/admin/sessions");
          return;
        }

        const session = result.data;
        const date = new Date(session.sessionDate);

        const formattedDate = date.toISOString().split("T")[0];
        const formattedTime = date.toTimeString().slice(0, 5);

        reset({
          patientId: session.patientId,
          appointmentId: session.appointmentId ?? "",
          date: formattedDate,
          time: formattedTime,
          duration: session.duration,
          sessionType: session.sessionType,
          diagnosis: session.diagnosis ?? "",
          diagnosisAr: session.diagnosisAr ?? "",
          mood: session.mood ?? undefined,
          publicNotes: session.publicNotes ?? "",
          publicNotesAr: session.publicNotesAr ?? "",
          privateClinicalNotes: session.privateClinicalNotes ?? "",
          privateClinicalNotesAr: session.privateClinicalNotesAr ?? "",
          shareNotes: session.shareNotes,
          sendSummaryEmail: session.sendSummaryEmail,
          fee: Number(session.fee),
          attachments: session.attachments.map((attachment) => ({
            id: attachment.id,
            name: attachment.name,
            url: attachment.url,
            size: attachment.size,
            type: attachment.type,
            publicId: attachment.publicId ?? undefined,
            resourceType:
              (attachment.resourceType as
                | "image"
                | "raw"
                | "video"
                | undefined) ?? undefined,
          })),
        });
      } catch (error) {
        if (cancelled || !mountedRef.current) return;

        console.error("LOAD_SESSION_ERROR:", error);

        showError("Failed to load session");
        router.replace("/dashboard/admin/sessions");
      } finally {
        if (!cancelled && mountedRef.current) {
          setLoading(false);
        }
      }
    };

    loadSession();

    return () => {
      cancelled = true;
    };
  }, [mode, sessionId, reset, router]);

  const onSubmit = async (values: SessionFormInput) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const result =
        mode === "new"
          ? await createSession(values)
          : await updateSession({
              ...values,
              sessionId: sessionId!,
            });

      if (!result.success) {
        showError(result.message ?? "Failed to save session");
        return;
      }

      toast.success(result.message ?? "Session saved successfully", {
        id: "session-form-success",
      });

      router.replace("/dashboard/admin/sessions");
    } catch (error) {
      console.error("SESSION_SUBMIT_ERROR:", error);

      showError("Failed to save session");
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  const handleSaveDraft = async () => {
    if (isSubmitting) return;

    const isValid = await form.trigger();

    if (!isValid) return;

    const values = form.getValues();

    setIsSubmitting(true);

    try {
      const result =
        mode === "new"
          ? await createSession(values)
          : await updateSession({
              ...values,
              sessionId: sessionId!,
            });

      if (!result.success) {
        showError(result.message ?? "Failed to save session");
        return;
      }

      if (result.data?.id) {
        const statusResult = await updateSessionStatus(
          result.data.id,
          SessionStatus.DRAFT,
        );

        if (!statusResult.success) {
          showError(statusResult.message ?? "Failed to save draft status");
          return;
        }
      }

      toast.success("Session saved as draft", {
        id: "session-form-success",
      });

      router.replace("/dashboard/admin/sessions");
    } catch (error) {
      console.error("SAVE_DRAFT_ERROR:", error);

      showError("Failed to save session");
    } finally {
      if (mountedRef.current) {
        setIsSubmitting(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        Loading session...
      </div>
    );
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid gap-6 xl:grid-cols-[1fr_320px]"
      >
        <div className="space-y-6">
          <SessionDetailsCard
            translations={{
              sessionDetails: translations.sessionDetails,
              sessionDetailsDescription: translations.sessionDetailsDescription,
              patient: translations.patient,
              choosePatient: translations.choosePatient,
              appointment: translations.appointment,
              chooseAppointment: translations.chooseAppointment,
              selectPatientFirst: translations.selectPatientFirst,
              noAppointment: translations.noAppointment,
              walkIn: translations.walkIn,
              sessionType: translations.sessionType,
              selectType: translations.selectType,
              date: translations.date,
              time: translations.time,
              duration: translations.duration,
              selectDuration: translations.selectDuration,
              diagnosisEnglish: translations.diagnosisEnglish,
              diagnosisArabic: translations.diagnosisArabic,
              mood: translations.mood,
            }}
          />

          <NotesCard />

          <AttachmentsCard translations={translations.attachments} />
        </div>

        <div>
          <div className="xl:sticky xl:top-24">
            <PublishingCard
              isPending={isSubmitting}
              onSaveDraft={handleSaveDraft}
              translations={{
                publishing: translations.publishing,
                saving: translations.saving,
                saveSession: translations.saveSession,
                cancel: translations.cancel,
              }}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SessionForm;
