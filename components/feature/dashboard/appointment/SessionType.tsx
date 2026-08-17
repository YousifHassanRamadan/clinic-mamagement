"use client";

import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { sessionIcons, sessionOptions } from "@/constants/dashboard/dashboard";

interface Props {
  sessionType: "ONSITE" | "ONLINE";
  setSessionType: (value: "ONSITE" | "ONLINE") => void;
  notes: string;
  setNotes: (value: string) => void;
}

const SessionType = ({
  sessionType,
  setSessionType,
  notes,
  setNotes,
}: Props) => {
  return (
    <Card className="block rounded-3xl p-6">
      <h3 className="mb-6 text-xl font-semibold">3. Session type & Notes</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {sessionOptions.map((option) => {
          const Icon = sessionIcons[option.id];

          const active = sessionType === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setSessionType(option.id)}
              className={`rounded-2xl border p-5 text-left transition ${
                active
                  ? "border-primary bg-primary/5"
                  : "hover:border-primary/40"
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="rounded-full bg-primary/10 p-3">
                  <Icon className="h-5 w-5 text-primary" />
                </div>

                <div>
                  <h4 className="font-semibold">{option.title}</h4>

                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <Textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        placeholder="Anything you'd like the doctor to know..."
        className="mt-6 min-h-36 rounded-2xl p-8"
      />
    </Card>
  );
};

export default SessionType;
