// components/feature/dashboard/admin/sessions/manage-session/NewSessionPage.tsx

"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import SessionForm from "./form";

export interface NewSessionPageProps {
  translations: {
    label: string;
    title: string;
    description: string;
    backToSessions: string;

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
}

const NewSessionPage = ({ translations }: NewSessionPageProps) => {
  const router = useRouter();

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            {translations.label}
          </p>

          <h1 className="mt-2 text-3xl font-bold">{translations.title}</h1>

          <p className="mt-2 text-muted-foreground">
            {translations.description}
          </p>
        </div>

        <Button
          variant="outline"
          className="self-start rounded-xl lg:self-auto"
          onClick={() => router.push("/dashboard/admin/sessions")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {translations.backToSessions}
        </Button>
      </div>

      <SessionForm
        mode="new"
        translations={{
          publishing: translations.publishing,
          saving: translations.saving,
          saveSession: translations.saveSession,
          cancel: translations.cancel,

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

          attachments: translations.attachments,
        }}
      />
    </div>
  );
};

export default NewSessionPage;
