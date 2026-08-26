// components/feature/home/hero-section/hero-btns/hero-btns.tsx

"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

interface HeroBtnsProps {
  translations: {
    bookAppointment: string;
    meetDoctor: string;
  };
}

const HeroBtns = ({ translations }: HeroBtnsProps) => {
  const router = useRouter();

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <div className="flex flex-wrap items-center gap-3 sm:gap-5">
      <Button
        onClick={handleLogin}
        className="flex items-center gap-2 sm:gap-3"
      >
        {translations.bookAppointment}

        <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
      </Button>

      <Button onClick={handleLogin} variant="outline" className="bg-background">
        {translations.meetDoctor}
      </Button>
    </div>
  );
};

export default HeroBtns;
