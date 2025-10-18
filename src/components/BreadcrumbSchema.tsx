import { useEffect } from 'react';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export const BreadcrumbSchema = ({ items }: BreadcrumbSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'breadcrumb-schema';
    script.text = JSON.stringify(schema);
    
    const existing = document.getElementById('breadcrumb-schema');
    if (existing) existing.remove();
    
    document.head.appendChild(script);
    
    return () => {
      const schemaElement = document.getElementById('breadcrumb-schema');
      if (schemaElement) schemaElement.remove();
    };
  }, [schema]);

  return null;
};
