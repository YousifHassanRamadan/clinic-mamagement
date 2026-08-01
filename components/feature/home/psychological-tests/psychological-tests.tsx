import PsychologicalTestsHeader from "./psychological-tests-header/psychological-tests-header";
import TestsGrid from "./tests-grid/tests-grid";

const PsychologicalTests = () => {
  return (
    <section className="py-28">
      <PsychologicalTestsHeader />

      <TestsGrid />
    </section>
  );
};

export default PsychologicalTests;
