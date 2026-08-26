// SessionItem.tsx

import { Badge } from "@/components/ui/badge";

interface Session {
  id: string;
  date: Date;
  duration: number;
  type: string;
  mood: string | null;
  diagnosis: string | null;
  status: string;
  fee: number;
  patient: {
    id: string;
    name: string;
    initials: string;
  };
}

interface Props {
  session: Session;

  translations: {
    noDiagnosis: string;
    minutes: string;
    veryBad: string;
    bad: string;
    neutral: string;
    good: string;
    veryGood: string;
  };
}

const moodStyles: Record<string, string> = {
  VERY_BAD: "bg-red-100 text-red-700 border-red-200",
  BAD: "bg-orange-100 text-orange-700 border-orange-200",
  NEUTRAL: "bg-gray-100 text-gray-700 border-gray-200",
  GOOD: "bg-sky-100 text-sky-700 border-sky-200",
  VERY_GOOD: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const formatLabel = (value: string) => {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const SessionItem = ({ session, translations }: Props) => {
  const moodLabels: Record<string, string> = {
    VERY_BAD: translations.veryBad,
    BAD: translations.bad,
    NEUTRAL: translations.neutral,
    GOOD: translations.good,
    VERY_GOOD: translations.veryGood,
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Patient */}
      {/* المريض */}
      <div>
        <h4 className="font-medium">{session.patient.name}</h4>

        <p className="text-sm text-muted-foreground">
          {session.diagnosis ?? translations.noDiagnosis}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatLabel(session.type)}
          {" • "}
          {session.duration} {translations.minutes}
          {" • "}
          {session.date.toLocaleDateString()}
        </p>
      </div>

      {/* Status */}
      {/* الحالة */}
      <div className="flex flex-wrap gap-2">
        {session.mood && (
          <Badge
            variant="outline"
            className={`${moodStyles[session.mood]} rounded-lg p-1`}
          >
            {moodLabels[session.mood] ?? session.mood}
          </Badge>
        )}

        <Badge variant="outline">{formatLabel(session.status)}</Badge>
      </div>
    </div>
  );
};

export default SessionItem;
