import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  getBookAccessBooks,
  getBookAccessUsers,
} from "@/app/actions/admin-actions/book-approval/book-access-data";
import BookAccessManager from "@/components/feature/dashboard/admin/book-access/BookAccessManager";
import { getTranslations } from "@/i18n/getTranslations";
import { auth } from "@/providers/auth/auth";

const BookAccessPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  const t = await getTranslations(locale);

  const translations = {
    title: t("bookAccess.title"),
    description: t("bookAccess.description"),
    grantBookAccess: t("bookAccess.grantBookAccess"),
    selectPatientAndBook: t("bookAccess.selectPatientAndBook"),
    patient: t("bookAccess.patient"),
    selectPatient: t("bookAccess.selectPatient"),
    noPatientsFound: t("bookAccess.noPatientsFound"),
    book: t("bookAccess.book"),
    selectPatientFirst: t("bookAccess.selectPatientFirst"),
    loadingBooks: t("bookAccess.loadingBooks"),
    selectBook: t("bookAccess.selectBook"),
    noAvailableBooks: t("bookAccess.noAvailableBooks"),
    readyToGrantAccess: t("bookAccess.readyToGrantAccess"),
    willGetAccessTo: t("bookAccess.willGetAccessTo"),
    noBooksAvailable: t("bookAccess.noBooksAvailable"),
    allBooksAccess: t("bookAccess.allBooksAccess"),
    grantingAccess: t("bookAccess.grantingAccess"),
    pleaseSelectPatient: t("bookAccess.pleaseSelectPatient"),
    pleaseSelectBook: t("bookAccess.pleaseSelectBook"),
    accessGranted: t("bookAccess.accessGranted"),
    failedToLoad: t("bookAccess.failedToLoad"),
  };

  const [usersResult, booksResult] = await Promise.all([
    getBookAccessUsers(),
    getBookAccessBooks(),
  ]);

  if (!usersResult.success || !booksResult.success) {
    return (
      <div className="p-6">
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
          {translations.failedToLoad}
        </div>
      </div>
    );
  }

  return (
    <main className="p-4 sm:p-6 lg:p-8">
      <BookAccessManager users={usersResult.data} translations={translations} />
    </main>
  );
};

export default BookAccessPage;
