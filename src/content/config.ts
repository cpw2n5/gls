import { defineCollection, z } from 'astro:content';

// Shared schema for content with common fields
const contentBaseSchema = z.object({
  title: z.string(),
  description: z.string(),
  publishDate: z.date(),
  updatedDate: z.date().optional(),
  author: z.string().default('GetLifeSorted Team'),
  image: z.string().optional(),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
});

// Define a schema for articles
const articleCollection = defineCollection({
  type: 'content',
  schema: contentBaseSchema,
});

// Define a schema for guides (more comprehensive content)
const guideCollection = defineCollection({
  type: 'content',
  schema: contentBaseSchema.extend({
    // Additional fields specific to guides
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).default('beginner'),
    estimatedTime: z.string().optional(), // e.g., "15 minutes", "1 hour"
    prerequisites: z.array(z.string()).default([]),
    relatedGuides: z.array(z.string()).default([]),
    relatedCalculators: z.array(z.string()).default([]),
  }),
});

// Define a schema for calculator configurations
const calculatorCollection = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    slug: z.string(),
    inputs: z.array(
      z.object({
        id: z.string(),
        label: z.string(),
        type: z.enum(['text', 'number', 'select', 'radio', 'checkbox']),
        defaultValue: z.union([z.string(), z.number(), z.boolean()]).optional(),
        options: z.array(
          z.object({
            label: z.string(),
            value: z.union([z.string(), z.number()]),
          })
        ).optional(),
        required: z.boolean().default(false),
        min: z.number().optional(),
        max: z.number().optional(),
        step: z.number().optional(),
      })
    ),
    relatedArticles: z.array(z.string()).optional(),
    relatedGuides: z.array(z.string()).optional(),
    relatedCalculators: z.array(z.string()).optional(),
  }),
});

// Export the collections
export const collections = {
  'articles': articleCollection,
  'guides': guideCollection,
  'calculators': calculatorCollection,
};