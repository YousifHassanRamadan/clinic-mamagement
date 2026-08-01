import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { specialties } from "@/constants/home/home";

const Breif = () => {
  return (
    <div className="max-w-2xl">
      {/* Badge */}
      <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-primary">
        Your Psychologist
      </p>

      {/* Name */}
      <h2 className="text-5xl font-bold text-foreground">
        Dr. Amara Lindqvist
      </h2>

      {/* Subtitle */}
      <p className="mt-3 text-lg text-muted-foreground">
        Clinical Psychologist, PhD • PSY-48219 • California Board of Psychology
      </p>

      {/* Description */}
      <p className="mt-8 text-md leading-8 text-muted-foreground">
        For 14 years I have helped adults and adolescents move through anxiety,
        burnout, trauma and relationship strain. My work blends CBT, ACT and
        Schema Therapy with one simple belief: therapy should feel safe before
        it feels challenging.
      </p>

      {/* Specialties */}
      <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-5">
        {specialties.map((item) => (
          <div key={item} className="flex items-center gap-3">
            <CheckCircle2 className="h-5 w-5 text-success" />
            <span className="text-sm text-foreground">{item}</span>
          </div>
        ))}
      </div>

      {/* Button */}
      <Button
        variant="outline"
        className="mt-10 rounded-lg px-7 py-6 text-base"
      >
        Full profile & certificates
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );
};

export default Breif;
