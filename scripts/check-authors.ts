import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function checkAuthors() {
  const authors = await client.fetch(`*[_type == "author"] { _id, name, locale, translationGroupId }`);
  console.log(`Found ${authors.length} authors in Sanity:\n`);
  authors.forEach((author: any) => {
    console.log(`  - ${author.name} (${author.locale}) - ID: ${author._id}`);
    console.log(`    Translation Group: ${author.translationGroupId || 'N/A'}`);
  });
  
  if (authors.length === 0) {
    console.log('\n⚠️  No authors found. You need to create authors before importing articles.');
    console.log('   Please ensure your Sanity token has "create" permissions and run:');
    console.log('   npm run import-authors');
  } else {
    console.log('\n✅ Authors exist. You can proceed with article import.');
  }
}

checkAuthors().catch(console.error);


