import CreateTestAction from "./CreateTestAction";

const TestsHeader = () => {
  return (
    <header className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
          Assessments
        </p>

        <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
          Psychological tests
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
          Manage your clinical assessments, questions, scoring and patient
          completion data.
        </p>
      </div>

      <CreateTestAction />
    </header>
  );
};

export default TestsHeader;
