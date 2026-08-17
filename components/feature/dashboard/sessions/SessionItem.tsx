import { CalendarDays, CheckCircle2, Clock3 } from "lucide-react";

import { Card } from "@/components/ui/card";

interface Props {
  title: string;
  date: string;
  mood: string;
  status: string;
}

const SessionItem = ({ title, date, mood, status }: Props) => {
  const isCompleted = status === "COMPLETED";

  return (
    <Card className="rounded-2xl p-5 transition-all hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold">{title}</h3>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            {date}
          </div>

          <p className="mt-2 text-sm">
            Mood:
            <span className="ml-1 font-medium text-primary">{mood}</span>
          </p>

          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <Clock3 className="h-4 w-4" />

            {status
              .replaceAll("_", " ")
              .toLowerCase()
              .replace(/\b\w/g, (char) => char.toUpperCase())}
          </div>
        </div>

        {isCompleted ? (
          <CheckCircle2 className="text-green-500" />
        ) : (
          <Clock3 className="text-muted-foreground" />
        )}
      </div>
    </Card>
  );
};

export default SessionItem;
