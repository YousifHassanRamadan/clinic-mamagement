"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

import { verifyEmail } from "@/app/actions/auth/verify-email";

const VerifyEmailPage = () => {
  const searchParams = useSearchParams();

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  const [message, setMessage] = useState("");

  useEffect(() => {
    const verify = async () => {
      if (!token || !email) {
        setStatus("error");
        setMessage("Invalid verification link.");
        return;
      }

      const result = await verifyEmail(token, email);

      if (!result.success) {
        setStatus("error");
        setMessage(result.message);
        return;
      }

      if (result.verificationLoginToken) {
        const loginResult = await signIn("credentials", {
          verificationToken: result.verificationLoginToken,
          redirect: false,
        });

        if (loginResult?.ok) {
          window.location.href = "/dashboard";
          return;
        }
      }

      setStatus("success");
      setMessage(
        "Your email has been verified successfully. You can now log in.",
      );
    };

    verify();
  }, [token, email]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
          <div className="mb-4 text-4xl">⏳</div>

          <h1 className="mb-3 text-2xl font-bold">Verifying your email</h1>

          <p className="text-muted-foreground">
            Please wait while we verify your account...
          </p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
          <div className="mb-4 text-5xl">!</div>

          <h1 className="mb-3 text-2xl font-bold">Verification Failed</h1>

          <p className="mb-6 text-muted-foreground">{message}</p>

          <a
            href="/login"
            className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border bg-background p-8 text-center shadow-sm">
        <div className="mb-4 text-5xl">✓</div>

        <h1 className="mb-3 text-2xl font-bold">Email Verified</h1>

        <p className="mb-6 text-muted-foreground">{message}</p>

        <a
          href="/login"
          className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-medium text-primary-foreground"
        >
          Go to Login
        </a>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
