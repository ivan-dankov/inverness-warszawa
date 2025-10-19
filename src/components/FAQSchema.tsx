import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

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

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};
