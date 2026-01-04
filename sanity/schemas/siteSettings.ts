import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site Name',
      type: 'string',
      initialValue: 'Gentle Piercing',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      initialValue: 'https://gentlepiercing.pl',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization Details',
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'string',
          title: 'Organization Name',
          initialValue: 'Gentle Piercing',
        },
        {
          name: 'logo',
          type: 'image',
          title: 'Logo',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
        {
          name: 'logoWide',
          type: 'image',
          title: 'Wide Logo (for Organization schema)',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram URL',
          initialValue: 'https://instagram.com/prokol_ushej_warszawa',
        },
      ],
    }),
    defineField({
      name: 'business',
      title: 'Business Details',
      type: 'object',
      fields: [
        {
          name: 'address',
          type: 'object',
          title: 'Address',
          fields: [
            { name: 'street', type: 'string', title: 'Street', initialValue: 'Gizów 6' },
            { name: 'city', type: 'string', title: 'City', initialValue: 'Warszawa' },
            { name: 'postalCode', type: 'string', title: 'Postal Code', initialValue: '01-249' },
            { name: 'country', type: 'string', title: 'Country', initialValue: 'PL' },
          ],
        },
        {
          name: 'telephone',
          type: 'string',
          title: 'Telephone',
          initialValue: '+48573818260',
        },
        {
          name: 'openingHours',
          type: 'string',
          title: 'Opening Hours',
          initialValue: 'Mo-Su 09:00-20:00',
        },
        {
          name: 'priceRange',
          type: 'string',
          title: 'Price Range',
          initialValue: '150-250 zł',
        },
      ],
    }),
    defineField({
      name: 'ratings',
      title: 'Aggregate Ratings',
      type: 'object',
      fields: [
        {
          name: 'ratingValue',
          type: 'string',
          title: 'Rating Value',
          initialValue: '5.0',
        },
        {
          name: 'reviewCount',
          type: 'string',
          title: 'Review Count',
          initialValue: '31',
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});

