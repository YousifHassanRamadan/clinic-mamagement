import { Button } from "@/components/ui/button";
import { doctor } from "@/constants/home/home";

import { ArrowRight } from "lucide-react";

const DoctorInfo = () => {
  return (
    <div className="flex flex-col justify-center">
      <span className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
        Clinical Psychologist
      </span>

      <h1 className="text-4xl font-bold tracking-tight lg:text-5xl">
        {doctor.name}
      </h1>

      <p className="mt-3 text-muted-foreground">{doctor.credentials}</p>

      <p className="mt-8 max-w-2xl leading-8 text-muted-foreground">
        {doctor.description}
      </p>

      <div className="mt-10 flex flex-wrap gap-4">
        <Button size="lg" className="rounded-full px-8">
          Book a session
        </Button>

        <Button variant="outline" size="lg" className="rounded-full px-8">
          Contact the clinic
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DoctorInfo;
