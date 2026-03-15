import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'nfwijj0y',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
  perspective: 'published',
});

