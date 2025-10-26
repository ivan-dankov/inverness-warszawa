import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';

interface LocalBusinessSchemaProps {
  currentLang: string;
}

export const LocalBusinessSchema = ({ currentLang }: LocalBusinessSchemaProps) => {
  const { t } = useTranslation();

  // Contact details for structured data
  const contactInfo = {
    name: "Inverness MED - Medyczne Przekłuwanie Uszu",
    url: "https://gentlepiercing.pl",
    telephone: "+48573818260",
    email: "medinverness@gmail.com",
    address: {
      streetAddress: "Gizów 6",
      addressLocality: "Warszawa",
      addressRegion: "Wola",
      postalCode: "01-249",
      addressCountry: "PL"
    },
    geo: {
      latitude: 52.22594129500684,
      longitude: 20.945046328079172
    }
  };

  const getLocalBusinessSchema = () => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": contactInfo.name,
    "image": "https://d375139ucebi94.cloudfront.net/region2/pl/319418/biz_photo/fe2fefa17af54b6c919f56d37e7e97-inverness-med-medyczne-przeklu-biz-photo-895cc6a308e44d68bbb7a349741529-booksy.jpeg",
    "@id": contactInfo.url,
    "url": contactInfo.url,
    "telephone": contactInfo.telephone,
    "email": contactInfo.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": contactInfo.address.streetAddress,
      "addressLocality": contactInfo.address.addressLocality,
      "addressRegion": contactInfo.address.addressRegion,
      "postalCode": contactInfo.address.postalCode,
      "addressCountry": contactInfo.address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": contactInfo.geo.latitude,
      "longitude": contactInfo.geo.longitude
    },
    "hasMap": "https://maps.app.goo.gl/X5kTSdfj1hgBb2Eg8",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      "opens": "09:00",
      "closes": "20:00"
    },
    "priceRange": "150-250 zł"
  });

  const getOrganizationSchema = () => ({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Inverness MED",
    "url": contactInfo.url,
    "logo": "https://storage.googleapis.com/gpt-engineer-file-uploads/GB4s5JEzk4Um0prNkFcFiNvoBTE2/uploads/1760622427421-233270ba-12aa-4f67-bf1c-81bc617a0ff7.jpeg",
    "description": currentLang === 'pl' ? 
      "Medyczne przekłuwanie uszu Inverness MED w Warszawie. Jedyny system w Europie zatwierdzony przez lekarzy. Bezpieczne, sterylne i bezbolesne dla dzieci 0+ i dorosłych." :
      currentLang === 'uk' ?
      "Медичний прокол вух Inverness MED у Варшаві. Єдина система в Європі, схвалена лікарями. Безпечне, стерильне і безболісне для дітей 0+ та дорослих." :
      currentLang === 'ru' ?
      "Медицинский прокол ушей Inverness MED в Варшаве. Единственная система в Европе, одобренная врачами. Безопасное, стерильное и безболезненное для детей 0+ и взрослых." :
      "Medical ear piercing Inverness MED in Warsaw. The only system in Europe approved by doctors. Safe, sterile and painless for children 0+ and adults.",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": contactInfo.telephone,
      "contactType": "customer service",
      "areaServed": "PL",
      "availableLanguage": ["Polish", "English", "Russian", "Ukrainian"],
      "email": contactInfo.email
    },
    "sameAs": ["https://instagram.com/prokol_ushej_warszawa"]
  });

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify([getLocalBusinessSchema(), getOrganizationSchema()])}
      </script>
    </Helmet>
  );
};
