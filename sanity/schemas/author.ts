import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
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
      name: 'translationGroupId',
      title: 'Translation Group ID',
      type: 'string',
      description: 'Links translations of the same author. Use the same ID for all language versions.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title/Role',
      type: 'string',
      description: 'Author title or role (e.g., "Expert Piercer", "Founder")',
    }),
    defineField({
      name: 'bio',
      title: 'Biography',
      type: 'text',
      rows: 4,
      description: 'Short biography or description of the author',
    }),
    defineField({
      name: 'image',
      title: 'Profile Image',
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
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.email(),
    }),
    defineField({
      name: 'social',
      title: 'Social Media',
      type: 'object',
      fields: [
        {
          name: 'instagram',
          type: 'url',
          title: 'Instagram URL',
        },
        {
          name: 'facebook',
          type: 'url',
          title: 'Facebook URL',
        },
        {
          name: 'twitter',
          type: 'url',
          title: 'Twitter/X URL',
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'locale',
      media: 'image',
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `Locale: ${subtitle}`,
        media,
      };
    },
  },
});

