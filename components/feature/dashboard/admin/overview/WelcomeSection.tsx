// WelcomeSection.tsx

"use client";

import { CalendarPlus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface Props {
  userName: string;

  translations: {
    greeting: string;
    description: string;
    newSession: string;
  };
}

const WelcomeSection = ({ userName, translations }: Props) => {
  const [today, setToday] = useState("");

  useEffect(() => {
    const getLocaleFromCookie = () => {
      return (
        document.cookie
          .split("; ")
          .find((row) => row.startsWith("locale="))
          ?.split("=")[1] || "en"
      );
    };

    const updateDate = () => {
      const locale = getLocaleFromCookie();

      const language = locale === "ar" ? "ar-EG-u-nu-latn" : "en-US";

      setToday(
        new Intl.DateTimeFormat(language, {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        }).format(new Date()),
      );
    };

    updateDate();

    const interval = setInterval(() => {
      updateDate();
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p
          dir="auto"
          className="text-sm font-medium tracking-widest text-primary"
        >
          {today}
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          {translations.greeting.replace("{name}", userName)}
        </h1>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button asChild className="rounded-xl">
          <Link
            href="/dashboard/admin/sessions/"
            className="flex items-center gap-1"
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            {translations.newSession}
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default WelcomeSection;
