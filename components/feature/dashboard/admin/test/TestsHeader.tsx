import CreateTestAction from "./CreateTestAction";
import type { TestFormTranslations } from "./TestFormDialog";

interface Props {
  translations: {
    eyebrow: string;
    title: string;
    description: string;
    createTest: string;
    form: TestFormTranslations;
  };
}

const TestsHeader = ({ translations }: Props) => {
  return (
    <header className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          {translations.eyebrow}
        </p>

        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          {translations.title}
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          {translations.description}
        </p>
      </div>

      <CreateTestAction
        buttonText={translations.createTest}
        translations={{
          form: translations.form,
        }}
      />
    </header>
  );
};

export default TestsHeader;
