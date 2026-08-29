// TestAccessManager.tsx

"use client";

import { useEffect, useState, useTransition } from "react";
import {
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  Loader2,
  UserRound,
} from "lucide-react";
import { toast } from "sonner";
import i18next from "i18next";

import { Button } from "@/components/ui/button";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  getTestAccessTests,
  grantTestAccess,
} from "@/app/actions/admin-actions/test-approval/test-access";

import en from "@/locales/en/common.json";
import ar from "@/locales/ar/common.json";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Test {
  id: string;
  title: string;
  description: string | null;
  category: {
    id: string;
    name: string;
  } | null;
}

interface Props {
  users: User[];
  tests: Test[];
}

const resources = {
  en: {
    common: en,
  },
  ar: {
    common: ar,
  },
};

const getCookieLocale = (): "en" | "ar" => {
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]*)/);

  return match?.[1] === "ar" ? "ar" : "en";
};

const selectTriggerClass = `
  h-11 w-full rounded-xl border-input bg-background px-4
  shadow-sm
  transition-all duration-200
  hover:border-primary/40
  hover:bg-muted/30
  focus:ring-2 focus:ring-primary/20
`;

const selectContentClass = `
  min-w-[var(--radix-select-trigger-width)]
  overflow-hidden
  rounded-xl
  border
  bg-popover
  p-1.5
  shadow-lg
`;

const selectItemClass = `
  cursor-pointer rounded-lg px-3 py-2.5
  text-sm font-medium
  transition-colors
  focus:bg-primary/10
  focus:text-primary
`;

const TestAccessManager = ({ users, tests: initialTests }: Props) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedTestId, setSelectedTestId] = useState("");

  const [tests, setTests] = useState<Test[]>(initialTests);

  const [isLoadingTests, setIsLoadingTests] = useState(false);
  const [isPending, startTransition] = useTransition();

  const [locale, setLocale] = useState<"en" | "ar">("en");

  useEffect(() => {
    const currentLocale = getCookieLocale();

    if (!i18next.isInitialized) {
      i18next.init({
        lng: currentLocale,
        fallbackLng: "en",
        ns: ["common"],
        defaultNS: "common",
        resources,
        interpolation: {
          escapeValue: false,
        },
      });
    } else {
      i18next.changeLanguage(currentLocale);
    }

    setLocale(currentLocale);
  }, []);

  const t = (key: string, options?: Record<string, unknown>) => {
    return i18next.t(key, {
      ns: "common",
      ...options,
    });
  };

  useEffect(() => {
    if (!selectedUserId) {
      setTests([]);
      setSelectedTestId("");
      return;
    }

    const loadTests = async () => {
      setIsLoadingTests(true);
      setSelectedTestId("");

      const result = await getTestAccessTests(selectedUserId);

      if (!result.success) {
        toast.error(result.message);
        setTests([]);
      } else {
        setTests(result.data);
      }

      setIsLoadingTests(false);
    };

    loadTests();
  }, [selectedUserId, locale]);

  const handleGrantAccess = () => {
    if (!selectedUserId) {
      toast.error(t("testAccess.validation.selectPatient"));
      return;
    }

    if (!selectedTestId) {
      toast.error(t("testAccess.validation.selectTest"));
      return;
    }

    startTransition(async () => {
      const result = await grantTestAccess(selectedUserId, selectedTestId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(result.message);

      setTests((currentTests) =>
        currentTests.filter((test) => test.id !== selectedTestId),
      );

      setSelectedTestId("");
    });
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const selectedTest = tests.find((test) => test.id === selectedTestId);

  return (
    <div
      dir={locale === "ar" ? "rtl" : "ltr"}
      className="mx-auto w-full max-w-4xl space-y-6"
    >
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("testAccess.header.title")}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {t("testAccess.header.description")}
        </p>
      </div>

      {/* Main Card */}
      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <ClipboardCheck className="h-5 w-5" />
            </div>

            <div className="min-w-0">
              <CardTitle>{t("testAccess.card.title")}</CardTitle>

              <CardDescription className="mt-1">
                {t("testAccess.card.description")}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Patient */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("testAccess.patient.label")}
            </label>

            <div className="pt-3">
              <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
                disabled={isPending}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <div className="flex min-w-0 items-center gap-2">
                    <UserRound className="h-4 w-4 shrink-0 text-muted-foreground" />

                    <SelectValue
                      placeholder={t("testAccess.patient.placeholder")}
                    />
                  </div>
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  sideOffset={6}
                  className={selectContentClass}
                >
                  {users.length === 0 ? (
                    <SelectItem
                      value="no-users"
                      disabled
                      className={selectItemClass}
                    >
                      {t("testAccess.patient.noPatients")}
                    </SelectItem>
                  ) : (
                    users.map((user) => (
                      <SelectItem
                        key={user.id}
                        value={user.id}
                        className={selectItemClass}
                      >
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate font-medium">
                            {user.firstName} {user.lastName}
                          </span>

                          <span className="truncate text-xs text-muted-foreground">
                            {user.email}
                          </span>
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Test */}
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {t("testAccess.test.label")}
            </label>

            <div className="pt-3">
              <Select
                value={selectedTestId}
                onValueChange={setSelectedTestId}
                disabled={!selectedUserId || isLoadingTests || isPending}
              >
                <SelectTrigger className={selectTriggerClass}>
                  <div className="flex min-w-0 items-center gap-2">
                    {isLoadingTests ? (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                    ) : (
                      <BookOpenCheck className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}

                    <SelectValue
                      placeholder={
                        !selectedUserId
                          ? t("testAccess.test.selectPatientFirst")
                          : isLoadingTests
                            ? t("testAccess.test.loading")
                            : t("testAccess.test.placeholder")
                      }
                    />
                  </div>
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  sideOffset={6}
                  className={selectContentClass}
                >
                  {!selectedUserId ? (
                    <SelectItem
                      value="no-user"
                      disabled
                      className={selectItemClass}
                    >
                      {t("testAccess.test.selectPatientFirst")}
                    </SelectItem>
                  ) : isLoadingTests ? (
                    <SelectItem
                      value="loading"
                      disabled
                      className={selectItemClass}
                    >
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                        <span>{t("testAccess.test.loading")}</span>
                      </div>
                    </SelectItem>
                  ) : tests.length === 0 ? (
                    <SelectItem
                      value="no-tests"
                      disabled
                      className={selectItemClass}
                    >
                      {t("testAccess.test.noTests")}
                    </SelectItem>
                  ) : (
                    tests.map((test) => (
                      <SelectItem
                        key={test.id}
                        value={test.id}
                        className={selectItemClass}
                      >
                        <div className="flex min-w-0 flex-col gap-0.5">
                          <span className="truncate font-medium">
                            {test.title}
                          </span>

                          {test.category && (
                            <span className="truncate text-xs text-muted-foreground">
                              {test.category.name}
                            </span>
                          )}
                        </div>
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            {selectedUserId && !isLoadingTests && tests.length === 0 && (
              <p className="text-xs text-muted-foreground">
                {t("testAccess.test.allTestsGranted")}
              </p>
            )}
          </div>

          {/* Summary */}
          {selectedUser && selectedTest && (
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <CheckCircle2 className="h-5 w-5" />
                </div>

                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold">
                    {t("testAccess.summary.title")}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      {selectedUser.firstName} {selectedUser.lastName}
                    </span>{" "}
                    {t("testAccess.summary.description")}{" "}
                    <span className="font-medium text-foreground">
                      {selectedTest.title}
                    </span>
                    .
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Action */}
          <Button
            type="button"
            onClick={handleGrantAccess}
            disabled={
              isPending || isLoadingTests || !selectedUserId || !selectedTestId
            }
            className="h-11 w-full rounded-xl"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {t("testAccess.actions.granting")}
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {t("testAccess.actions.grant")}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestAccessManager;
