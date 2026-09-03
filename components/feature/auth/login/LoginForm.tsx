"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import PasswordInput from "@/components/common/password-input/PasswordInput";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { toast } from "sonner";

interface LoginFormProps {
  setMode: (mode: "login" | "register") => void;
  translations: {
    title: string;
    description: string;
    email: string;
    password: string;
    forgotPassword: string;
    login: string;
    loggingIn: string;
    or: string;
    noAccount: string;
    signUp: string;
    invalidCredentials: string;
    success: string;
    error: string;
  };
}

const loginSchema = z.object({
  email: z.string().trim().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = ({ setMode, translations }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const email = data.email.trim().toLowerCase();
      const password = data.password;

      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (!result || result.error || result.ok !== true) {
        toast.error(translations.invalidCredentials);
        return;
      }

      if (!result.url) {
        toast.error(translations.invalidCredentials);
        return;
      }

      toast.success(translations.success);

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("LOGIN_ERROR:", error);

      toast.error(translations.error);
    }
  };

  return (
    <form noValidate className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
      <div>
        <h2 className="text-3xl font-bold">{translations.title}</h2>

        <p className="mt-2 text-muted-foreground">{translations.description}</p>
      </div>

      <div className="space-y-5">
        <Input
          {...register("email")}
          placeholder={translations.email}
          type="email"
          inputMode="email"
          autoComplete="email"
          dir="ltr"
          className="h-11 rounded-xl p-3"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}

        <div>
          <PasswordInput
            {...register("password")}
            placeholder={translations.password}
            autoComplete="current-password"
          />

          {errors.password && (
            <p className="mt-1 text-sm text-destructive">
              {errors.password.message}
            </p>
          )}

          <div
            className={`mt-2 flex ${
              translations.forgotPassword === "نسيت كلمة المرور؟"
                ? "justify-start"
                : "justify-end"
            }`}
            dir={
              translations.forgotPassword === "نسيت كلمة المرور؟"
                ? "rtl"
                : "ltr"
            }
          >
            <Link
              href="/login/forget-password"
              className="text-sm font-medium text-primary hover:underline"
            >
              {translations.forgotPassword}
            </Link>
          </div>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl"
      >
        {isSubmitting ? translations.loggingIn : translations.login}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />

        <span className="text-xs text-muted-foreground">{translations.or}</span>

        <Separator className="flex-1" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {translations.noAccount}{" "}
        <button
          type="button"
          onClick={() => setMode("register")}
          className="font-medium text-primary hover:underline"
        >
          {translations.signUp}
        </button>
      </p>
    </form>
  );
};

export default LoginForm;
