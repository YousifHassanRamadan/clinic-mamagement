// components/feature/home/hero-section/chip-work-time/chip-work-time.tsx

import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { cn } from "@/lib/utils";
import React from "react";

import { Shield } from "lucide-react";

interface ChipWorkTimeProps {
  translations: string;
}

const ChipWorkTime = ({ translations }: ChipWorkTimeProps) => {
  return (
    <Bubble variant="popover">
      <BubbleContent className={cn("flex items-center gap-2 py-1.5 text-xs")}>
        <Shield className="h-4 w-4 shrink-0 text-primary" />

        {translations}
      </BubbleContent>
    </Bubble>
  );
};

export default ChipWorkTime;
