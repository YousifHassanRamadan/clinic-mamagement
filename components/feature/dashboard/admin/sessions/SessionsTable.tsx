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

interface SessionsTableProps {
  sessions: SessionWithRelations[];
  loading: boolean;
  onDeleted: () => void;
}

const SessionsTable = ({
  sessions,
  loading,
  onDeleted,
}: SessionsTableProps) => {
  if (loading) {
    return (
      <Card className="rounded-2xl p-6">
        <div className="flex items-center justify-center py-10">
          <p className="text-sm text-muted-foreground">Loading sessions...</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden rounded-2xl">
      {/* Desktop */}
      <div className="hidden overflow-x-auto lg:block">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Mood</TableHead>
              <TableHead>Session Type</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sessions.map((session) => (
              <SessionRow
                key={session.id}
                session={session}
                onDeleted={onDeleted}
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
          />
        ))}
      </div>

      {!sessions.length && (
        <div className="p-10 text-center">
          <p className="text-sm text-muted-foreground">No sessions found.</p>
        </div>
      )}
    </Card>
  );
};

export default SessionsTable;
