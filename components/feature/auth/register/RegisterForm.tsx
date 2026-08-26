// components/feature/auth/register/RegisterForm.tsx

"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import PasswordInput from "@/components/common/password-input/PasswordInput";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerUser } from "@/app/actions/auth/register";

import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address: z.string().min(2, "Address is required"),
    email: z.email("Please enter a valid email"),
    gender: z.enum(["MALE", "FEMALE"]),
    phone: z.string().min(10, "Please enter a valid phone number"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  setMode: (mode: "login" | "register") => void;
  translations: {
    title: string;
    firstName: string;
    lastName: string;
    address: string;
    email: string;
    gender: string;
    male: string;
    female: string;
    phone: string;
    password: string;
    confirmPassword: string;
    createAccount: string;
    creatingAccount: string;
    or: string;
    alreadyAccount: string;
    login: string;
    success: string;
    error: string;
    automaticLoginFailed: string;
  };
}

const RegisterForm = ({ setMode, translations }: RegisterFormProps) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const handleRegister = async (data: RegisterFormData) => {
    try {
      const result = await registerUser(data);

      if (!result.success) {
        toast.error(result.message);
        return;
      }

      const loginResult = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (!loginResult?.ok) {
        toast.error(translations.automaticLoginFailed);
        return;
      }

      toast.success(translations.success);

      router.push("/dashboard");
    } catch {
      toast.error(translations.error);
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
      <div>
        <h2 className="text-3xl font-bold">{translations.title}</h2>
      </div>

      <Input
        {...register("firstName")}
        placeholder={translations.firstName}
        className="h-11 rounded-xl p-3"
      />

      {errors.firstName && (
        <p className="text-sm text-destructive">{errors.firstName.message}</p>
      )}

      <Input
        {...register("lastName")}
        placeholder={translations.lastName}
        className="h-11 rounded-xl p-3"
      />

      {errors.lastName && (
        <p className="text-sm text-destructive">{errors.lastName.message}</p>
      )}

      <Input
        {...register("address")}
        placeholder={translations.address}
        className="h-11 rounded-xl p-3"
      />

      {errors.address && (
        <p className="text-sm text-destructive">{errors.address.message}</p>
      )}

      <Input
        {...register("email")}
        type="email"
        placeholder={translations.email}
        className="h-11 rounded-xl p-3"
      />

      {errors.email && (
        <p className="text-sm text-destructive">{errors.email.message}</p>
      )}

      <select
        {...register("gender")}
        className="h-11 w-full appearance-none rounded-xl border border-border bg-background px-4 pe-10 text-sm shadow-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        <option value="">{translations.gender}</option>

        <option value="MALE">{translations.male}</option>

        <option value="FEMALE">{translations.female}</option>
      </select>

      {errors.gender && (
        <p className="text-sm text-destructive">{errors.gender.message}</p>
      )}

      <Input
        {...register("phone")}
        type="tel"
        placeholder={translations.phone}
        className="h-11 rounded-xl p-3"
      />

      {errors.phone && (
        <p className="text-sm text-destructive">{errors.phone.message}</p>
      )}

      <PasswordInput
        {...register("password")}
        placeholder={translations.password}
      />

      {errors.password && (
        <p className="text-sm text-destructive">{errors.password.message}</p>
      )}

      <PasswordInput
        {...register("confirmPassword")}
        placeholder={translations.confirmPassword}
      />

      {errors.confirmPassword && (
        <p className="text-sm text-destructive">
          {errors.confirmPassword.message}
        </p>
      )}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl"
      >
        {isSubmitting
          ? translations.creatingAccount
          : translations.createAccount}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />

        <span className="text-xs text-muted-foreground">{translations.or}</span>

        <Separator className="flex-1" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        {translations.alreadyAccount}{" "}
        <button
          type="button"
          onClick={() => setMode("login")}
          className="font-medium text-primary hover:underline"
        >
          {translations.login}
        </button>
      </p>
    </form>
  );
};

export default RegisterForm;
