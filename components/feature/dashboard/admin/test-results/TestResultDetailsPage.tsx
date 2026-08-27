"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft, CheckCircle2, ClipboardList, User } from "lucide-react";

import { getPatientTestById } from "@/app/actions/admin-actions/test-results/get-patient-test-by-id";

interface Translations {
  back: string;

  header: {
    label: string;
    title: string;
  };

  patient: {
    title: string;
    email: string;
    phone: string;
  };

  test: {
    title: string;
    description: string;
  };

  result: {
    title: string;
    status: string;
    score: string;
    result: string;
    completedAt: string;
    inProgress: string;
    notStarted: string;
    completed: string;
  };

  answers: {
    title: string;
    question: string;
    selectedAnswer: string;
    points: string;
    empty: string;
  };

  loading: string;
  error: string;
}

interface Props {
  patientTestId: string;
  locale: "en" | "ar";
  translations: Translations;
}

type ResultData = {
  id: string;
  status: "NOT_STARTED" | "IN_PROGRESS" | "COMPLETED";
  score: number | null;
  result: string | null;
  startedAt: Date | null;
  completedAt: Date | null;
  createdAt: Date;

  patient: {
    id: string;
    firstName: string;
    firstNameAr: string | null;
    lastName: string;
    lastNameAr: string | null;
    email: string;
    phone: string;
  };

  test: {
    id: string;
    title: string;
    titleAr: string | null;
    description: string | null;
    descriptionAr: string | null;
  };

  answers: {
    id: string;
    points: number;

    question: {
      id: string;
      question: string;
      questionAr: string | null;
      order: number;
    };

    option: {
      id: string;
      text: string;
      textAr: string | null;
      points: number;
      order: number;
    };

    createdAt: Date;
  }[];
};

const TestResultDetailsPage = ({
  patientTestId,
  locale,
  translations,
}: Props) => {
  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);

  const isArabic = locale === "ar";

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);

        const result = await getPatientTestById(patientTestId);

        if (cancelled) return;

        if (result.success && result.data) {
          setData(result.data);
        } else {
          setData(null);
        }
      } catch (error) {
        console.error("FETCH_TEST_RESULT_DETAILS_ERROR:", error);

        if (!cancelled) {
          setData(null);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [patientTestId]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center text-sm text-muted-foreground">
        {translations.loading}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="rounded-2xl border bg-card p-8 text-center shadow-sm">
          <p className="text-sm text-muted-foreground">{translations.error}</p>

          <Link
            href="/dashboard/admin/test-results"
            className="mt-5 inline-flex h-10 items-center rounded-xl bg-primary px-5 text-sm font-medium text-primary-foreground"
          >
            {translations.back}
          </Link>
        </div>
      </div>
    );
  }

  const getPatientName = () => {
    if (isArabic) {
      const firstName =
        data.patient.firstNameAr?.trim() || data.patient.firstName;
      const lastName = data.patient.lastNameAr?.trim() || data.patient.lastName;

      return `${firstName} ${lastName}`;
    }

    return `${data.patient.firstName} ${data.patient.lastName}`;
  };

  const getTestTitle = () => {
    if (isArabic) {
      return data.test.titleAr?.trim() || data.test.title;
    }

    return data.test.title;
  };

  const getTestDescription = () => {
    if (isArabic) {
      return data.test.descriptionAr?.trim() || data.test.description;
    }

    return data.test.description;
  };

  const getQuestionText = (
    question: ResultData["answers"][number]["question"],
  ) => {
    if (isArabic) {
      return question.questionAr?.trim() || question.question;
    }

    return question.question;
  };

  const getOptionText = (option: ResultData["answers"][number]["option"]) => {
    if (isArabic) {
      return option.textAr?.trim() || option.text;
    }

    return option.text;
  };

  const patientName = getPatientName();
  const testTitle = getTestTitle();
  const testDescription = getTestDescription();

  const getStatusLabel = () => {
    switch (data.status) {
      case "COMPLETED":
        return translations.result.completed;

      case "IN_PROGRESS":
        return translations.result.inProgress;

      default:
        return translations.result.notStarted;
    }
  };

  const getStatusClassName = () => {
    switch (data.status) {
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
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            {translations.header.label}
          </span>

          <h1 className="mt-2 text-3xl font-bold">{testTitle}</h1>

          <p className="mt-2 text-muted-foreground">{patientName}</p>
        </div>

        <Link
          href="/dashboard/admin/test-results"
          className="inline-flex h-10 items-center gap-2 self-start rounded-xl border px-4 text-sm font-medium transition hover:bg-muted"
        >
          <ArrowLeft className="h-4 w-4" />
          {translations.back}
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <User className="h-5 w-5" />
            </div>

            <h2 className="font-semibold">{translations.patient.title}</h2>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <p className="text-xs text-muted-foreground">
                {translations.patient.title}
              </p>

              <p className="mt-1 font-medium">{patientName}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {translations.patient.email}
              </p>

              <p className="mt-1 break-all text-sm">{data.patient.email}</p>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">
                {translations.patient.phone}
              </p>

              <p className="mt-1 text-sm">{data.patient.phone}</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardList className="h-5 w-5" />
            </div>

            <h2 className="font-semibold">{translations.test.title}</h2>
          </div>

          {testDescription && (
            <p className="mt-5 text-sm leading-7 text-muted-foreground">
              {testDescription}
            </p>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-card p-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <CheckCircle2 className="h-5 w-5" />
          </div>

          <h2 className="font-semibold">{translations.result.title}</h2>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">
              {translations.result.status}
            </p>

            <span
              className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-medium ${getStatusClassName()}`}
            >
              {getStatusLabel()}
            </span>
          </div>

          <div className="rounded-xl bg-muted/50 p-4">
            <p className="text-xs text-muted-foreground">
              {translations.result.score}
            </p>

            <p className="mt-2 text-2xl font-bold">{data.score ?? "—"}</p>
          </div>

          <div className="rounded-xl bg-muted/50 p-4 sm:col-span-2">
            <p className="text-xs text-muted-foreground">
              {translations.result.result}
            </p>

            <p className="mt-2 font-semibold">{data.result ?? "—"}</p>
          </div>

          <div className="rounded-xl bg-muted/50 p-4 sm:col-span-2 lg:col-span-4">
            <p className="text-xs text-muted-foreground">
              {translations.result.completedAt}
            </p>

            <p className="mt-2 text-sm">
              {data.completedAt
                ? new Intl.DateTimeFormat(isArabic ? "ar-EG" : "en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(data.completedAt))
                : "—"}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border bg-card shadow-sm">
        <div className="border-b p-6">
          <h2 className="font-semibold">{translations.answers.title}</h2>

          <p className="mt-1 text-sm text-muted-foreground">
            {data.answers.length}
          </p>
        </div>

        <div className="divide-y">
          {data.answers.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted-foreground">
              {translations.answers.empty}
            </div>
          ) : (
            [...data.answers]
              .sort((a, b) => a.question.order - b.question.order)
              .map((answer, index) => (
                <div key={answer.id} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
                      {index + 1}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                        {translations.answers.question}
                      </p>

                      <p className="mt-2 font-medium leading-7">
                        {getQuestionText(answer.question)}
                      </p>

                      <div className="mt-5 rounded-xl border bg-muted/30 p-4">
                        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                          {translations.answers.selectedAnswer}
                        </p>

                        <p className="mt-2 font-medium">
                          {getOptionText(answer.option)}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">
                          {translations.answers.points}
                        </span>

                        <span className="font-semibold">{answer.points}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TestResultDetailsPage;
