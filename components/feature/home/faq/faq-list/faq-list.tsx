// components/feature/home/faq/faq-list/faq-list.tsx

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { cookies } from "next/headers";

interface FAQItem {
  question: string;
  answer: string;
}

interface Props {
  items: {
    sessionDuration: FAQItem;
    onlineSessions: FAQItem;
    confidentiality: FAQItem;
    cancelReschedule: FAQItem;
    psychologicalTests: FAQItem;
  };
}

const FAQList = async ({ items }: Props) => {
  const cookieStore = await cookies();
  const locale = cookieStore.get("locale")?.value;

  const isArabic = locale === "ar";

  const faqItems = [
    items.sessionDuration,
    items.onlineSessions,
    items.confidentiality,
    items.cancelReschedule,
    items.psychologicalTests,
  ];

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqItems.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger
            className={`
              text-lg font-semibold hover:no-underline
              ${isArabic ? "flex-row-reverse text-right" : "flex-row text-left"}
            `}
          >
            {item.question}
          </AccordionTrigger>

          <AccordionContent
            className={`
              leading-7 text-muted-foreground
              ${isArabic ? "text-right" : "text-left"}
            `}
          >
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FAQList;
