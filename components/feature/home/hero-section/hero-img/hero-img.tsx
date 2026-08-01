import React from "react";
import Image from "next/image";
import heroImg from "@/assets/Serene-Mind-Clinic/imgi_1_clinic-hero-BuhEzBK7.jpg";
import { Bubble, BubbleContent } from "@/components/ui/bubble";
import { Calendar1 } from "lucide-react";

const HeroImg = () => {
  return (
    <div className="relative h-[550px] w-[550px] ">
      <Image
        src={heroImg}
        alt="Hero Image"
        className="rounded-3xl object-cover"
      />
      <Bubble className="absolute bottom-1/6 left-5" variant={"popover"}>
        <BubbleContent>
          <div className="flex items-center  gap-2">
            <Calendar1 className="text-primary text-sm" />
            <p className="text-sm text-foreground font-semibold">
              Next opening
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">
              Saturday 09:00 · On-site or <br />
              Google Meet
            </p>
          </div>
        </BubbleContent>
      </Bubble>
    </div>
  );
};

export default HeroImg;
