import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function run() {
  const posts = await client.fetch(`*[_type == "post" && slug.current in [
    "od-jakiego-wieku-przekluwac-uszy-dziecku"
  ]] { _id, locale, translationGroupId, "slug": slug.current }`);
  
  console.log(posts);
}
run();
