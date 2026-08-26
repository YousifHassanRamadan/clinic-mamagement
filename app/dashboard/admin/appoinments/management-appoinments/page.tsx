import CreateAppointmentPage from "@/components/feature/dashboard/admin/create-appointment/CreateAppointmentPage";

import { cookies } from "next/headers";

import { defaultLocale, isLocale, type Locale } from "@/i18n/config";

import { getTranslations } from "@/i18n/getTranslations";

export default async function Page() {
  const cookieStore = await cookies();

  const cookieLocale = cookieStore.get("locale")?.value;

  const locale: Locale = isLocale(cookieLocale ?? "")
    ? (cookieLocale as Locale)
    : defaultLocale;

  const t = await getTranslations(locale);

  return (
    <CreateAppointmentPage
      locale={locale}
      translations={{
        scheduling: t("appointments.header.eyebrow"),
        createAppointment: t("appointments.header.title"),
        description: t("appointments.header.description"),

        newAvailability: t("appointments.actions.newAvailability"),
        reset: t("appointments.actions.reset"),
        checkingBookedAppointments: t(
          "appointments.messages.checkingBookedAppointments",
        ),
        selectAll: t("appointments.actions.selectAll"),
        clear: t("appointments.actions.clear"),
        saving: t("appointments.actions.saving"),
        updateAvailability: t("appointments.actions.updateAvailability"),
        saveAvailability: t("appointments.actions.saveAvailability"),

        noAvailabilitySelected: t(
          "appointments.messages.noAvailabilitySelected",
        ),
        completeAvailability: t("appointments.messages.completeAvailability"),
        selectAtLeastOneSlot: t("appointments.messages.selectAtLeastOneSlot"),
        cannotRemoveBookedSlot: t(
          "appointments.messages.cannotRemoveBookedSlot",
        ),
        saveError: t("appointments.messages.saveError"),
        savedSuccessfully: t("appointments.messages.savedSuccessfully"),

        workingHoursTitle: t("appointments.workingHours.title"),
        workingHoursDescription: t("appointments.workingHours.description"),
        startTime: t("appointments.workingHours.startTime"),
        endTime: t("appointments.workingHours.endTime"),
        timeSlotsInfo: t("appointments.workingHours.timeSlotsInfo"),

        sessionDurationTitle: t("appointments.sessionDuration.title"),
        sessionDurationDescription: t(
          "appointments.sessionDuration.description",
        ),
        duration: t("appointments.sessionDuration.duration"),
        minutes: t("appointments.sessionDuration.minutes"),

        availableTimeSlotsTitle: t("appointments.availableTimeSlots.title"),
        availableTimeSlotsDescription: t(
          "appointments.availableTimeSlots.description",
        ),
        selected: t("appointments.availableTimeSlots.selected"),
        available: t("appointments.availableTimeSlots.available"),
        booked: t("appointments.availableTimeSlots.booked"),
        disabled: t("appointments.availableTimeSlots.disabled"),
        noTimeSlots: t("appointments.availableTimeSlots.noTimeSlots"),
        adjustWorkingHours: t(
          "appointments.availableTimeSlots.adjustWorkingHours",
        ),

        availabilitySummaryTitle: t("appointments.availabilitySummary.title"),
        workingHours: t("appointments.availabilitySummary.workingHours"),
        sessionDuration: t("appointments.availabilitySummary.sessionDuration"),
        availableSlots: t("appointments.availabilitySummary.availableSlots"),

        availabilityListNoAvailability: t(
          "appointments.availabilityList.noAvailability",
        ),
        availabilityListCreateFirst: t(
          "appointments.availabilityList.createFirst",
        ),
        slots: t("appointments.availabilityList.slots"),
        edit: t("appointments.actions.edit"),
      }}
    />
  );
}
