import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { cn } from "@/lib/utils";
import React from "react";

import { Shield } from "lucide-react";

const ChipWorkTime = () => {
  return (
    <Bubble variant={"popover"}>
      <BubbleContent className={cn("text-xs flex items-center gap-2 py-1.5")}>
        <Shield className="h-4 w-4 text-primary" />
        Licensed clinical psychology · Sunday – Thursday · 9:00 Am – 5:00 Pm
      </BubbleContent>
    </Bubble>
  );
};

export default ChipWorkTime;
