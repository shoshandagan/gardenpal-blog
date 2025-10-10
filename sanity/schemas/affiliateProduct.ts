import { defineField, defineType } from 'sanity'

export const affiliateProduct = defineType({
  name: 'affiliateProduct',
  title: 'Affiliate Product',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Product Name',
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
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'image',
      title: 'Product Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alternative Text',
        },
      ],
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'string',
      description: 'Display price (e.g., "$24.99")',
    }),
    defineField({
      name: 'affiliateLink',
      title: 'Affiliate Link',
      type: 'url',
      validation: (Rule) => Rule.required(),
      description: 'Full affiliate URL from Amazon or other platform',
    }),
    defineField({
      name: 'platform',
      title: 'Affiliate Platform',
      type: 'string',
      options: {
        list: [
          { title: 'Amazon Associates', value: 'amazon' },
          { title: 'ShareASale', value: 'shareasale' },
          { title: 'CJ Affiliate', value: 'cj' },
          { title: 'Etsy', value: 'etsy' },
          { title: 'Other', value: 'other' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Featured Product',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'rating',
      title: 'Product Rating',
      type: 'number',
      description: 'Rating out of 5',
      validation: (Rule) => Rule.min(0).max(5),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'platform',
      media: 'image',
    },
    prepare(selection) {
      const { title, subtitle, media } = selection
      return {
        title,
        subtitle: `${subtitle ? subtitle.toUpperCase() : 'Affiliate Product'}`,
        media,
      }
    },
  },
})

