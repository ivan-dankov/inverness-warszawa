import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './ui/accordion';

interface FAQ {
  question: string;
  answer: string;
}

interface ServiceFAQProps {
  faqs: FAQ[];
  locale: string;
}

export default function ServiceFAQ({ faqs, locale }: ServiceFAQProps) {
  if (!faqs || faqs.length === 0) {
    return null;
  }

  const title = locale === 'pl' 
    ? 'Najczęściej zadawane pytania'
    : locale === 'uk'
    ? 'Часті питання'
    : locale === 'ru'
    ? 'Часто задаваемые вопросы'
    : 'Frequently Asked Questions';

  return (
    <div className="border-t border-border pt-8 mb-12">
      <h2 className="text-2xl font-bold mb-6 text-foreground">
        {title}
      </h2>
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`} className="border-b border-border">
            <AccordionTrigger className="text-left text-base font-medium text-foreground hover:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

