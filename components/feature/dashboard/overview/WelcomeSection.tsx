// components/feature/dashboard/overview/WelcomeSection.tsx

import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/providers/auth/auth";
import { getTranslations } from "@/i18n/getTranslations";

const WelcomeSection = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const t = await getTranslations(locale);

  const username = session.user.name ?? t("user.there");

  const hour = new Date().getHours();

  let greetingKey = "greetings.goodMorning";

  if (hour >= 12 && hour < 18) {
    greetingKey = "greetings.goodAfternoon";
  } else if (hour >= 18) {
    greetingKey = "greetings.goodEvening";
  }

  return (
    <section className="mb-8 flex flex-col justify-between gap-6 rounded-3xl bg-primary px-8 py-8 text-white lg:flex-row lg:items-center">
      <div>
        <p className="text-primary-foreground/80">
          {t("welcome.back", { username })} 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          {t(greetingKey)}, {username}
        </h1>

        <p className="mt-4 max-w-xl text-primary-foreground/80">
          {t("welcome.description")}
        </p>
      </div>

      <Button asChild variant="secondary" className="rounded-xl">
        <Link href="/dashboard/patient/appointments/new">
          {t("appointment.book")}
        </Link>
      </Button>
    </section>
  );
};

export default WelcomeSection;
