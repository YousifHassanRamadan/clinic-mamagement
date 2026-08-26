import { cookies } from "next/headers";

import BookAppointment from "@/components/feature/dashboard/appointment/BookAppointment";
import { getTranslations } from "@/i18n/getTranslations";
import { defaultLocale, isLocale } from "@/i18n/config";

export default async function AppointmentPage() {
  const cookieStore = await cookies();

  const localeCookie = cookieStore.get("locale")?.value;

  const locale = isLocale(localeCookie ?? "") ? localeCookie : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">{t("appointmentPage.title")}</h1>

        <p className="text-muted-foreground">
          {t("appointmentPage.description")}
        </p>
      </div>

      <BookAppointment />
    </div>
  );
}
