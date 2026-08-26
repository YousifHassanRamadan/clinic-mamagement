// components/feature/auth/Testimonial.tsx

import { Quote } from "lucide-react";

interface TestimonialProps {
  quote: string;
  author: string;
  subtitle: string;
}

const Testimonial = ({ quote, author, subtitle }: TestimonialProps) => {
  return (
    <div className="max-w-md">
      <Quote className="mb-6 h-10 w-10 text-white/70" />

      <p className="text-4xl leading-relaxed font-semibold text-white">
        "{quote}"
      </p>

      <div className="mt-8">
        <p className="font-semibold text-white">{author}</p>

        <p className="text-sm text-white/70">{subtitle}</p>
      </div>
    </div>
  );
};

export default Testimonial;
