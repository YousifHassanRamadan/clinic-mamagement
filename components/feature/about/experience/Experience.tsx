import { experiences } from "@/constants/home/home";
import { BriefcaseBusiness } from "lucide-react";
import TimelineItem from "./timeline-item/TimelineItem";

const Experience = () => {
  return (
    <section className="border-b border-border py-24">
      <div className="container mx-auto max-w-4xl px-6">
        {/* Header */}

        <div className="mb-14 flex items-center gap-3">
          <BriefcaseBusiness className="h-6 w-6 text-primary" />

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
              Experience
            </p>

            <h2 className="mt-2 text-4xl font-bold">Professional Journey</h2>
          </div>
        </div>

        {/* Timeline */}

        <div>
          {experiences.map((item, index) => (
            <TimelineItem
              key={item.title}
              {...item}
              isLast={index === experiences.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
