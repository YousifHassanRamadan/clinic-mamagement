// components/feature/dashboard/appointments/SessionType.tsx

"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { sessionIcons, sessionOptions } from "@/constants/dashboard/dashboard";

interface Props {
  sessionType: "ONSITE" | "ONLINE";
  setSessionType: (value: "ONSITE" | "ONLINE") => void;
  notes: string;
  setNotes: (value: string) => void;
  translations: {
    title: string;
    notesPlaceholder: string;
    options: {
      onsite: {
        title: string;
        description: string;
      };
      online: {
        title: string;
        description: string;
      };
    };
  };
}

const SessionType = ({
  sessionType,
  setSessionType,
  notes,
  setNotes,
  translations,
}: Props) => {
  const optionTranslations = {
    ONSITE: translations.options.onsite,
    ONLINE: translations.options.online,
  } as const;

  return (
    <Card className="block rounded-3xl p-6">
      <h3 className="mb-6 text-xl font-semibold">{translations.title}</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {sessionOptions.map((option) => {
          const Icon = sessionIcons[option.id];
          const active = sessionType === option.id;
          const translated = optionTranslations[option.id];

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSessionType(option.id)}
              dir="auto"
              className={`rounded-2xl border p-5 transition ${
                active
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="shrink-0 rounded-full bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div className="min-w-0 flex-1 text-start">
                  <h4 className="font-semibold">{translated.title}</h4>

                  <p className="text-sm text-muted-foreground">
                    {translated.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/*
      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder={translations.notesPlaceholder}
        dir="auto"
        className="mt-6 min-h-36 rounded-2xl p-8 text-start"
      />
      */}
    </Card>
  );
};

export default SessionType;
