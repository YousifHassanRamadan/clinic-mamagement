// components/feature/home/psychological-tests/tests-grid/tests-grid.tsx

import TestCard from "../test-card/test-card";

interface TestTranslation {
  category: string;
  duration: string;
  title: string;
  description: string;
  questions: string;
}

interface TestsGridProps {
  translations: {
    paranoidThinking: TestTranslation;
    obsessiveCompulsive: TestTranslation;
    depression: TestTranslation;
    anxiety: TestTranslation;
  };
}

const TestsGrid = ({ translations }: TestsGridProps) => {
  const tests = [
    {
      id: "paranoidThinking",
      ...translations.paranoidThinking,
    },
    {
      id: "obsessiveCompulsive",
      ...translations.obsessiveCompulsive,
    },
    {
      id: "depression",
      ...translations.depression,
    },
    {
      id: "anxiety",
      ...translations.anxiety,
    },
  ];

  return (
    <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-4">
      {tests.map((test) => (
        <TestCard
          key={test.id}
          category={test.category}
          duration={test.duration}
          title={test.title}
          description={test.description}
          questions={test.questions}
        />
      ))}
    </div>
  );
};

export default TestsGrid;
