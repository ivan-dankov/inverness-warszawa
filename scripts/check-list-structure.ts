import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
});

async function checkStructure() {
  const post = await client.fetch(`*[_type == 'post' && locale == 'en'][0] { 
    title,
    content[0...15]
  }`);
  
  console.log('Post:', post.title);
  console.log('\nFirst 15 content blocks:');
  post.content.forEach((block: any, i: number) => {
    console.log(`\nBlock ${i}:`, {
      _type: block._type,
      style: block.style,
      listItem: block.listItem,
      hasChildren: !!block.children,
      childrenCount: block.children?.length,
      hasMarkDefs: !!block.markDefs,
      markDefsCount: block.markDefs?.length,
    });
    if (block.listItem) {
      console.log('  -> This is a LIST ITEM');
      console.log('  -> Text:', block.children?.[0]?.text?.substring(0, 50));
    }
  });
}

checkStructure().catch(console.error);


