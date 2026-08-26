import ResetPasswordForm from "@/components/feature/auth/reset-password/reset-password";

interface Props {
  searchParams: Promise<{
    token?: string;
  }>;
}

const ResetPasswordPage = async ({ searchParams }: Props) => {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-8 sm:px-6">
      <ResetPasswordForm token={params.token} />
    </main>
  );
};

export default ResetPasswordPage;
