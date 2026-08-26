// app/.../my-books/page.tsx

import { cookies } from "next/headers";

import { getMyBooks } from "@/app/actions/patient-actions/books/get-my-books";
import MyBooks from "@/components/feature/dashboard/books/my-books/my-books";
import { getTranslations } from "@/i18n/getTranslations";

const MyBooksPage = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value ?? "en";

  const t = await getTranslations(locale);
  const result = await getMyBooks();

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">
          {t("myBooks.title")}
        </h1>

        <p className="mt-1 text-sm text-muted-foreground">
          {t("myBooks.description")}
        </p>
      </div>

      <MyBooks
        books={result.success ? result.books : []}
        locale={locale}
        translations={{
          emptyTitle: t("myBooks.emptyTitle"),
          emptyDescription: t("myBooks.emptyDescription"),
          noDescription: t("myBooks.noDescription"),
          purchased: t("myBooks.purchased"),
          readBook: t("myBooks.readBook"),
        }}
      />
    </div>
  );
};

export default MyBooksPage;
