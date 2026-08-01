import ServicesGrid from "./services-grid/services-grid";
import ServicesHeader from "./services-header/services-header";

const Services = () => {
  return (
    <section className="py-28">
      <ServicesHeader />
      <ServicesGrid />
    </section>
  );
};

export default Services;
