// components/feature/dashboard/admin/test-results/TestResultsPage.tsx

"use client";

import { useCallback, useEffect, useState } from "react";
import { Search } from "lucide-react";
import Link from "next/link";

import { getPatientTests } from "@/app/actions/admin-actions/test-results/get-patient-tests";

interface Translations {
  header: {
    label: string;
    title: string;
    description: string;
  };

  search: {
    placeholder: string;
  };

  table: {
    patient: string;
    test: string;
    status: string;
    score: string;
    result: string;
    answers: string;
    date: string;
    actions: string;
    view: string;
    loading: string;
    empty: string;
  };

  status: {
    notStarted: string;
    inProgress: string;
    completed: string;
  };
}

interface Props {
  translations: Translations;
}

type PatientTestItem = {
  id: string;
  patient: {
    id: string;
    firstName: string;
    firstNameAr: string | null;
    lastName: string;
    lastNameAr: string | null;
    email: string;
  };
  test: {
    id: string;
    title: string;
    titleAr: string | null;
    price: number;
  };
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  score: number | null;
  result: string | null;
  answersCount: number;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;
};

const TestResultsPage = ({ translations }: Props) => {
  const [items, setItems] = useState<PatientTestItem[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchResults = useCallback(async () => {
    try {
      setLoading(true);

      const result = await getPatientTests(search);

      if (result.success) {
        setItems(result.data);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("FETCH_TEST_RESULTS_ERROR:", error);
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(timeout);
  }, [fetchResults]);

  const getPatientName = (patient: PatientTestItem["patient"]) => {
    return `${patient.firstName} ${patient.lastName}`;
  };

  const getTestTitle = (test: PatientTestItem["test"]) => {
    return test.title;
  };

  const getStatusLabel = (status: PatientTestItem["status"]) => {
    switch (status) {
      case "COMPLETED":
        return translations.status.completed;
      case "IN_PROGRESS":
        return translations.status.inProgress;
      default:
        return translations.status.notStarted;
    }
  };

  const getStatusClassName = (status: PatientTestItem["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-success/10 text-success";
      case "IN_PROGRESS":
        return "bg-warning/10 text-warning";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          {translations.header.label}
        </span>

        <h1 className="mt-2 text-3xl font-bold">{translations.header.title}</h1>

        <p className="mt-2 max-w-3xl text-muted-foreground">
          {translations.header.description}
        </p>
      </div>

      <div className="rounded-2xl border bg-card p-4 shadow-sm">
        <div className="relative max-w-xl">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={translations.search.placeholder}
            className="h-11 w-full rounded-xl border bg-background pl-10 pr-4 text-sm outline-none transition focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead className="border-b bg-muted/40">
              <tr>
                <th className="px-5 py-4 text-start text-sm font-semibold">
                  {translations.table.patient}
                </th>

                <th className="px-5 py-4 text-start text-sm font-semibold">
                  {translations.table.test}
                </th>

                <th className="px-5 py-4 text-start text-sm font-semibold">
                  {translations.table.status}
                </th>

                <th className="px-5 py-4 text-start text-sm font-semibold">
                  {translations.table.score}
                </th>

                <th className="px-5 py-4 text-start text-sm font-semibold">
                  {translations.table.result}
                </th>

                <th className="px-5 py-4 text-start text-sm font-semibold">
                  {translations.table.answers}
                </th>

                <th className="px-5 py-4 text-start text-sm font-semibold">
                  {translations.table.date}
                </th>

                <th className="px-5 py-4 text-end text-sm font-semibold">
                  {translations.table.actions}
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {loading ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-muted-foreground"
                  >
                    {translations.table.loading}
                  </td>
                </tr>
              ) : items.length === 0 ? (
                <tr>
                  <td
                    colSpan={8}
                    className="px-5 py-12 text-center text-sm text-muted-foreground"
                  >
                    {translations.table.empty}
                  </td>
                </tr>
              ) : (
                items.map((item) => (
                  <tr
                    key={item.id}
                    className="transition-colors hover:bg-muted/30"
                  >
                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {getPatientName(item.patient)}
                      </div>

                      <div className="mt-1 text-xs text-muted-foreground">
                        {item.patient.email}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <div className="font-medium">
                        {getTestTitle(item.test)}
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName(
                          item.status,
                        )}`}
                      >
                        {getStatusLabel(item.status)}
                      </span>
                    </td>

                    <td className="px-5 py-4 font-medium">
                      {item.score ?? "—"}
                    </td>

                    <td className="max-w-[220px] px-5 py-4">
                      <span className="line-clamp-2 text-sm">
                        {item.result ?? "—"}
                      </span>
                    </td>

                    <td className="px-5 py-4">{item.answersCount}</td>

                    <td className="px-5 py-4 text-sm text-muted-foreground">
                      {new Intl.DateTimeFormat(undefined, {
                        dateStyle: "medium",
                      }).format(new Date(item.createdAt))}
                    </td>

                    <td className="px-5 py-4 text-end">
                      <Link
                        href={`/dashboard/admin/test-results/${item.id}`}
                        className="inline-flex min-h-9 w-full items-center justify-center rounded-xl border px-3 py-2 text-center text-sm font-medium leading-tight transition hover:bg-muted sm:w-auto sm:px-4"
                      >
                        {translations.table.view}
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TestResultsPage;
