import { testimonials } from "@/constants/home/home";
import TestimonialCard from "../testimonial-card/testimonial-card";

const TestimonialsGrid = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {testimonials.map((item) => (
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
