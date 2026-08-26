// components/feature/dashboard/admin/sessions/manage-session/MoodSelector.tsx

"use client";

import { cn } from "@/lib/utils";
import { Mood } from "@/app/generated/prisma/enums";

type MoodSelectorProps = {
  value?: Mood;
  onChange: (value: Mood) => void;
  translations: {
    veryGood: string;
    good: string;
    neutral: string;
    bad: string;
    veryBad: string;
  };
};

const MoodSelector = ({ value, onChange, translations }: MoodSelectorProps) => {
  const moods: {
    value: Mood;
    label: string;
    emoji: string;
  }[] = [
    {
      value: "VERY_GOOD",
      label: translations.veryGood,
      emoji: "😁",
    },
    {
      value: "GOOD",
      label: translations.good,
      emoji: "🙂",
    },
    {
      value: "NEUTRAL",
      label: translations.neutral,
      emoji: "😐",
    },
    {
      value: "BAD",
      label: translations.bad,
      emoji: "😔",
    },
    {
      value: "VERY_BAD",
      label: translations.veryBad,
      emoji: "😣",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {moods.map((mood) => {
        const selected = value === mood.value;

        return (
          <button
            key={mood.value}
            type="button"
            onClick={() => onChange(mood.value)}
            className={cn(
              "rounded-xl border p-4 transition-all",
              "hover:border-primary hover:bg-primary/5",
              selected && "border-primary bg-primary/10 ring-1 ring-primary",
            )}
          >
            <div className="text-3xl">{mood.emoji}</div>

            <p className="mt-2 text-sm font-medium">{mood.label}</p>
          </button>
        );
      })}
    </div>
  );
};

export default MoodSelector;
