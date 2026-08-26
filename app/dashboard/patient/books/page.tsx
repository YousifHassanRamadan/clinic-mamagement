import { cookies } from "next/headers";

import { getPatientBooks } from "@/app/actions/patient-actions/books/get-books";
import PatientBooks from "@/components/feature/dashboard/books/patient-books";
import { getTranslations } from "@/i18n/getTranslations";

const PatientBooksPage = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";

  const t = await getTranslations(locale);
  const result = await getPatientBooks();

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          {t("books.title")}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          {t("books.description")}
        </p>
      </div>

      {!result.success ? (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 p-6 text-center">
          <p className="text-sm text-destructive">{t("books.loadFailed")}</p>
        </div>
      ) : (
        <PatientBooks books={result.books} locale={locale} />
      )}
    </div>
  );
};

export default PatientBooksPage;
