// components/feature/home/psychological-tests/psychological-tests-header/psychological-tests-header.tsx

import { Button } from "@/components/ui/button";

interface PsychologicalTestsHeaderProps {
  translations: {
    eyebrow: string;
    title: string;
    description: string;
    openLibrary: string;
  };
}

const PsychologicalTestsHeader = ({
  translations,
}: PsychologicalTestsHeaderProps) => {
  return (
    <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
      <div className="max-w-3xl">
        <span className="text-sm font-semibold uppercase tracking-[0.3em] text-primary">
          {translations.eyebrow}
        </span>

        <h2 className="mt-4 text-3xl font-bold leading-tight">
          {translations.title}
        </h2>

        <p className="mt-2 max-w-2xl leading-8 text-muted-foreground">
          {translations.description}
        </p>
      </div>

      {/* <Button variant="outline" className="rounded-full">
        {translations.openLibrary}
      </Button> */}
    </div>
  );
};

export default PsychologicalTestsHeader;
