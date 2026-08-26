// components/feature/dashboard/admin/sessions/SessionsPage.tsx

"use client";

import { useCallback, useEffect, useState } from "react";

import { SessionStatus, SessionType } from "@/app/generated/prisma/enums";

import { getSessions } from "@/app/actions/admin-actions/session/get-sessions";

import type { SessionWithRelations } from "./types";

import SessionsToolbar from "./SessionsToolbar";
import SessionsTable from "./SessionsTable";
import AddSession from "./AddSession";

interface Translations {
  header: {
    label: string;
    title: string;
    description: string;
  };

  addSession: string;

  toolbar: {
    searchPlaceholder: string;
    status: string;
    allStatuses: string;
    completed: string;
    scheduled: string;
    draft: string;
    cancelled: string;
    noShow: string;
    type: string;
    allTypes: string;
    initialSession: string;
    followUp: string;
    individual: string;
    emergency: string;
    other: string;
  };

  table: {
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
  };

  actions: {
    edit: string;
    delete: string;
    deleteSuccess: string;
    deleteFailed: string;
  };
}

interface Props {
  translations: Translations;
}

const SessionsPage = ({ translations }: Props) => {
  const [sessions, setSessions] = useState<SessionWithRelations[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState<SessionStatus | "all">("all");
  const [sessionType, setSessionType] = useState<SessionType | "all">("all");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  const fetchSessions = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getSessions({
        search: debouncedSearch,
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
  }, [debouncedSearch, status, sessionType]);

  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {translations.header.label}
          </span>

          <h1 className="mt-2 text-3xl font-bold">
            {translations.header.title}
          </h1>

          <p className="mt-2 max-w-2xl text-muted-foreground">
            {translations.header.description}
          </p>
        </div>

        <AddSession label={translations.addSession} />
      </div>

      <SessionsToolbar
        search={search}
        status={status}
        sessionType={sessionType}
        onSearchChange={setSearch}
        onStatusChange={setStatus}
        onSessionTypeChange={setSessionType}
        translations={translations.toolbar}
      />

      <SessionsTable
        sessions={sessions}
        loading={loading}
        onDeleted={fetchSessions}
        translations={translations.table}
        actionTranslations={translations.actions}
      />
    </div>
  );
};

export default SessionsPage;
