import { createClient } from '@sanity/client';
import { readFileSync } from 'fs';
import { convertMarkdownToPortableText } from './convert-markdown-to-portable-text.js';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function run() {
  const articles = [
    { path: 'content/articles/kiedy-mozna-isc-na-basen-po-przekluciu-uszu-pl.md', slug: 'kiedy-mozna-isc-na-basen-po-przekluciu-uszu', locale: 'pl' },
    { path: 'content/articles/kiedy-mozna-isc-na-basen-po-przekluciu-uszu-en.md', slug: 'when-can-you-go-to-the-pool-after-ear-piercing', locale: 'en' },
    { path: 'content/articles/kiedy-mozna-isc-na-basen-po-przekluciu-uszu-uk.md', slug: 'koly-mozhna-yty-v-basein-pislya-prokolu-vukh', locale: 'uk' },
    { path: 'content/articles/kiedy-mozna-isc-na-basen-po-przekluciu-uszu-ru.md', slug: 'kogda-mozhno-idti-v-basseyn-posle-prokola-ushey', locale: 'ru' }
  ];

  for (const article of articles) {
    const fileContent = readFileSync(article.path, 'utf-8');
    const parts = fileContent.split(/^---$/m);
    const content = parts[0].trim();
    
    const portableText = await convertMarkdownToPortableText(content);
    
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug && locale == $locale][0]`, {
      slug: article.slug,
      locale: article.locale
    });
    
    if (post) {
      await client.patch(post._id).set({ content: portableText }).commit();
      console.log(`Updated ${article.locale}`);
    }
  }
}
run();
