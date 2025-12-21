import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import postSchema from './sanity/schemas/post';

export default defineConfig({
  name: 'gentle-piercing-blog',
  title: 'Gentle Piercing Blog',
  projectId: 'nfwijj0y',
  dataset: 'production',
  plugins: [
    structureTool(),
  ],
  schema: {
    types: [postSchema],
  },
});

