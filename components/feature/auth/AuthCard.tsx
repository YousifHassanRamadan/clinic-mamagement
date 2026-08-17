"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Card } from "@/components/ui/card";

import AuthTabs from "./AuthTabs";
import LoginForm from "./login/LoginForm";
import RegisterForm from "./register/RegisterForm";

const AuthCard = () => {
  const [mode, setMode] = useState<"login" | "register">("login");

  return (
    <Card className="rounded-3xl border-border p-8 shadow-lg sm:p-10">
      <AuthTabs mode={mode} setMode={setMode} />

      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="mt-8"
        >
          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </motion.div>
      </AnimatePresence>
    </Card>
  );
};

export default AuthCard;
