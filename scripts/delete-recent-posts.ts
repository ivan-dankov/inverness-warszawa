import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN || process.env.SANITY_AUTH_TOKEN,
  useCdn: false,
});

async function run() {
  const ids = [
    'uSt5DSrf5hRvtFLJvu9xNV',
    'Gx3dzIl5a03ayHyHFXD2tU',
    'hRnUncyvQIpxmho9xGK5gx',
    'hRnUncyvQIpxmho9xGK638',
    'drafts.uSt5DSrf5hRvtFLJvu9xNV',
    'drafts.Gx3dzIl5a03ayHyHFXD2tU',
    'drafts.hRnUncyvQIpxmho9xGK5gx',
    'drafts.hRnUncyvQIpxmho9xGK638'
  ];
  for (const id of ids) {
    try {
      await client.delete(id);
      console.log('Deleted', id);
    } catch (e) {
      console.log('Failed to delete', id, e.message);
    }
  }
}
run();
