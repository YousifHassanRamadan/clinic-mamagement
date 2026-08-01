import { features } from "@/constants/home/home";
import FeatureCard from "../feature-card/feature-card";

const WhyChooseUsGrid = () => {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {features.map((feature) => (
        <FeatureCard key={feature.number} {...feature} />
      ))}
    </div>
  );
};

export default WhyChooseUsGrid;
