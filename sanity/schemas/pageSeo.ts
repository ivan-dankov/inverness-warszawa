import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'pageSeo',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'pageKey',
      title: 'Page Key',
      type: 'string',
      options: {
        list: [
          { title: 'Home', value: 'home' },
          { title: 'Aftercare', value: 'aftercare' },
          { title: 'Blog Index', value: 'blog' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'locale',
      title: 'Locale',
      type: 'string',
      options: {
        list: [
          { title: 'Polish', value: 'pl' },
          { title: 'Ukrainian', value: 'uk' },
          { title: 'Russian', value: 'ru' },
          { title: 'English', value: 'en' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Meta Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'description',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative text',
        },
      ],
    }),
  ],
  preview: {
    select: {
      pageKey: 'pageKey',
      locale: 'locale',
      title: 'title',
    },
    prepare({ pageKey, locale, title }) {
      return {
        title: `${pageKey} (${locale})`,
        subtitle: title,
      };
    },
  },
});

