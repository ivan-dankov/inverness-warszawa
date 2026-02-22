import { PortableText } from '@portabletext/react';
import { getPortableTextComponents } from '../lib/portable-text-components';
import type { Locale } from '../lib/seo';
import type { TranslationMappings } from '../lib/sanity';

interface PortableTextRendererProps {
  content: any[];
  locale: Locale;
  translationMappings?: TranslationMappings;
}

function PortableTextRenderer({ content, locale, translationMappings }: PortableTextRendererProps) {
  const components = getPortableTextComponents(locale, translationMappings);
  return <PortableText value={content} components={components} />;
}

export default PortableTextRenderer;

