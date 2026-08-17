"use client";

import { useEffect, useState } from "react";

import { SessionStatus, SessionType } from "@/app/generated/prisma/enums";

import { getSessions } from "@/app/actions/admin-actions/session/get-sessions";

import type { SessionWithRelations } from "./types";

import SessionsToolbar from "./SessionsToolbar";
import SessionsTable from "./SessionsTable";
import AddSession from "./AddSession";

const SessionsPage = () => {
  const [sessions, setSessions] = useState<SessionWithRelations[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [status, setStatus] = useState<SessionStatus | "all">("all");

  const [sessionType, setSessionType] = useState<SessionType | "all">("all");

  const fetchSessions = async () => {
    try {
      setLoading(true);

      const result = await getSessions({
        search,
        status,
        sessionType,
      });

      if (result.success) {
        setSessions(result.data);
      } else {
        setSessions([]);
      }
    } catch (error) {
      console.error("FETCH_SESSIONS_ERROR:", error);
      setSessions([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, [search, status, sessionType]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Clinical Record
          </span>

          <h1 className="mt-2 text-3xl font-bold">Sessions</h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            Every appointment, its outcome, and the notes attached to it.
            Private notes remain hidden from the patient portal.
          </p>
        </div>

        <AddSession />
      </div>

      <SessionsToolbar
        search={search}
        status={status}
        sessionType={sessionType}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSessionTypeChange={setSessionType}
      />

      <SessionsTable
        sessions={sessions}
        loading={loading}
        onDeleted={fetchSessions}
      />
    </div>
  );
};

export default SessionsPage;
