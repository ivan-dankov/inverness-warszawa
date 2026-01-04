import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'servicePageSeo',
  title: 'Service Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'serviceSlug',
      title: 'Service Slug',
      type: 'string',
      options: {
        list: [
          { title: 'Children Ear Piercing', value: 'przekluwanie-uszu-dzieci-warszawa' },
          { title: 'Adults Ear Piercing', value: 'przekluwanie-uszu-dorosli-warszawa' },
          { title: 'Cartilage Piercing', value: 'przekluwanie-chrzastki-warszawa' },
          { title: 'Mobile Ear Piercing', value: 'przekluwanie-uszu-z-dojazdem-warszawa' },
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
      serviceSlug: 'serviceSlug',
      locale: 'locale',
      title: 'title',
    },
    prepare({ serviceSlug, locale, title }) {
      return {
        title: `${serviceSlug} (${locale})`,
        subtitle: title,
      };
    },
  },
});

