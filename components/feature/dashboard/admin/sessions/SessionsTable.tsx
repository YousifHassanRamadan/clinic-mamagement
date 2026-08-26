// components/feature/dashboard/admin/sessions/SessionsTable.tsx

"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Card } from "@/components/ui/card";

import SessionRow from "./SessionRow";
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

interface SessionsTableProps {
  sessions: SessionWithRelations[];
  loading: boolean;
  onDeleted: () => void;
  translations: Translations;
  actionTranslations: ActionTranslations;
}

const SessionsTable = ({
  sessions,
  loading,
  onDeleted,
  translations,
  actionTranslations,
}: SessionsTableProps) => {
  if (loading) {
    return (
      <Card className="rounded-2xl p-6">
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-muted-foreground">
            {translations.loading}
          </p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-2xl">
      {/* Desktop */}
      <div className="hidden overflow-x-auto lg:block">
        <Table className="w-full table-fixed">
          <colgroup>
            {/* Patient */}
            <col className="w-[21%]" />

            {/* Status */}
            <col className="w-[12%]" />

            {/* Date */}
            <col className="w-[15%]" />

            {/* Duration */}
            <col className="w-[12%]" />

            {/* Mood */}
            <col className="w-[13%]" />

            {/* Session Type */}
            <col className="w-[15%]" />

            {/* Actions */}
            <col className="w-[12%]" />
          </colgroup>

          <TableHeader>
            <TableRow>
              <TableHead className="whitespace-nowrap px-4 text-start">
                {translations.patient}
              </TableHead>

              <TableHead className="whitespace-nowrap px-4 text-center">
                {translations.status}
              </TableHead>

              <TableHead className="whitespace-nowrap px-4 text-center">
                {translations.date}
              </TableHead>

              <TableHead className="whitespace-nowrap px-4 text-center">
                {translations.duration}
              </TableHead>

              <TableHead className="whitespace-nowrap px-4 text-center">
                {translations.mood}
              </TableHead>

              <TableHead className="whitespace-nowrap px-4 text-center">
                {translations.sessionType}
              </TableHead>

              <TableHead className="whitespace-nowrap px-4 text-center">
                {translations.actions}
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sessions.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                onDeleted={onDeleted}
                translations={translations}
                actionTranslations={actionTranslations}
              />
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Mobile */}
      <div className="space-y-4 p-4 lg:hidden">
        {sessions.map((session) => (
          <SessionRow
            key={session.id}
            session={session}
            mobile
            onDeleted={onDeleted}
            translations={translations}
            actionTranslations={actionTranslations}
          />
        ))}
      </div>

      {!sessions.length && (
        <div className="p-10 text-center">
          <p className="text-sm text-muted-foreground">
            {translations.noSessions}
          </p>
        </div>
      )}
    </Card>
  );
};

export default SessionsTable;
