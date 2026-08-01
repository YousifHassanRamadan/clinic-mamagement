import { services } from "@/constants/home/home";
import ServiceCard from "../service-card/service-card";

const ServicesGrid = () => {
  return (
    <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
      {services.map((service) => (
        <ServiceCard key={service.title} {...service} />
      ))}
    </div>
  );
};

export default ServicesGrid;
