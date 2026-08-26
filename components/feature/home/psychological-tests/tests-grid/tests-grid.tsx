// components/feature/home/psychological-tests/tests-grid/tests-grid.tsx

import TestCard from "../test-card/test-card";

interface TestsGridProps {
  translations: {
    anxiety: {
      category: string;
      duration: string;
      title: string;
      description: string;
      questions: string;
    };
    mood: {
      category: string;
      duration: string;
      title: string;
      description: string;
      questions: string;
    };
    stress: {
      category: string;
      duration: string;
      title: string;
      description: string;
      questions: string;
    };
  };
}

const TestsGrid = ({ translations }: TestsGridProps) => {
  const tests = [
    {
      id: "anxiety",
      ...translations.anxiety,
    },
    {
      id: "mood",
      ...translations.mood,
    },
    {
      id: "stress",
      ...translations.stress,
    },
  ];

  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-3">
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
