import { testimonial } from "@/constants/auth/auth";
import { Quote } from "lucide-react";

const Testimonial = () => {
  return (
    <div className="max-w-md">
      <Quote className="mb-6 h-10 w-10 text-white/70" />

      <p className="text-4xl leading-relaxed font-semibold text-white">
        "{testimonial.quote}"
      </p>

      <div className="mt-8">
        <p className="font-semibold text-white">{testimonial.author}</p>

        <p className="text-sm text-white/70">{testimonial.subtitle}</p>
      </div>
    </div>
  );
};

export default Testimonial;
