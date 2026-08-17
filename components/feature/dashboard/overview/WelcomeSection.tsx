import Link from "next/link";
import { redirect } from "next/navigation";

import { Button } from "@/components/ui/button";
import { auth } from "@/providers/auth/auth";

const WelcomeSection = async () => {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const username = session.user.name ?? "there";

  const hour = new Date().getHours();

  let greeting = "Good Morning";

  if (hour >= 12 && hour < 18) {
    greeting = "Good Afternoon";
  } else if (hour >= 18) {
    greeting = "Good Evening";
  }

  return (
    <section className="mb-8 flex flex-col justify-between gap-6 rounded-3xl bg-primary px-8 py-8 text-white lg:flex-row lg:items-center">
      <div>
        <p className="text-primary-foreground/80">
          Welcome back, {username} 👋
        </p>

        <h1 className="mt-2 text-4xl font-bold">
          {greeting}, {username}
        </h1>

        <p className="mt-4 max-w-xl text-primary-foreground/80">
          Continue your wellness journey, check your upcoming sessions, complete
          assessments and track your progress.
        </p>
      </div>

      <Button asChild variant="secondary" className="rounded-xl">
        <Link href="/dashboard/appointments/new">Book Appointment</Link>
      </Button>
    </section>
  );
};

export default WelcomeSection;
