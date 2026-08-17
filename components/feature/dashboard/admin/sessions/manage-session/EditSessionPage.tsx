"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import SessionForm from "./form";

interface Props {
  sessionId: string;
}

const EditSessionPage = ({ sessionId }: Props) => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Sessions
          </p>

          <h1 className="mt-2 text-3xl font-bold">Edit Session</h1>

          <p className="mt-2 text-muted-foreground">
            Update the appointment details, notes and attachments. Changes will
            be saved to this session.
          </p>
        </div>

        <Button
          variant="outline"
          className="rounded-xl self-start lg:self-auto"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Sessions
        </Button>
      </div>

      {/* Content */}
      <SessionForm mode="edit" sessionId={sessionId} />
    </div>
  );
};

export default EditSessionPage;
