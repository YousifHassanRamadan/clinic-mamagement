// components/feature/home/testimonials/testimonials-grid/testimonials-grid.tsx

import { testimonials } from "@/constants/home/home";
import TestimonialCard from "../testimonial-card/testimonial-card";

interface TestimonialTranslation {
  name: string;
  role: string;
  review: string;
}

interface Props {
  translations: {
    marcus: TestimonialTranslation;
    priya: TestimonialTranslation;
    elenaTom: TestimonialTranslation;
  };
}

const TestimonialsGrid = ({ translations }: Props) => {
  const translatedTestimonials = [
    {
      ...testimonials[0],
      ...translations.marcus,
    },
    {
      ...testimonials[1],
      ...translations.priya,
    },
    {
      ...testimonials[2],
      ...translations.elenaTom,
    },
  ];

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {translatedTestimonials.map((item) => (
        <TestimonialCard
          key={item.id}
          review={item.review}
          name={item.name}
          role={item.role}
        />
      ))}
    </div>
  );
};

export default TestimonialsGrid;
