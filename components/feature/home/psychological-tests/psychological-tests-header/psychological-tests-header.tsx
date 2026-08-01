import { Button } from "@/components/ui/button";

const PsychologicalTestsHeader = () => {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          Psychological Tests
        </span>

        <h2 className="mt-4 text-3xl font-bold leading-tight">
          Validated assessments,
          <br />
          plain-language results
        </h2>

        <p className="mt-2 max-w-2xl leading-8 text-muted-foreground">
          Take a screening from your portal in minutes. Every result is reviewed
          with your doctor before conclusions are drawn.
        </p>
      </div>

      <Button variant="outline" className="rounded-full">
        Open the test library
      </Button>
    </div>
  );
};

export default PsychologicalTestsHeader;
