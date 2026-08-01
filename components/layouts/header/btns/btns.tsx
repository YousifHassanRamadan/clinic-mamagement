import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const ButtonsSection = () => {
  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        className={cn(
          "hover:bg-primary/10 transform duration-300 hover:text-primary",
        )}
      >
        <Link href="/login">Sign in</Link>
      </Button>
      <Button>Book Session</Button>
    </div>
  );
};

export default ButtonsSection;
