import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { table } from '@sanity/table';
import postSchema from './sanity/schemas/post';
import authorSchema from './sanity/schemas/author';
import pageSeoSchema from './sanity/schemas/pageSeo';
import servicePageSeoSchema from './sanity/schemas/servicePageSeo';
import faqSchema from './sanity/schemas/faq';
import siteSettingsSchema from './sanity/schemas/siteSettings';

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
              .title('Page SEO')
              .child(S.documentTypeList('pageSeo').title('Page SEO')),
            S.listItem()
              .title('Service Page SEO')
              .child(S.documentTypeList('servicePageSeo').title('Service Page SEO')),
            S.listItem()
              .title('FAQs')
              .child(S.documentTypeList('faq').title('FAQs')),
            S.divider(),
            S.listItem()
              .title('Site Settings')
              .child(
                S.document()
                  .schemaType('siteSettings')
                  .documentId('siteSettings')
              ),
          ]),
    }),
    table(),
  ],
  schema: {
    types: [
      postSchema,
      authorSchema,
      pageSeoSchema,
      servicePageSeoSchema,
      faqSchema,
      siteSettingsSchema,
    ],
  },
});

