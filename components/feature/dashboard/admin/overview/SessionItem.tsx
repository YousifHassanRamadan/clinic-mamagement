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
}

const moodStyles: Record<string, string> = {
  VERY_BAD: "bg-red-100 text-red-700 border-red-200",
  BAD: "bg-orange-100 text-orange-700 border-orange-200",
  NEUTRAL: "bg-gray-100 text-gray-700 border-gray-200",
  GOOD: "bg-sky-100 text-sky-700 border-sky-200",
  VERY_GOOD: "bg-emerald-100 text-emerald-700 border-emerald-200",
};

const moodLabels: Record<string, string> = {
  VERY_BAD: "Very Bad",
  BAD: "Bad",
  NEUTRAL: "Neutral",
  GOOD: "Good",
  VERY_GOOD: "Very Good",
};

const formatLabel = (value: string) => {
  return value
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const SessionItem = ({ session }: Props) => {
  return (
    <div className="flex flex-col gap-4 rounded-xl border p-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Patient */}
      <div>
        <h4 className="font-medium">{session.patient.name}</h4>

        <p className="text-sm text-muted-foreground">
          {session.diagnosis ?? "No diagnosis"}
        </p>

        <p className="mt-1 text-xs text-muted-foreground">
          {formatLabel(session.type)}
          {" • "}
          {session.duration} min
          {" • "}
          {session.date.toLocaleDateString()}
        </p>
      </div>

      {/* Status */}
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
