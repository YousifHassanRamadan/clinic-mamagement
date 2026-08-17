"use client";

import { useEffect, useState, useTransition } from "react";
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
};

const defaultValues: SessionFormInput = {
  patientId: "",
  appointmentId: "",
  date: "",
  time: "",
  duration: 50,
  sessionType: "INDIVIDUAL",
  diagnosis: "",
  mood: undefined,
  publicNotes: "",
  privateClinicalNotes: "",
  shareNotes: true,
  sendSummaryEmail: false,
  fee: 0,
};

const SessionForm = ({ mode, sessionId }: SessionFormProps) => {
  const router = useRouter();

  const [loading, setLoading] = useState(mode === "edit");
  const [isPending, startTransition] = useTransition();

  const form = useForm<SessionFormInput>({
    defaultValues,
  });

  const { reset, handleSubmit } = form;

  // =========================
  // LOAD SESSION FOR EDIT
  // =========================

  useEffect(() => {
    if (mode !== "edit" || !sessionId) {
      setLoading(false);
      return;
    }

    const loadSession = async () => {
      const result = await getSessionById(sessionId);

      if (!result.success || !result.data) {
        toast.error(result.message ?? "Failed to load session");
        router.push("/dashboard/sessions");
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

        mood: session.mood ?? undefined,

        publicNotes: session.publicNotes ?? "",

        privateClinicalNotes: session.privateClinicalNotes ?? "",

        shareNotes: session.shareNotes,

        sendSummaryEmail: session.sendSummaryEmail,

        fee: Number(session.fee),
      });

      setLoading(false);
    };

    loadSession();
  }, [mode, sessionId, reset, router]);

  // =========================
  // CREATE / UPDATE
  // =========================

  const onSubmit = (values: SessionFormInput) => {
    startTransition(async () => {
      const result =
        mode === "new"
          ? await createSession(values)
          : await updateSession({
              ...values,
              sessionId: sessionId!,
            });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard/admin/sessions");
    });
  };
  // =========================
  // SAVE DRAFT
  // =========================

  const handleSaveDraft = () => {
    handleSubmit((values) => {
      startTransition(async () => {
        const result =
          mode === "new"
            ? await createSession(values)
            : await updateSession({
                ...values,
                sessionId: sessionId!,
              });

        if (!result.success) {
          toast.error(result.message);
          return;
        }

        if (result.data?.id) {
          await updateSessionStatus(result.data.id, SessionStatus.DRAFT);
        }

        toast.success("Session saved as draft");

        router.push("/dashboard/sessions");
        router.refresh();
      });
    })();
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
        {/* LEFT */}

        <div className="space-y-6">
          <SessionDetailsCard />

          <NotesCard />

          {/* <AttachmentsCard sessionId={sessionId} mode={mode} /> */}
        </div>

        {/* RIGHT */}

        <div>
          <div className="xl:sticky xl:top-24">
            <PublishingCard
              isPending={isPending}
              onSaveDraft={handleSaveDraft}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default SessionForm;
