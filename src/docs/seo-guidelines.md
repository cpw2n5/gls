# SEO Guidelines for GetLifeSorted.com

This document outlines the SEO implementation for GetLifeSorted.com and provides guidelines for maintaining good SEO practices when adding new content to the site.

## SEO Implementation Overview

The SEO implementation for GetLifeSorted.com includes:

1. **Canonical URLs** for all pages to prevent duplicate content issues
2. **Sitemap.xml and robots.txt** for improved search engine crawling
3. **Open Graph and Twitter meta tags** for better social media sharing
4. **Structured data (JSON-LD)** for enhanced search engine understanding
5. **Performance optimizations** for faster page loading

## Components and Configuration

### SEO Component

The `SEO.astro` component in `src/components/global/SEO.astro` is the central component for managing SEO across the site. It handles:

- Basic meta tags (title, description)
- Canonical URLs
- Open Graph and Twitter meta tags
- Structured data (JSON-LD)
- Resource hints for performance optimization

### Sitemap and Robots.txt

The sitemap is generated automatically using the `@astrojs/sitemap` integration configured in `astro.config.mjs`. The robots.txt file is located in the `public` directory.

### Image Optimization

The `OptimizedImage.astro` component in `src/components/global/OptimizedImage.astro` provides image optimization for better performance and SEO.

## Guidelines for Adding New Content

### Articles

When creating a new article, ensure you:

1. **Provide a descriptive title** that includes relevant keywords
2. **Write a compelling meta description** (150-160 characters) that summarizes the content
3. **Add relevant tags** to help categorize the content
4. **Include a high-quality featured image** that represents the content
5. **Structure your content with proper headings** (H2, H3, etc.)
6. **Include internal links** to other relevant content on the site

Example frontmatter for an article:

```yaml
---
title: "How to Create Your First Budget"
description: "Learn how to create a simple yet effective budget that helps you manage your finances and achieve your financial goals."
publishDate: 2023-05-15
updatedDate: 2023-06-10
author: "Financial Expert"
image: "/images/articles/first-budget.jpg"
tags: ["budgeting", "personal finance", "money management"]
---
```

### Calculators

When creating a new calculator, ensure you:

1. **Provide a descriptive title** that includes relevant keywords
2. **Write a clear description** explaining what the calculator does and how it helps users
3. **Use semantic HTML** for the calculator interface
4. **Ensure the calculator is accessible** to all users

Example frontmatter for a calculator page:

```yaml
---
title: "Mortgage Payment Calculator"
description: "Calculate your monthly mortgage payments based on loan amount, interest rate, and term."
---
```

### General SEO Best Practices

1. **Use descriptive URLs** that include relevant keywords
2. **Optimize images** by using the `OptimizedImage` component and providing descriptive alt text
3. **Ensure fast page loading** by minimizing unnecessary scripts and optimizing assets
4. **Create mobile-friendly content** that works well on all devices
5. **Use internal linking** to establish site structure and help users navigate
6. **Update content regularly** to keep it fresh and relevant

## Structured Data Implementation

The SEO component automatically generates appropriate structured data based on the content type:

- **Articles**: Uses Article schema with author, publish date, and other metadata
- **Calculators**: Uses WebApplication schema with appropriate categorization
- **All Pages**: Includes WebSite schema and BreadcrumbList schema

## Performance Optimization

To maintain good performance for SEO:

1. **Use the OptimizedImage component** for all images
2. **Lazy load non-critical images** by using the `loading="lazy"` attribute
3. **Set appropriate image sizes** using the `sizes` attribute
4. **Prioritize critical resources** using `fetchpriority="high"` for above-the-fold content
5. **Use resource hints** (preconnect, preload) for critical third-party resources

## Monitoring and Improvement

Regularly check:

1. **Google Search Console** for indexing issues and search performance
2. **Core Web Vitals** for performance metrics
3. **Mobile usability** to ensure the site works well on all devices
4. **Structured data validation** using Google's Structured Data Testing Tool

## Conclusion

Following these guidelines will help ensure that GetLifeSorted.com maintains good SEO practices and continues to improve its search engine visibility and user experience.