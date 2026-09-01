// components/feature/auth/reset-password/reset-password.tsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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

import { resetPassword } from "@/app/actions/auth/reset-password";

const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

interface Props {
  token?: string;
  locale: "ar" | "en";
}

const ResetPasswordForm = ({ token, locale }: Props) => {
  const isArabic = locale === "ar";

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: ResetPasswordFormValues) => {
    setServerError("");

    if (!token) {
      setServerError(
        isArabic ? "رابط إعادة التعيين غير صالح." : "Invalid reset link.",
      );
      return;
    }

    try {
      const result = await resetPassword(token, values.password, locale);

      if (!result.success) {
        setServerError(result.message);
        return;
      }

      setSuccess(true);
    } catch (error) {
      console.error("RESET_PASSWORD_FORM_ERROR:", error);

      setServerError(
        isArabic
          ? "حدث خطأ ما. يرجى المحاولة مرة أخرى."
          : "Something went wrong. Please try again.",
      );
    }
  };

  if (!token) {
    return (
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>
            {isArabic ? "رابط إعادة التعيين غير صالح" : "Invalid reset link"}
          </CardTitle>

          <CardDescription>
            {isArabic
              ? "رابط إعادة تعيين كلمة المرور مفقود أو غير صالح."
              : "This password reset link is missing or invalid."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login/forgot-password">
              {isArabic
                ? "طلب رابط إعادة تعيين جديد"
                : "Request a new reset link"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (success) {
    return (
      <Card className="w-full max-w-md border-border/60 shadow-lg">
        <CardHeader className="text-center">
          <CardTitle>
            {isArabic
              ? "تم تغيير كلمة المرور بنجاح"
              : "Password reset successfully"}
          </CardTitle>

          <CardDescription>
            {isArabic
              ? "تم تحديث كلمة المرور الخاصة بك بنجاح."
              : "Your password has been updated successfully."}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Button asChild className="w-full">
            <Link href="/login">
              {isArabic ? "المتابعة إلى تسجيل الدخول" : "Continue to login"}
            </Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md border-border/60 shadow-lg">
      <CardHeader className="space-y-3 px-6 pt-6 sm:px-8 sm:pt-8">
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="w-fit text-muted-foreground"
        >
          <Link href="/login">
            <ArrowLeft
              className={`${isArabic ? "ml-2 rotate-180" : "mr-2"} h-4 w-4`}
            />

            {isArabic ? "العودة لتسجيل الدخول" : "Back to login"}
          </Link>
        </Button>

        <div>
          <CardTitle className="text-2xl font-bold sm:text-3xl">
            {isArabic ? "إعادة تعيين كلمة المرور" : "Reset your password"}
          </CardTitle>

          <CardDescription className="mt-2 leading-6">
            {isArabic
              ? "أدخل كلمة المرور الجديدة أدناه."
              : "Enter your new password below."}
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="px-6 pb-6 sm:px-8 sm:pb-8">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="password">
              {isArabic ? "كلمة المرور الجديدة" : "New password"}
            </Label>

            <div className="relative">
              <Lock
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? "right-3" : "left-3"
                }`}
              />

              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                className="h-11 pl-10 pr-10"
                {...register("password")}
              />

              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? "left-3" : "right-3"
                }`}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.password && (
              <p className="text-sm text-destructive">
                {isArabic
                  ? "يجب أن تتكون كلمة المرور من 8 أحرف على الأقل."
                  : errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {isArabic ? "تأكيد كلمة المرور الجديدة" : "Confirm new password"}
            </Label>

            <div className="relative">
              <Lock
                className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? "right-3" : "left-3"
                }`}
              />

              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                className="h-11 pl-10 pr-10"
                {...register("confirmPassword")}
              />

              <button
                type="button"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
                className={`absolute top-1/2 -translate-y-1/2 text-muted-foreground ${
                  isArabic ? "left-3" : "right-3"
                }`}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </button>
            </div>

            {errors.confirmPassword && (
              <p className="text-sm text-destructive">
                {isArabic
                  ? "كلمتا المرور غير متطابقتين."
                  : errors.confirmPassword.message}
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
                {isArabic
                  ? "جارٍ تغيير كلمة المرور..."
                  : "Resetting password..."}
              </>
            ) : (
              <>{isArabic ? "إعادة تعيين كلمة المرور" : "Reset password"}</>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ResetPasswordForm;
