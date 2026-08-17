"use client";

import { Clock3 } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SessionDuration } from "./types";

interface TimeSlotSettingsProps {
  duration: SessionDuration;
  onDurationChange: (value: SessionDuration) => void;
}

const TimeSlotSettings = ({
  duration,
  onDurationChange,
}: TimeSlotSettingsProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Clock3 className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">4. Session duration</h2>

          <p className="mt-1 text-xs text-muted-foreground">
            Choose how long each appointment slot should be.
          </p>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">Duration</Label>

        <Select
          value={String(duration)}
          onValueChange={(value) =>
            onDurationChange(Number(value) as SessionDuration)
          }
        >
          <SelectTrigger className="h-10 rounded-xl">
            <SelectValue />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="30">30 minutes</SelectItem>
            <SelectItem value="45">45 minutes</SelectItem>
            <SelectItem value="60">60 minutes</SelectItem>
            <SelectItem value="90">90 minutes</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeSlotSettings;
