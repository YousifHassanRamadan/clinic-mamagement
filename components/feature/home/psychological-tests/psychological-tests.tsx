// components/feature/home/psychological-tests/psychological-tests.tsx

import PsychologicalTestsHeader from "./psychological-tests-header/psychological-tests-header";
import TestsGrid from "./tests-grid/tests-grid";

interface PsychologicalTestsProps {
  translations: {
    header: {
      eyebrow: string;
      title: string;
      description: string;
      openLibrary: string;
    };

    tests: {
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
  };
}

const PsychologicalTests = ({ translations }: PsychologicalTestsProps) => {
  return (
    <section className="py-28">
      <PsychologicalTestsHeader translations={translations.header} />

      <TestsGrid translations={translations.tests} />
    </section>
  );
};

export default PsychologicalTests;
