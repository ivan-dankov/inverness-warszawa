import { defineType, defineField } from 'sanity';

/**
 * Partner inquiries from /pl/inverness-med, written by /api/b2b-lead.
 * Document IDs start with "leads." so they are never readable without a token.
 */
export default defineType({
  name: 'b2bLead',
  title: 'B2B Lead',
  type: 'document',
  fields: [
    defineField({ name: 'salon', title: 'Salon', type: 'string', readOnly: true }),
    defineField({ name: 'city', title: 'City', type: 'string', readOnly: true }),
    defineField({ name: 'name', title: 'Name', type: 'string', readOnly: true }),
    defineField({ name: 'phone', title: 'Phone', type: 'string', readOnly: true }),
    defineField({ name: 'message', title: 'Message', type: 'text', readOnly: true }),
    defineField({ name: 'page', title: 'Page', type: 'string', readOnly: true }),
    defineField({ name: 'submittedAt', title: 'Submitted at', type: 'datetime', readOnly: true }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'New', value: 'new' },
          { title: 'Contacted', value: 'contacted' },
          { title: 'Demo booked', value: 'demo' },
          { title: 'Partner', value: 'partner' },
          { title: 'Not a fit', value: 'lost' },
        ],
        layout: 'radio',
      },
      initialValue: 'new',
    }),
    defineField({ name: 'notes', title: 'Notes', type: 'text' }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: { title: 'salon', city: 'city', status: 'status', date: 'submittedAt' },
    prepare({ title, city, status, date }) {
      const day = date ? new Date(date).toLocaleDateString('pl-PL') : '';
      return {
        title: title || 'Bez nazwy',
        subtitle: [city, status, day].filter(Boolean).join(' · '),
      };
    },
  },
});
