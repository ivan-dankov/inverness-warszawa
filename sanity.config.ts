import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { table } from '@sanity/table';
import postSchema from './sanity/schemas/post';

export default defineConfig({
  name: 'gentle-piercing-blog',
  title: 'Gentle Piercing Blog',
  projectId: 'nfwijj0y',
  dataset: 'production',
  plugins: [
    structureTool(),
    table(),
  ],
  schema: {
    types: [postSchema],
  },
});

