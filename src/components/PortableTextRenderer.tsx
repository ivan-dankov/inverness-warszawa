import { PortableText } from '@portabletext/react';
import { getPortableTextComponents } from '../lib/portable-text-components';
import type { Locale } from '../lib/seo';

interface PortableTextRendererProps {
  content: any[];
  locale: Locale;
}

function PortableTextRenderer({ content, locale }: PortableTextRendererProps) {
  const components = getPortableTextComponents(locale);
  return <PortableText value={content} components={components} />;
}

export default PortableTextRenderer;

