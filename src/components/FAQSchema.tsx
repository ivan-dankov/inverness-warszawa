import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

export const FAQSchema = () => {
  const { t } = useTranslation();
  
  const faqs = t('faq.items', { returnObjects: true }) as Array<{
    question: string;
    answer: string;
  }>;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'faq-schema';
    script.text = JSON.stringify(schema);
    
    const existing = document.getElementById('faq-schema');
    if (existing) {
      existing.remove();
    }
    
    document.head.appendChild(script);
    
    return () => {
      const schemaElement = document.getElementById('faq-schema');
      if (schemaElement) {
        schemaElement.remove();
      }
    };
  }, [schema]);

  return null;
};
