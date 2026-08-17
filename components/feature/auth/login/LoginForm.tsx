"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

import GoogleButton from "./GoogleButton";
import RememberMe from "./RememberMe";
import PasswordInput from "@/components/common/password-input/PasswordInput";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const loginSchema = z.object({
  email: z.email("Please enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const handleLogin = async (data: LoginFormData) => {
    try {
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error("Invalid email or password.");
        return;
      }

      toast.success("Logged in successfully!");

      router.push("/dashboard");
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
      <div>
        <h2 className="text-3xl font-bold">Welcome back</h2>

        <p className="mt-2 text-muted-foreground">Login to your account</p>
      </div>

      <div className="space-y-5">
        <Input
          {...register("email")}
          placeholder="Email"
          type="email"
          className="h-11 rounded-xl p-3"
        />

        {errors.email && (
          <p className="mt-1 text-sm text-destructive">
            {errors.email.message}
          </p>
        )}

        <PasswordInput {...register("password")} placeholder="Password" />

        {errors.password && (
          <p className="mt-1 text-sm text-destructive">
            {errors.password.message}
          </p>
        )}
      </div>

      <RememberMe />

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-11 w-full rounded-xl"
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-xs text-muted-foreground">OR</span>
        <Separator className="flex-1" />
      </div>

      <GoogleButton />

      <p className="text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="#" className="font-medium text-primary">
          Sign Up
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
