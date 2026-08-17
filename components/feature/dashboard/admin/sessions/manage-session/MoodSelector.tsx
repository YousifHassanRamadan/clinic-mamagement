"use client";

import { cn } from "@/lib/utils";
import { Mood } from "@/app/generated/prisma/enums";

type MoodSelectorProps = {
  value?: Mood;
  onChange: (value: Mood) => void;
};

const moods: {
  value: Mood;
  label: string;
  emoji: string;
}[] = [
  {
    value: "VERY_GOOD",
    label: "Very Good",
    emoji: "😁",
  },
  {
    value: "GOOD",
    label: "Good",
    emoji: "🙂",
  },
  {
    value: "NEUTRAL",
    label: "Neutral",
    emoji: "😐",
  },
  {
    value: "BAD",
    label: "Bad",
    emoji: "😔",
  },
  {
    value: "VERY_BAD",
    label: "Very Bad",
    emoji: "😣",
  },
];

const MoodSelector = ({ value, onChange }: MoodSelectorProps) => {
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
