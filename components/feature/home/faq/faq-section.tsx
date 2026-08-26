import FAQHeader from "./faq-header/faq-header";
import FAQList from "./faq-list/faq-list";

interface FAQTranslations {
  header: {
    title: string;
    description: string;
    sendMessage: string;
  };

  items: {
    sessionDuration: {
      question: string;
      answer: string;
    };
    onlineSessions: {
      question: string;
      answer: string;
    };
    confidentiality: {
      question: string;
      answer: string;
    };
    cancelReschedule: {
      question: string;
      answer: string;
    };
    psychologicalTests: {
      question: string;
      answer: string;
    };
  };
}

interface Props {
  translations: FAQTranslations;
}

const FAQSection = ({ translations }: Props) => {
  return (
    <section className="py-28">
      <div className="grid gap-20 lg:grid-cols-2 lg:items-start">
        <FAQHeader
          title={translations.header.title}
          description={translations.header.description}
          sendMessage={translations.header.sendMessage}
        />

        <FAQList items={translations.items} />
      </div>
    </section>
  );
};

export default FAQSection;
