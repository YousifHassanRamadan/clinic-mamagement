import { Button } from "@/components/ui/button";
import React from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const HeroBtns = () => {
  return (
    <div className="flex items-center gap-5">
      <Button className="flex items-center gap-3">
        Book your appointment <ArrowRight />
      </Button>
      <Button variant="outline" className="bg-background">
        Meet with Dr. Lindqvist
      </Button>
    </div>
  );
};

export default HeroBtns;
