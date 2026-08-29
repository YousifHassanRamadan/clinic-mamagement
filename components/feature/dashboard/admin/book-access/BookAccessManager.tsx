"use client";

import { useEffect, useState, useTransition } from "react";
import { BookOpen, CheckCircle2, Loader2, UserRound } from "lucide-react";
import { toast } from "sonner";

import { grantBookAccess } from "@/app/actions/admin-actions/book-approval/book-access";
import { getAvailableBooksForUser } from "@/app/actions/admin-actions/book-approval/get-book-access";

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

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

interface Book {
  id: string;
  title: string;
  description: string | null;
  coverImage: string | null;
}

interface Translations {
  title: string;
  description: string;
  grantBookAccess: string;
  selectPatientAndBook: string;
  patient: string;
  selectPatient: string;
  noPatientsFound: string;
  book: string;
  selectPatientFirst: string;
  loadingBooks: string;
  selectBook: string;
  noAvailableBooks: string;
  readyToGrantAccess: string;
  willGetAccessTo: string;
  noBooksAvailable: string;
  allBooksAccess: string;
  grantingAccess: string;
  pleaseSelectPatient: string;
  pleaseSelectBook: string;
  accessGranted: string;
  failedToLoad: string;
}

interface Props {
  users: User[];
  translations: Translations;
}

const selectTriggerClassName =
  "h-11 w-full rounded-xl border-border/60 bg-background/80 px-3 shadow-sm transition-all hover:border-primary/40 hover:bg-muted/40 focus:ring-2 focus:ring-primary/20";

const selectContentClassName =
  "w-[--radix-select-trigger-width] min-w-0 overflow-hidden rounded-xl border-border/60 bg-popover/95 p-1.5 shadow-xl backdrop-blur-md";

const selectItemClassName =
  "cursor-pointer rounded-lg px-3 py-2.5 text-sm transition-colors focus:bg-primary/10 focus:text-primary";

const BookAccessManager = ({ users, translations }: Props) => {
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");

  const [availableBooks, setAvailableBooks] = useState<Book[]>([]);

  const [isPending, startTransition] = useTransition();
  const [isLoadingBooks, startBooksTransition] = useTransition();

  useEffect(() => {
    if (!selectedUserId) {
      setAvailableBooks([]);
      setSelectedBookId("");
      return;
    }

    setSelectedBookId("");

    startBooksTransition(async () => {
      const result = await getAvailableBooksForUser(selectedUserId);

      if (!result.success) {
        toast.error(result.message);
        setAvailableBooks([]);
        return;
      }

      setAvailableBooks(result.data);
    });
  }, [selectedUserId]);

  const handleGrantAccess = () => {
    if (!selectedUserId) {
      toast.error(translations.pleaseSelectPatient);
      return;
    }

    if (!selectedBookId) {
      toast.error(translations.pleaseSelectBook);
      return;
    }

    startTransition(async () => {
      const result = await grantBookAccess(selectedUserId, selectedBookId);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      toast.success(translations.accessGranted);

      setAvailableBooks((currentBooks) =>
        currentBooks.filter((book) => book.id !== selectedBookId),
      );

      setSelectedBookId("");
    });
  };

  const selectedUser = users.find((user) => user.id === selectedUserId);

  const selectedBook = availableBooks.find(
    (book) => book.id === selectedBookId,
  );

  const summaryText =
    selectedUser && selectedBook
      ? translations.willGetAccessTo
          .replace(
            "{{patient}}",
            `${selectedUser.firstName} ${selectedUser.lastName}`,
          )
          .replace("{{book}}", selectedBook.title)
      : "";

  return (
    <div className="mx-auto w-full max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {translations.title}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          {translations.description}
        </p>
      </div>

      <Card className="border-border bg-card shadow-sm">
        <CardHeader>
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-5 w-5 text-primary" />
            </div>

            <div className="min-w-0">
              <CardTitle>{translations.grantBookAccess}</CardTitle>

              <CardDescription className="mt-1">
                {translations.selectPatientAndBook}
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              {translations.patient}
            </label>

            <div className="pt-3">
              <Select
                value={selectedUserId}
                onValueChange={setSelectedUserId}
                disabled={isPending}
              >
                <SelectTrigger className={selectTriggerClassName}>
                  <div className="flex min-w-0 items-center gap-2">
                    <UserRound className="h-4 w-4 shrink-0 text-muted-foreground" />

                    <SelectValue placeholder={translations.selectPatient} />
                  </div>
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  sideOffset={6}
                  className={selectContentClassName}
                >
                  {users.length === 0 ? (
                    <SelectItem
                      value="no-users"
                      disabled
                      className={selectItemClassName}
                    >
                      {translations.noPatientsFound}
                    </SelectItem>
                  ) : (
                    users.map((user) => (
                      <SelectItem
                        key={user.id}
                        value={user.id}
                        className={selectItemClassName}
                      >
                        <div className="flex flex-col">
                          <span>
                            {user.firstName} {user.lastName}
                          </span>

                          <span className="text-xs text-muted-foreground">
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

          <div className="space-y-2">
            <label className="text-sm font-medium ">{translations.book}</label>

            <div className="pt-3">
              {" "}
              <Select
                value={selectedBookId}
                onValueChange={setSelectedBookId}
                disabled={!selectedUserId || isLoadingBooks || isPending}
              >
                <SelectTrigger className={selectTriggerClassName}>
                  <div className="flex min-w-0 items-center gap-2">
                    {isLoadingBooks ? (
                      <Loader2 className="h-4 w-4 shrink-0 animate-spin text-muted-foreground" />
                    ) : (
                      <BookOpen className="h-4 w-4 shrink-0 text-muted-foreground" />
                    )}

                    <SelectValue
                      placeholder={
                        !selectedUserId
                          ? translations.selectPatientFirst
                          : isLoadingBooks
                            ? translations.loadingBooks
                            : translations.selectBook
                      }
                    />
                  </div>
                </SelectTrigger>

                <SelectContent
                  position="popper"
                  sideOffset={6}
                  className={selectContentClassName}
                >
                  {isLoadingBooks ? (
                    <SelectItem
                      value="loading"
                      disabled
                      className={selectItemClassName}
                    >
                      {translations.loadingBooks}
                    </SelectItem>
                  ) : availableBooks.length === 0 ? (
                    <SelectItem
                      value="no-books"
                      disabled
                      className={selectItemClassName}
                    >
                      {translations.noAvailableBooks}
                    </SelectItem>
                  ) : (
                    availableBooks.map((book) => (
                      <SelectItem
                        key={book.id}
                        value={book.id}
                        className={selectItemClassName}
                      >
                        {book.title}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          {selectedUser && selectedBook && (
            <div className="rounded-xl border border-border bg-muted/50 p-4">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>

                <div className="min-w-0 space-y-1">
                  <p className="text-sm font-semibold">
                    {translations.readyToGrantAccess}
                  </p>

                  <p className="text-sm text-muted-foreground">{summaryText}</p>
                </div>
              </div>
            </div>
          )}

          {selectedUserId && !isLoadingBooks && availableBooks.length === 0 && (
            <div className="rounded-xl border border-dashed p-6 text-center">
              <BookOpen className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />

              <p className="text-sm font-medium">
                {translations.noBooksAvailable}
              </p>

              <p className="mt-1 text-xs text-muted-foreground">
                {translations.allBooksAccess}
              </p>
            </div>
          )}

          <Button
            type="button"
            onClick={handleGrantAccess}
            disabled={
              isPending || isLoadingBooks || !selectedUserId || !selectedBookId
            }
            className="h-11 w-full"
          >
            {isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                {translations.grantingAccess}
              </>
            ) : (
              <>
                <CheckCircle2 className="mr-2 h-4 w-4" />
                {translations.grantBookAccess}
              </>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default BookAccessManager;
