// components/feature/home/testimonials/testimonial-card/testimonial-card.tsx

import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface Props {
  review: string;
  name: string;
  role: string;
}

const TestimonialCard = ({ review, name, role }: Props) => {
  return (
    <Card className="block rounded-3xl border-border p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <Quote className="mb-4 h-8 w-8 text-primary/40" strokeWidth={1.5} />

      <p className="leading-7 text-muted-foreground">{review}</p>

      <div className="mt-6 flex items-end justify-between">
        <div>
          <h4 className="font-semibold">{name}</h4>

          <p className="text-sm text-muted-foreground">{role}</p>
        </div>

        <div className="flex gap-1">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              className="h-4 w-4 fill-yellow-400 text-yellow-400"
            />
          ))}
        </div>
      </div>
    </Card>
  );
};

export default TestimonialCard;
