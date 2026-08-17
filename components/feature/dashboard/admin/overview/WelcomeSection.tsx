"use client";

import { CalendarPlus, FileBarChart2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Props {
  userName: string;
}

const WelcomeSection = ({ userName }: Props) => {
  return (
    <section className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-sm font-medium uppercase tracking-widest text-primary">
          Tuesday • 28 July 2026
        </p>

        <h1 className="mt-2 text-4xl font-bold tracking-tight">
          Good morning, Dr. {userName}
        </h1>

        <p className="mt-3 max-w-2xl text-muted-foreground">
          Six sessions this week, two assessments awaiting review, and one
          patient flagged for weekly safety check-in.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button className="rounded-xl">
          <Link
            href={"/dashboard/admin/sessions/"}
            className="flex  items-center gap-1"
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            New Session
          </Link>
        </Button>
      </div>
    </section>
  );
};

export default WelcomeSection;
