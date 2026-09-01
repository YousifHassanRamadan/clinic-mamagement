// app/login/reset-password/page.tsx

import { cookies } from "next/headers";

import ResetPasswordForm from "@/components/feature/auth/reset-password/reset-password";

interface Props {
  searchParams: Promise<{
    token?: string;
  }>;
}

const ResetPasswordPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value === "ar" ? "ar" : "en";

  return (
    <main
      className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8 sm:px-6"
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <ResetPasswordForm token={params.token} locale={locale} />
    </main>
  );
};

export default ResetPasswordPage;
