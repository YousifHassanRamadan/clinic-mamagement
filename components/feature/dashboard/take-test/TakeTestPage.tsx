"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import TestHeader from "./TestHeader";
import TestProgress from "./TestProgress";
import QuestionCard from "./QuestionCard";

import { useTestStore } from "@/store/test-store";

import { startTest } from "@/app/actions/patient-actions/tests/start-test";
import { submitTest } from "@/app/actions/patient-actions/tests/submit-test";
import { StartedTest } from "@/app/dashboard/patient/tests/types";

interface TestAnswer {
  questionId: string;
  optionId: string;
}

interface Translations {
  noTestSelected: string;
  answerAllQuestions: string;
  patientTestIdMissing: string;
  submitError: string;
  unableToLoad: string;
  defaultDescription: string;

  question: string;
  of: string;
  complete: string;

  navigation: {
    previous: string;
    next: string;
    finish: string;
    submitting: string;
  };
}

interface Props {
  locale: "en" | "ar";
  translations: Translations;
}

const TakeTestPage = ({ locale, translations }: Props) => {
  const selectedTestId = useTestStore((state) => state.selectedTestId);

  const [test, setTest] = useState<StartedTest | null>(null);
  const [patientTestId, setPatientTestId] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<TestAnswer[]>([]);

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const loadTest = async () => {
      if (!selectedTestId) {
        toast.error(translations.noTestSelected);
        setLoading(false);
        return;
      }

      const result = await startTest({
        testId: selectedTestId,
        locale,
      });

      if (!result.success) {
        toast.error(result.message);
        setLoading(false);
        return;
      }

      setTest(result.test as StartedTest);
      setPatientTestId(result.patientTestId);
      setLoading(false);
    };

    loadTest();
  }, [selectedTestId, locale, translations.noTestSelected]);

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    setAnswers((prev) => {
      const existingAnswer = prev.find(
        (answer) => answer.questionId === questionId,
      );

      if (existingAnswer) {
        return prev.map((answer) =>
          answer.questionId === questionId
            ? {
                ...answer,
                optionId,
              }
            : answer,
        );
      }

      return [
        ...prev,
        {
          questionId,
          optionId,
        },
      ];
    });
  };

  const handleFinishTest = async () => {
    if (!test) return;

    if (answers.length !== test.questions.length) {
      toast.error(translations.answerAllQuestions);
      return;
    }

    if (!patientTestId) {
      toast.error(translations.patientTestIdMissing);
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitTest({
        patientTestId,
        answers,
      });

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      router.push("/dashboard/patient/tests/results");
    } catch (error) {
      console.error("FINISH_TEST_ERROR:", error);
      toast.error(translations.submitError);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-4xl space-y-8 py-10">
        <div className="h-10 w-2/3 animate-pulse rounded-xl bg-muted" />

        <div className="h-2 w-full animate-pulse rounded-full bg-muted" />

        <div className="h-96 animate-pulse rounded-3xl bg-muted" />
      </section>
    );
  }

  if (!test) {
    return (
      <section className="mx-auto max-w-4xl py-10">
        <div className="rounded-3xl border p-8 text-center">
          <p className="text-muted-foreground">{translations.unableToLoad}</p>
        </div>
      </section>
    );
  }

  const question = test.questions[currentQuestion];

  const currentAnswer = answers.find(
    (answer) => answer.questionId === question.id,
  );

  return (
    <section
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="mx-auto max-w-4xl space-y-8 py-10"
    >
      <TestHeader
        title={test.title}
        subtitle={test.description ?? translations.defaultDescription}
      />

      <TestProgress
        current={currentQuestion + 1}
        total={test.questions.length}
        translations={{
          question: translations.question,
          of: translations.of,
          complete: translations.complete,
        }}
      />

      <QuestionCard
        key={question.id}
        question={question}
        current={currentQuestion}
        total={test.questions.length}
        selected={currentAnswer?.optionId ?? null}
        submitting={submitting}
        translations={translations.navigation}
        onSelect={(optionId) => {
          handleSelectAnswer(question.id, optionId);
        }}
        onPrevious={() => {
          setCurrentQuestion((prev) => Math.max(prev - 1, 0));
        }}
        onNext={() => {
          setCurrentQuestion((prev) =>
            Math.min(prev + 1, test.questions.length - 1),
          );
        }}
        onFinish={handleFinishTest}
      />
    </section>
  );
};

export default TakeTestPage;
