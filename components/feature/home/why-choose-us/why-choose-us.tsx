import WhyChooseUsGrid from "./why-choose-us-grid/why-choose-us-grid";
import WhyChooseUsHeader from "./why-choose-us-header/why-choose-us-header";

const WhyChooseUs = () => {
  return (
    <section className="py-28">
      <div className="grid  gap-16 lg:grid-cols-2">
        <WhyChooseUsHeader />

        <WhyChooseUsGrid />
      </div>
    </section>
  );
};

export default WhyChooseUs;
