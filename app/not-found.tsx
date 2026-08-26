import Link from "next/link";
import { Home, SearchX } from "lucide-react";
import { cookies } from "next/headers";
import GoBackButton from "@/components/common/go-back-btn/go-back-btn";

const NotFoundPage = async () => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value || "en";

  const isArabic = locale === "ar";

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-lg text-center">
        <div className="relative mx-auto mb-8 flex h-28 w-28 items-center justify-center rounded-3xl border bg-muted/40 shadow-sm">
          <div className="absolute inset-0 rounded-3xl bg-primary/5 blur-xl" />

          <SearchX
            className="relative h-14 w-14 text-primary"
            strokeWidth={1.5}
          />
        </div>

        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
          404 Error
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-base leading-7 text-muted-foreground">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved, deleted, or the URL might be incorrect.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-sm font-medium text-primary-foreground shadow-sm transition-all hover:bg-primary/90 hover:shadow-md"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>

          <GoBackButton isArabic={isArabic} />
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
