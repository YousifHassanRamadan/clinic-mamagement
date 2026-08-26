// WorkingHoursCard.tsx

"use client";

import { Clock3, Info } from "lucide-react";

import { Input } from "@/components/ui/input";

interface WorkingHoursCardProps {
  startTime: string;
  endTime: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
  locale: "en" | "ar";
  translations: {
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    timeSlotsInfo: string;
  };
}

const WorkingHoursCard = ({
  startTime,
  endTime,
  onStartChange,
  onEndChange,
  translations: t,
  locale,
}: WorkingHoursCardProps) => {
  const timeSlotsInfo = t.timeSlotsInfo
    .replace("{{startTime}}", startTime || "--:--")
    .replace("{{endTime}}", endTime || "--:--");

  return (
    <div className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="mb-5">
        <h2 className="text-sm font-semibold">{t.title}</h2>

        <p className="mt-1 text-xs text-muted-foreground">{t.description}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <label className="text-xs font-medium">{t.startTime}</label>

          <div className="relative">
            <Clock3
              className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${
                locale === "ar" ? "right-3" : "left-3"
              }`}
            />

            <Input
              type="time"
              value={startTime}
              onChange={(event) => onStartChange(event.target.value)}
              className={`h-11 rounded-xl ${
                locale === "ar" ? "pr-12 pl-4" : "pl-12 pr-4"
              }`}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium">{t.endTime}</label>

          <div className="relative">
            <Clock3
              className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${
                locale === "ar" ? "right-3" : "left-3"
              }`}
            />

            <Input
              type="time"
              value={endTime}
              onChange={(event) => onEndChange(event.target.value)}
              className={`h-11 rounded-xl ${
                locale === "ar" ? "pr-12 pl-4" : "pl-12 pr-4"
              }`}
            />
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-3 rounded-xl border border-primary/10 bg-primary/5 p-3">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-primary" />

        <p className="text-xs leading-5 text-muted-foreground">
          {timeSlotsInfo}
        </p>
      </div>
    </div>
  );
};

export default WorkingHoursCard;
