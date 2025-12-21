import { createClient } from '@sanity/client';

const token = process.env.SANITY_API_TOKEN;

if (!token) {
  console.error('❌ SANITY_API_TOKEN not set');
  process.exit(1);
}

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  token: token,
});

async function test() {
  try {
    // Try a simple read query first
    console.log('Testing token with a read query...');
    const result = await client.fetch('*[_type == "post"] | order(_createdAt desc) [0..4]');
    console.log('✅ Token works for reading! Found', result.length, 'posts');
    
    // Try to check permissions
    console.log('\nToken format:', token.substring(0, 10) + '...');
    console.log('Token length:', token.length);
    
  } catch (error: any) {
    console.error('❌ Error:', error.message);
    console.error('Status:', error.statusCode);
    console.error('\nPossible issues:');
    console.error('1. Token might be for a different project');
    console.error('2. Token might not have write permissions');
    console.error('3. Token might be expired or invalid');
    console.error('\nTo fix:');
    console.error('1. Go to https://sanity.io/manage');
    console.error('2. Select project: nfwijj0y');
    console.error('3. Go to API → Tokens');
    console.error('4. Create a new token with "Editor" permissions');
    process.exit(1);
  }
}

test();

