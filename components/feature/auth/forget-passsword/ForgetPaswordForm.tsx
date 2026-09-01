// components/feature/auth/forget-passsword/ForgetPaswordForm.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Mail, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { forgotPassword } from "@/app/actions/auth/forget-password";

const forgotPasswordSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

const ForgotPasswordForm = () => {
  const params = useParams();

  const locale = typeof params?.locale === "string" ? params.locale : "en";

  const isArabic = locale === "ar";

  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: ForgotPasswordFormValues) => {
    setServerError("");
    setSuccess(false);

    try {
      const result = await forgotPassword(values.email, locale);

      if (!result.success) {
        setServerError(result.message);
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error("FORGOT_PASSWORD_FORM_ERROR:", error);

      setServerError(
        isArabic
          ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (success) {
    return (
      <Card
        dir={isArabic ? "rtl" : "ltr"}
        className="w-full max-w-md border-border/60 shadow-lg"
      >
        <CardContent className="flex flex-col items-center px-6 py-10 text-center sm:px-8">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-7 w-7 text-primary" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight">
            {isArabic ? "تحقق من بريدك الإلكتروني" : "Check your email"}
          </h2>

          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            {isArabic
              ? "إذا كان هناك حساب مرتبط بهذا البريد الإلكتروني، فقد أرسلنا لك رابطًا لإعادة تعيين كلمة المرور."
              : "If an account exists with that email, we've sent you a password reset link."}
          </p>

          <Button asChild className="mt-6 w-full">
            <Link href={`/${locale}/login`}>
              {isArabic ? "العودة لتسجيل الدخول" : "Back to login"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      dir={isArabic ? "rtl" : "ltr"}
      className="w-full max-w-md border-border/60 shadow-lg"
    >
      <CardHeader className="space-y-3 px-6 pt-6 sm:px-8 sm:pt-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit text-muted-foreground"
        >
          <Link href={`/${locale}/login`}>
            <ArrowLeft
              className={`${isArabic ? "ml-2 rotate-180" : "mr-2"} h-4 w-4`}
            />

            {isArabic ? "العودة لتسجيل الدخول" : "Back to login"}
          </Link>
        </Button>

        <div>
          <CardTitle className="text-2xl font-bold sm:text-3xl">
            {isArabic ? "نسيت كلمة المرور؟" : "Forgot password?"}
          </CardTitle>

          <CardDescription className="mt-2 text-sm leading-6">
            {isArabic
              ? "أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور."
              : "Enter your email address and we'll send you a link to reset your password."}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">
              {isArabic ? "البريد الإلكتروني" : "Email address"}
            </Label>

            <div className="relative">
              <Mail
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? "right-3" : "left-3"
                }`}
              />

              <Input
                id="email"
                type="email"
                placeholder={isArabic ? "you@example.com" : "you@example.com"}
                autoComplete="email"
                className={`h-11 ${isArabic ? "pr-10" : "pl-10"}`}
                {...register("email")}
              />
            </div>

            {errors.email && (
              <p className="text-sm text-destructive">
                {isArabic
                  ? "يرجى إدخال بريد إلكتروني صالح."
                  : errors.email.message}
              </p>
            )}
          </div>

          {serverError && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {serverError}
            </div>
          )}

          <Button type="submit" disabled={isSubmitting} className="h-11 w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />

                {isArabic ? "جارٍ الإرسال..." : "Sending..."}
              </>
            ) : (
              <>{isArabic ? "إرسال رابط إعادة التعيين" : "Send reset link"}</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ForgotPasswordForm;
