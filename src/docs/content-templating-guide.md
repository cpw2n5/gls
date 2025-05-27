# GetLifeSorted Content Templating System

This documentation explains how to use the content templating system for GetLifeSorted.com's articles and guides. The system is designed to make it easy to add new content while maintaining consistent styling and functionality.

## Table of Contents

1. [Overview](#overview)
2. [Content Collections](#content-collections)
3. [Creating New Articles](#creating-new-articles)
4. [Creating New Guides](#creating-new-guides)
5. [Frontmatter Schema](#frontmatter-schema)
6. [Markdown Features](#markdown-features)
7. [Adding Images](#adding-images)
8. [Linking Between Content](#linking-between-content)
9. [Content Organization](#content-organization)
10. [Publishing Workflow](#publishing-workflow)

## Overview

The GetLifeSorted content system uses Astro's content collections to manage articles and guides. The system provides:

- Markdown-based content authoring
- Consistent layouts and styling
- Automatic table of contents generation
- Reading time estimation
- Related content suggestions
- Social sharing functionality
- Print-friendly styling
- Tagging and categorization

## Content Collections

The site has two main content collections:

1. **Articles**: Shorter, focused content pieces on specific topics
2. **Guides**: Comprehensive, in-depth content that covers broader topics

Both collections use a similar structure but have slightly different schemas and presentation styles.

## Creating New Articles

To create a new article:

1. Create a new Markdown file in `src/content/articles/` with a descriptive filename (use kebab-case)
2. Add the required frontmatter (see [Frontmatter Schema](#frontmatter-schema))
3. Write your content using Markdown
4. The article will be automatically available at `/articles/your-filename`

Example:

```md
---
title: "How to Save for Your First Home"
description: "A step-by-step guide to saving for a down payment on your first home."
publishDate: 2025-06-01T00:00:00Z
author: "GetLifeSorted Team"
tags: ["saving", "real estate", "first-time buyers"]
featured: false
draft: false
---

# How to Save for Your First Home

Introduction paragraph here...

## Setting a Target Amount

Content here...
```

## Creating New Guides

To create a new guide:

1. Create a new Markdown file in `src/content/guides/` with a descriptive filename (use kebab-case)
2. Add the required frontmatter (see [Frontmatter Schema](#frontmatter-schema))
3. Write your content using Markdown
4. The guide will be automatically available at `/guides/your-filename`

Guides have additional frontmatter fields compared to articles, including difficulty level, estimated reading time, and prerequisites.

Example:

```md
---
title: "Complete Guide to Retirement Planning"
description: "Everything you need to know about planning for retirement at any age."
publishDate: 2025-06-15T00:00:00Z
author: "GetLifeSorted Team"
tags: ["retirement", "investing", "financial planning"]
featured: true
difficulty: "intermediate"
estimatedTime: "45 minutes"
prerequisites: ["Basic understanding of investing"]
relatedGuides: ["investment-basics"]
relatedCalculators: ["retirement-savings"]
---

# Complete Guide to Retirement Planning

Introduction paragraph here...

## Why Start Planning Now

Content here...
```

## Frontmatter Schema

### Common Fields (Articles and Guides)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `title` | String | Yes | The title of the content |
| `description` | String | Yes | A brief description (150-200 characters recommended) |
| `publishDate` | Date | Yes | Publication date in ISO format (YYYY-MM-DDTHH:MM:SSZ) |
| `updatedDate` | Date | No | Last update date in ISO format |
| `author` | String | No | Author name (defaults to "GetLifeSorted Team") |
| `image` | String | No | Path to featured image |
| `tags` | Array | No | Array of tags for categorization |
| `featured` | Boolean | No | Whether to feature on homepage/index pages (defaults to false) |
| `draft` | Boolean | No | If true, won't be published (defaults to false) |

### Guide-Specific Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `difficulty` | Enum | No | "beginner", "intermediate", or "advanced" (defaults to "beginner") |
| `estimatedTime` | String | No | Estimated reading time (e.g., "15 minutes", "1 hour") |
| `prerequisites` | Array | No | Array of prerequisite knowledge/guides |
| `relatedGuides` | Array | No | Array of related guide slugs |
| `relatedCalculators` | Array | No | Array of related calculator slugs |

## Markdown Features

The content system supports standard Markdown syntax plus some additional features:

### Headings

Use headings to structure your content. H2 (`##`) and H3 (`###`) headings are automatically included in the table of contents.

```md
## Main Section
### Subsection
```

### Lists

Both ordered and unordered lists are supported:

```md
- Item 1
- Item 2
  - Nested item

1. First step
2. Second step
```

### Tables

Tables can be created using the standard Markdown syntax:

```md
| Column 1 | Column 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Code Blocks

Code blocks can be included with syntax highlighting:

```md
```javascript
function example() {
  return "This is a code example";
}
```
```

### Blockquotes

Blockquotes can be used for highlighting important information:

```md
> This is an important note or quote that should stand out.
```

## Adding Images

Images can be added to your content in two ways:

1. **Featured Image**: Add the image path to the `image` field in the frontmatter
2. **In-content Images**: Use standard Markdown image syntax

```md
![Alt text for the image](/images/your-image.jpg)
```

For optimal performance:

- Store images in the `public/images/` directory
- Use descriptive filenames
- Optimize images before uploading (compress, proper dimensions)
- Always include alt text for accessibility

## Linking Between Content

You can link to other content on the site using relative URLs:

```md
[Check out our budgeting guide](/guides/first-job-budgeting)
```

For related content, use the `relatedGuides` or `relatedCalculators` frontmatter fields to automatically display related content in the sidebar.

## Content Organization

Content is organized by:

1. **Type**: Articles vs. Guides
2. **Tags**: Used for categorization and filtering
3. **Difficulty** (Guides only): Beginner, Intermediate, Advanced
4. **Featured Status**: Featured content appears on the homepage and at the top of index pages

When creating new content, consider:

- Which type best fits the content (article or guide)
- Which tags to use for proper categorization
- Whether the content should be featured
- For guides, the appropriate difficulty level

## Publishing Workflow

1. **Create**: Write your content in Markdown with proper frontmatter
2. **Preview**: Set `draft: true` to preview without publishing
3. **Review**: Check for formatting, accuracy, and completeness
4. **Publish**: Set `draft: false` when ready to publish
5. **Update**: When making significant updates, update the `updatedDate` field

## Best Practices

1. **Use Clear Titles**: Make titles descriptive and include keywords
2. **Structure Content**: Use headings to create a logical structure
3. **Include Visuals**: Add relevant images to break up text
4. **Link Related Content**: Use internal links to connect related topics
5. **Optimize for SEO**: Include relevant keywords in titles, descriptions, and headings
6. **Keep Updated**: Regularly review and update content for accuracy
7. **Be Consistent**: Maintain a consistent voice and style across content

By following these guidelines, you'll be able to create high-quality, consistent content that integrates seamlessly with the GetLifeSorted.com website.