// components/feature/auth/AuthCard.tsx

"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Card } from "@/components/ui/card";

import AuthTabs from "./AuthTabs";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";

interface AuthCardProps {
  translations: {
    login: {
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

    register: {
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

    tabs: {
      login: string;
      register: string;
    };
  };
}

const AuthCard = ({ translations }: AuthCardProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <Card className="rounded-3xl border-border p-8 shadow-lg sm:p-10">
      <AuthTabs
        mode={mode}
        setMode={setMode}
        translations={translations.tabs}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          {mode === "login" ? (
            <LoginForm setMode={setMode} translations={translations.login} />
          ) : (
            <RegisterForm
              setMode={setMode}
              translations={translations.register}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default AuthCard;
