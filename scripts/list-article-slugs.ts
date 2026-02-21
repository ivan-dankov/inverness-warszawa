import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function listSlugs() {
  const articles = await client.fetch(
    `*[_type == "post"] { 
      _id, 
      "slug": slug.current, 
      locale 
    }`
  );
  console.log(JSON.stringify(articles, null, 2));
}

listSlugs().catch(console.error);


