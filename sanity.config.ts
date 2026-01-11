import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { table } from '@sanity/table';
import postSchema from './sanity/schemas/post';
import authorSchema from './sanity/schemas/author';

export default defineConfig({
  name: 'gentle-piercing-blog',
  title: 'Gentle Piercing Blog',
  projectId: 'nfwijj0y',
  dataset: 'production',
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Blog Posts')
              .child(S.documentTypeList('post').title('Blog Posts')),
            S.listItem()
              .title('Authors')
              .child(S.documentTypeList('author').title('Authors')),
          ]),
    }),
    table(),
  ],
  schema: {
    types: [
      postSchema,
      authorSchema,
    ],
  },
});

