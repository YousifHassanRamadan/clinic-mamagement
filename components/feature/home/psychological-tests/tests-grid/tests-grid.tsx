import { tests } from "@/constants/home/home";
import TestCard from "../test-card/test-card";

const TestsGrid = () => {
  return (
    <div className="mt-14 grid gap-8 lg:grid-cols-3">
      {tests.map((test) => (
        <TestCard key={test.title} {...test} />
      ))}
    </div>
  );
};

export default TestsGrid;
