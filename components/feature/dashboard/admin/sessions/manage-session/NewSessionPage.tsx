"use client";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

import SessionForm from "./form";

const NewSessionPage = () => {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-sm font-medium uppercase tracking-widest text-primary">
            Sessions
          </p>

          <h1 className="mt-2 text-3xl font-bold">Create Session</h1>

          <p className="mt-2 text-muted-foreground">
            Capture the appointment, notes and attachments. Drafts stay private
            until you publish them.
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
      <SessionForm mode="new" />
    </div>
  );
};

export default NewSessionPage;
