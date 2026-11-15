import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { table } from '@sanity/table';
import postSchema from './sanity/schemas/post';
import authorSchema from './sanity/schemas/author';
import b2bLeadSchema from './sanity/schemas/b2bLead';

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
            S.divider(),
            S.listItem()
              .title('B2B Leads (dla salonów)')
              .child(
                S.documentTypeList('b2bLead')
                  .title('B2B Leads')
                  .defaultOrdering([{ field: 'submittedAt', direction: 'desc' }])
              ),
          ]),
    }),
    table(),
  ],
  schema: {
    types: [
      postSchema,
      authorSchema,
      b2bLeadSchema,
    ],
  },
});

