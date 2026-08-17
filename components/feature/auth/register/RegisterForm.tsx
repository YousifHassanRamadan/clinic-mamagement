"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import GoogleButton from "../login/GoogleButton";
import PasswordInput from "@/components/common/password-input/PasswordInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fields } from "@/constants/auth/auth";
import { registerUser } from "@/app/actions/auth/register";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const registerSchema = z
  .object({
    firstName: z.string().min(2, "First name is required"),
    lastName: z.string().min(2, "Last name is required"),
    address: z.string().min(2, "address is required"),
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

const RegisterForm = () => {
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
        toast.error("Account created, but automatic login failed.");
        return;
      }

      toast.success("Account created successfully!");

      router.push("/dashboard");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
      <div>
        <h2 className="text-3xl font-bold">Create account</h2>
      </div>

      {fields.map((field) => (
        <div key={field.name}>
          {" "}
          {field.type === "password" ? (
            <PasswordInput
              {...register(field.name)}
              placeholder={field.placeholder}
            />
          ) : field.type === "select" ? (
            <select
              {...register(field.name)}
              className="h-11 w-full rounded-xl border bg-background px-3"
            >
              {" "}
              <option value="">Select Gender</option>{" "}
              {field.options?.map((option) => (
                <option key={option.value} value={option.value}>
                  {" "}
                  {option.label}{" "}
                </option>
              ))}{" "}
            </select>
          ) : (
            <Input
              {...register(field.name)}
              type={field.type}
              placeholder={field.placeholder}
              className="h-11 rounded-xl p-3"
            />
          )}{" "}
          {errors[field.name] && (
            <p className="mt-1 text-sm text-destructive">
              {" "}
              {errors[field.name]?.message}{" "}
            </p>
          )}{" "}
        </div>
      ))}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl"
      >
        {isSubmitting ? "Creating account..." : "Create Account"}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>

      <GoogleButton />

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link href="#" className="font-medium text-primary">
          Login
        </Link>
      </p>
    </form>
  );
};
export default RegisterForm;
