// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://getlifesorted.com',
  integrations: [
    tailwind(),
    sitemap({
      // Configuration options for sitemap
      filter: (page) => !page.includes('/tags/'), // Exclude tag pages from sitemap
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date()
    })
  ],
  // Configure markdown for articles
  markdown: {
    shikiConfig: {
      theme: 'github-light',
      wrap: true
    }
  }
});