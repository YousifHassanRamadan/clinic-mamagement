// TimeSlotSettings.tsx

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
  translations: {
    title: string;
    description: string;
    duration: string;
    minutes: string;
  };
}

const TimeSlotSettings = ({
  duration,
  onDurationChange,
  translations: t,
}: TimeSlotSettingsProps) => {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Clock3 className="h-4 w-4" />
        </div>

        <div>
          <h2 className="text-sm font-semibold">{t.title}</h2>

          <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
        </div>
      </div>

      <div className="space-y-2">
        <Label className="text-xs">{t.duration}</Label>

        <Select
          value={String(duration)}
          onValueChange={(value) =>
            onDurationChange(Number(value) as SessionDuration)
          }
        >
          <SelectTrigger className="h-11 w-full rounded-xl border-input bg-background px-4 shadow-sm transition-all duration-200 hover:border-primary/40 hover:bg-muted/30 focus:ring-2 focus:ring-primary/20">
            <div className="flex min-w-0 items-center gap-2">
              <Clock3 className="h-4 w-4 shrink-0 text-muted-foreground" />

              <SelectValue />
            </div>
          </SelectTrigger>

          <SelectContent
            position="popper"
            sideOffset={6}
            className="min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-xl border bg-popover p-1.5 shadow-lg"
          >
            <SelectItem
              value="30"
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:bg-primary/10 focus:text-primary"
            >
              30 {t.minutes}
            </SelectItem>

            <SelectItem
              value="45"
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:bg-primary/10 focus:text-primary"
            >
              45 {t.minutes}
            </SelectItem>

            <SelectItem
              value="60"
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:bg-primary/10 focus:text-primary"
            >
              60 {t.minutes}
            </SelectItem>

            <SelectItem
              value="90"
              className="cursor-pointer rounded-lg px-3 py-2.5 text-sm font-medium transition-colors focus:bg-primary/10 focus:text-primary"
            >
              90 {t.minutes}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TimeSlotSettings;
