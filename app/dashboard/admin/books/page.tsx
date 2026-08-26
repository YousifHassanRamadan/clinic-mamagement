import { BookOpen } from "lucide-react";

import { getBooks } from "@/app/actions/admin-actions/books/get-books";
import BooksManager from "@/components/feature/dashboard/admin/books/books-manager";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getTranslations } from "@/i18n/getTranslations";

const BooksPage = async () => {
  const result = await getBooks();

  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <div className="mx-auto w-full max-w-7xl space-y-8 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <BookOpen className="h-5 w-5 text-primary" />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              {t("dashboard.admin.books.title")}
            </h1>

            <p className="mt-1 text-sm text-muted-foreground sm:text-base">
              {t("dashboard.admin.books.description")}
            </p>
          </div>
        </div>
      </div>

      <BooksManager
        locale={locale}
        translations={{
          form: {
            createTitle: t("dashboard.admin.books.form.createTitle"),
            editTitle: t("dashboard.admin.books.form.editTitle"),
            bookTitle: t("dashboard.admin.books.form.bookTitle"),
            bookTitlePlaceholder: t(
              "dashboard.admin.books.form.bookTitlePlaceholder",
            ),
            arabicTitle: t("dashboard.admin.books.form.arabicTitle"),
            arabicTitlePlaceholder: t(
              "dashboard.admin.books.form.arabicTitlePlaceholder",
            ),
            description: t("dashboard.admin.books.form.description"),
            descriptionPlaceholder: t(
              "dashboard.admin.books.form.descriptionPlaceholder",
            ),
            arabicDescription: t(
              "dashboard.admin.books.form.arabicDescription",
            ),
            arabicDescriptionPlaceholder: t(
              "dashboard.admin.books.form.arabicDescriptionPlaceholder",
            ),
            price: t("dashboard.admin.books.form.price"),
            pricePlaceholder: t("dashboard.admin.books.form.pricePlaceholder"),
            cover: t("dashboard.admin.books.form.cover"),
            currentCoverAlt: t("dashboard.admin.books.form.currentCoverAlt"),
            keepCurrentCover: t("dashboard.admin.books.form.keepCurrentCover"),
            newCoverHint: t("dashboard.admin.books.form.newCoverHint"),
            pdf: t("dashboard.admin.books.form.pdf"),
            keepCurrentPdf: t("dashboard.admin.books.form.keepCurrentPdf"),
            newPdfHint: t("dashboard.admin.books.form.newPdfHint"),
            cancel: t("dashboard.admin.books.form.cancel"),
            create: t("dashboard.admin.books.form.create"),
            update: t("dashboard.admin.books.form.update"),
            uploading: t("dashboard.admin.books.form.uploading"),
            updating: t("dashboard.admin.books.form.updating"),
          },
          list: {
            title: t("dashboard.admin.books.list.title"),
            description: t("dashboard.admin.books.list.description"),
            emptyTitle: t("dashboard.admin.books.list.emptyTitle"),
            emptyDescription: t("dashboard.admin.books.list.emptyDescription"),
            noDescription: t("dashboard.admin.books.list.noDescription"),
            active: t("dashboard.admin.books.list.active"),
            inactive: t("dashboard.admin.books.list.inactive"),
            patient: t("dashboard.admin.books.list.patient"),
            patients: t("dashboard.admin.books.list.patients"),
            pdf: t("dashboard.admin.books.list.pdf"),
            edit: t("dashboard.admin.books.list.edit"),
            currency: t("dashboard.admin.books.list.currency"),
          },
        }}
        books={result.books}
      />
    </div>
  );
};

export default BooksPage;
