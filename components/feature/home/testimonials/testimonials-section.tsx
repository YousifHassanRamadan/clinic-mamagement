// components/feature/home/testimonials/testimonials-section.tsx

import TestimonialsGrid from "./testimonials-grid/testimonials-grid";
import TestimonialsHeader from "./testimonials-header/testimonials-header";

interface TestimonialsTranslations {
  header: {
    title: string;
  };

  testimonials: {
    marcus: {
      name: string;
      role: string;
      review: string;
    };
    priya: {
      name: string;
      role: string;
      review: string;
    };
    elenaTom: {
      name: string;
      role: string;
      review: string;
    };
  };
}

interface Props {
  translations: TestimonialsTranslations;
}

const TestimonialsSection = ({ translations }: Props) => {
  return (
    <section className="py-28">
      <TestimonialsHeader title={translations.header.title} />

      <TestimonialsGrid translations={translations.testimonials} />
    </section>
  );
};

export default TestimonialsSection;
