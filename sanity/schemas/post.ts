import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
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
      description: 'Links translations of the same article. Use the same ID for all language versions.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                title: 'URL',
                name: 'link',
                type: 'object',
                fields: [
                  {
                    title: 'URL',
                    name: 'href',
                    type: 'url',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
            },
          ],
        },
        {
          type: 'table',
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: 'Updated at',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      description: 'Override default SEO values',
      options: {
        collapsible: true,
        collapsed: true,
      },
      fields: [
        defineField({
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
          description: 'SEO title (max 60 chars). If empty, uses post title.',
          validation: (Rule) => Rule.max(60).warning('Keep under 60 characters for best display'),
        }),
        defineField({
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
          description: 'SEO description (120-160 chars). This appears in search results.',
          validation: (Rule) => Rule.min(120).max(160)
            .warning('Should be 120-160 characters for optimal display in search results'),
        }),
        defineField({
          name: 'ogImage',
          title: 'OG Image (Social Media)',
          type: 'image',
          description: 'Custom image for social sharing (1200x630px). If empty, uses main image.',
          options: {
            hotspot: true,
          },
        }),
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      description: 'Select the author of this article. Only authors with the same locale will be shown.',
      options: {
        filter: ({ document }: { document: any }) => {
          // Only show authors with the same locale as the post
          return {
            filter: 'locale == $locale',
            params: { 
              locale: document.locale,
            },
          };
        },
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedArticles',
      title: 'Related Articles',
      type: 'array',
      description: 'Select other articles to show at the end of this post. Only articles in the same locale will be displayed.',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
          options: {
            filter: ({ document }: { document: any }) => {
              // Only show posts with the same locale, excluding the current post
              return {
                filter: 'locale == $locale && _id != $currentId',
                params: { 
                  locale: document.locale,
                  currentId: document._id,
                },
              };
            },
          },
        },
      ],
    }),
    defineField({
      name: 'structuredDataJson',
      title: 'Structured Data (JSON-LD)',
      type: 'text',
      description: 'Paste JSON-LD structured data here (Article/BlogPosting, FAQ, HowTo, etc.). If Article schema is included, it will override the auto-generated one. Use an array for multiple schemas: [{"@context": "https://schema.org", "@type": "BlogPosting", ...}]',
      rows: 10,
      validation: (Rule) =>
        Rule.custom((value) => {
          if (!value) return true; // Optional field
          try {
            JSON.parse(value);
            return true;
          } catch (error) {
            return 'Must be valid JSON';
          }
        }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      locale: 'locale',
      media: 'coverImage',
    },
    prepare({ title, locale, media }) {
      return {
        title,
        subtitle: `Locale: ${locale}`,
        media,
      };
    },
  },
});

