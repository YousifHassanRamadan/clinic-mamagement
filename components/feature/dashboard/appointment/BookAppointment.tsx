// components/feature/dashboard/appointments/BookAppointment.tsx

import { cookies } from "next/headers";

import { getTranslations } from "@/i18n/getTranslations";

import BookAppointmentClient from "./BookAppointmentClient";

const BookAppointment = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const t = await getTranslations(locale);

  const translations = {
    date: {
      title: t("booking.chooseDate"),
      description: t("booking.selectAvailableDate"),
    },
    time: {
      title: t("booking.chooseTime"),
      selectDateFirst: t("booking.selectDateFirst"),
      loading: t("booking.loadingTimes"),
      noAvailable: t("booking.noAvailableAppointments"),
    },
    session: {
      title: t("booking.sessionTypeAndNotes"),
      notesPlaceholder: t("booking.notesPlaceholder"),
      options: {
        onsite: {
          title: t("sessionType2.onsite"),
          description: t("sessionType2.onsiteDescription"),
        },
        online: {
          title: t("sessionType2.online"),
          description: t("sessionType2.onlineDescription"),
        },
      },
    },
    summary: {
      title: t("booking.summary"),
      noDate: t("booking.noDateSelected"),
      noTime: t("booking.noTimeSelected"),
      minutes: t("booking.minutes"),
      onsite: t("booking.onsiteClinic"),
      online: t("booking.googleMeet"),
      cancellation: t("booking.freeCancellation"),
      booking: t("booking.booking"),
      confirm: t("booking.confirm"),
      selectDate: t("booking.selectDate"),
      selectTime: t("booking.selectTime"),
    },
    toast: {
      bookingSuccess: t("booking.bookingSuccess"),
    },
  };

  return <BookAppointmentClient translations={translations} />;
};

export default BookAppointment;
