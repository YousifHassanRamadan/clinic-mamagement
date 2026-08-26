// components/feature/dashboard/admin/sessions/SessionRow.tsx

"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { TableCell, TableRow } from "@/components/ui/table";

import SessionActions from "./SessionActions";
import SessionStatusBadge from "./SessionStatusBadge";
import MoodBadge from "./MoodBadge";

import type { SessionWithRelations } from "./types";

interface Translations {
  patient: string;
  status: string;
  date: string;
  duration: string;
  mood: string;
  sessionType: string;
  actions: string;
  loading: string;
  noSessions: string;
  minutes: string;
}

interface ActionTranslations {
  edit: string;
  delete: string;
  deleteSuccess: string;
  deleteFailed: string;
}

interface Props {
  session: SessionWithRelations;
  mobile?: boolean;
  onDeleted?: () => void;
  translations: Translations;
  actionTranslations: ActionTranslations;
}

const getInitials = (firstName: string, lastName: string) => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
};

const formatTime = (date: Date) => {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const formatSessionType = (type: string) => {
  return type
    .replaceAll("_", " ")
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
};

const SessionRow = ({
  session,
  mobile = false,
  onDeleted,
  translations,
  actionTranslations,
}: Props) => {
  const patientName = `${session.patient.firstName} ${session.patient.lastName}`;

  const patientAvatar = getInitials(
    session.patient.firstName,
    session.patient.lastName,
  );

  const date = formatDate(session.sessionDate);
  const time = formatTime(session.sessionDate);
  const type = formatSessionType(session.sessionType);

  if (mobile) {
    return (
      <Card className="rounded-xl">
        <CardContent className="space-y-4 p-5">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>{patientAvatar}</AvatarFallback>
            </Avatar>

            <div>
              <h3 className="font-medium">{patientName}</h3>

              <p className="text-sm text-muted-foreground">
                {session.patient.phone}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">{translations.status}</p>

              <SessionStatusBadge status={session.status} />
            </div>

            <div>
              <p className="text-muted-foreground">{translations.mood}</p>

              {session.mood ? (
                <MoodBadge mood={session.mood} />
              ) : (
                <p className="text-muted-foreground">—</p>
              )}
            </div>

            <div>
              <p className="text-muted-foreground">{translations.date}</p>

              <p>{date}</p>

              <p className="text-muted-foreground">{time}</p>
            </div>

            <div>
              <p className="text-muted-foreground">{translations.duration}</p>

              <p>
                {session.duration} {translations.minutes}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-muted-foreground">
                {translations.sessionType}
              </p>

              <p>{type}</p>
            </div>
          </div>

          <SessionActions
            sessionId={session.id}
            onDeleted={onDeleted}
            translations={actionTranslations}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <TableRow>
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>{patientAvatar}</AvatarFallback>
          </Avatar>

          <div>
            <p className="font-medium">{patientName}</p>

            <p className="text-sm text-muted-foreground">
              {session.patient.phone}
            </p>
          </div>
        </div>
      </TableCell>

      <TableCell>
        <SessionStatusBadge status={session.status} />
      </TableCell>

      <TableCell>
        <p>{date}</p>

        <p className="text-sm text-muted-foreground">{time}</p>
      </TableCell>

      <TableCell>
        {session.duration} {translations.minutes}
      </TableCell>

      <TableCell>
        {session.mood ? (
          <MoodBadge mood={session.mood} />
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </TableCell>

      <TableCell>{type}</TableCell>

      <TableCell>
        <SessionActions
          sessionId={session.id}
          onDeleted={onDeleted}
          translations={actionTranslations}
        />
      </TableCell>
    </TableRow>
  );
};

export default SessionRow;
