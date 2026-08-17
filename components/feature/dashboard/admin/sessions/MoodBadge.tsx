"use client";

import { Badge } from "@/components/ui/badge";
import { Mood } from "./types";

interface Props {
  mood: Mood;
}

const moodStyles: Record<Mood, string> = {
  VERY_BAD: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",

  BAD: "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100",

  NEUTRAL: "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-100",

  GOOD: "bg-sky-100 text-sky-700 border-sky-200 hover:bg-sky-100",

  VERY_GOOD:
    "bg-emerald-100 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
};

const MoodBadge = ({ mood }: Props) => {
  return (
    <Badge variant="outline" className={`${moodStyles[mood]} p-1 rounded-xl`}>
      {mood}
    </Badge>
  );
};

export default MoodBadge;
