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
      <Card className="w-full rounded-xl">
        <CardContent className="space-y-4 p-5">
          {/* Patient */}
          <div className="flex min-w-0 items-center gap-3">
            <Avatar className="shrink-0">
              <AvatarFallback>{patientAvatar}</AvatarFallback>
            </Avatar>

            <div className="min-w-0 flex-1">
              <h3 className="truncate text-sm font-medium" title={patientName}>
                {patientName}
              </h3>

              <p className="truncate text-sm text-muted-foreground">
                {session.patient.phone}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            {/* Status */}
            <div className="min-w-0">
              <p className="mb-1 text-sm text-muted-foreground">
                {translations.status}
              </p>

              <div className="max-w-full overflow-hidden">
                <SessionStatusBadge status={session.status} />
              </div>
            </div>

            {/* Mood */}
            <div className="min-w-0">
              <p className="mb-1 text-sm text-muted-foreground">
                {translations.mood}
              </p>

              {session.mood ? (
                <div className="max-w-full overflow-hidden">
                  <MoodBadge mood={session.mood} />
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">—</p>
              )}
            </div>

            {/* Date */}
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                {translations.date}
              </p>

              <p className="truncate text-sm" title={date}>
                {date}
              </p>

              <p className="truncate text-sm text-muted-foreground">{time}</p>
            </div>

            {/* Duration */}
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">
                {translations.duration}
              </p>

              <p className="truncate text-sm">
                {session.duration} {translations.minutes}
              </p>
            </div>

            {/* Session Type */}
            <div className="col-span-2 min-w-0">
              <p className="text-sm text-muted-foreground">
                {translations.sessionType}
              </p>

              <p className="break-words text-sm" title={type}>
                {type}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full">
            <SessionActions
              sessionId={session.id}
              onDeleted={onDeleted}
              translations={actionTranslations}
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <TableRow className="text-sm">
      {/* Patient */}
      <TableCell className="min-w-0 px-4">
        <div className="flex min-w-0 items-center gap-3">
          <Avatar className="shrink-0">
            <AvatarFallback>{patientAvatar}</AvatarFallback>
          </Avatar>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium" title={patientName}>
              {patientName}
            </p>

            <p className="truncate text-sm text-muted-foreground">
              {session.patient.phone}
            </p>
          </div>
        </div>
      </TableCell>

      {/* Status */}
      <TableCell className="min-w-0 px-4 text-center">
        <div className="flex min-w-0 justify-center overflow-hidden">
          <SessionStatusBadge status={session.status} />
        </div>
      </TableCell>

      {/* Date */}
      <TableCell className="min-w-0 px-4 text-center">
        <p className="truncate text-sm" title={date}>
          {date}
        </p>

        <p className="truncate text-sm text-muted-foreground">{time}</p>
      </TableCell>

      {/* Duration */}
      <TableCell className="min-w-0 px-4 text-center">
        <span className="whitespace-nowrap text-sm">
          {session.duration} {translations.minutes}
        </span>
      </TableCell>

      {/* Mood */}
      <TableCell className="min-w-0 px-4 text-center">
        {session.mood ? (
          <div className="flex justify-center overflow-hidden">
            <MoodBadge mood={session.mood} />
          </div>
        ) : (
          <span className="text-sm text-muted-foreground">—</span>
        )}
      </TableCell>

      {/* Session Type */}
      <TableCell className="min-w-0 px-4 text-center">
        <p className="truncate text-sm" title={type}>
          {type}
        </p>
      </TableCell>

      {/* Actions */}
      <TableCell className="px-4 text-center">
        <div className="flex justify-center">
          <SessionActions
            sessionId={session.id}
            onDeleted={onDeleted}
            translations={actionTranslations}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default SessionRow;
