import FAQHeader from "./faq-header/faq-header";
import FAQList from "./faq-list/faq-list";

const FAQSection = () => {
  return (
    <section className="py-28">
      <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
        <FAQHeader />

        <FAQList />
      </div>
    </section>
  );
};

export default FAQSection;
