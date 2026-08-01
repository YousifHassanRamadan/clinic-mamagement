import TestimonialsGrid from "./testimonials-grid/testimonials-grid";
import TestimonialsHeader from "./testimonials-header/testimonials-header";

const TestimonialsSection = () => {
  return (
    <section className="py-28">
      <TestimonialsHeader />

      <TestimonialsGrid />
    </section>
  );
};

export default TestimonialsSection;
