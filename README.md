# GetLifeSorted.com

A comprehensive personal finance and life management website built with Astro, providing articles, guides, and calculators to help users organize their finances and life decisions.

## 🚀 Project Overview

GetLifeSorted.com is designed to provide valuable resources for:
- Personal finance management
- Life planning and organization
- Financial calculators and tools
- Educational articles and guides

### Project Goals

GetLifeSorted.com aims to:
1. **Simplify Financial Decisions** - Provide easy-to-use calculators and tools that help users make informed financial decisions
2. **Educate Users** - Offer comprehensive guides and articles on personal finance topics
3. **Build Financial Literacy** - Create accessible content for users at all levels of financial knowledge
4. **Provide Actionable Advice** - Focus on practical, implementable steps rather than theoretical concepts
5. **Maintain Privacy** - Respect user privacy with minimal data collection and transparent practices

## 📁 Project Structure

```text
/
├── public/             # Static assets
├── src/
│   ├── assets/         # Project assets (images, etc.)
│   ├── components/     # Reusable UI components
│   │   ├── analytics/  # Analytics components
│   │   ├── calculators/# Calculator components
│   │   └── global/     # Global UI components
│   ├── config/         # Site configuration
│   ├── content/        # Content collections
│   │   ├── articles/   # Blog articles
│   │   ├── calculators/# Calculator data
│   │   └── guides/     # Educational guides
│   ├── docs/           # Internal documentation
│   ├── layouts/        # Page layouts
│   ├── pages/          # Site pages
│   ├── styles/         # Global styles
│   └── types/          # TypeScript type definitions
└── package.json
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run lint`            | Run ESLint to check code quality                 |
| `npm run lint:fix`        | Run ESLint and automatically fix issues          |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run test`            | Run tests once                                   |
| `npm run test:watch`      | Run tests in watch mode                          |
| `npm run test:coverage`   | Run tests with coverage reporting                |

## 🧪 Testing & CI

GetLifeSorted.com uses Vitest for testing with happy-dom for browser environment simulation. The testing setup includes:

- Unit tests for utility functions and components
- Coverage reporting in multiple formats (text, JSON, HTML)
- Automated testing through GitHub Actions CI

For detailed information about the testing setup, how to run tests, and how to write new tests, see the [Testing Documentation](./TESTING.md).

## 🚢 Deployment

This project is deployed using Cloudflare Pages with GitHub Actions integration. The deployment process is fully automated through a CI/CD pipeline.

### GitHub Actions Workflows

The project uses GitHub Actions for continuous integration and deployment:

1. **CI Workflow** (`.github/workflows/ci.yml`):
   - Runs on push to main branch and pull requests
   - Performs linting to ensure code quality
   - Runs all tests and generates coverage reports
   - Uploads coverage reports as artifacts

2. **Deployment Workflow** (`.github/workflows/deploy.yml`):
   - Builds and tests the Astro site on push to main branch
   - Runs linting for code quality
   - Deploys automatically to Cloudflare Pages

### Required GitHub Secrets

The following secrets must be configured in your GitHub repository:
- `CLOUDFLARE_API_TOKEN`: API token from Cloudflare with Pages permissions
- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID

### Required Environment Variables in Cloudflare Pages

The following environment variables should be set in Cloudflare Pages:
- `PLAUSIBLE_DOMAIN`: For analytics
- `GOOGLE_ANALYTICS_ID`: For Google Analytics
- `SITE_URL`: Site URL (https://getlifesorted.com)
- `ENABLE_ADS`: Feature flag for ads
- `ENABLE_NEWSLETTER`: Feature flag for newsletter

For detailed deployment instructions, including how to manually trigger deployments, see the [deployment documentation](./src/docs/deployment.md).

## 🔒 Environment Variables

The following environment variables are required for production deployment:

```
# Analytics
PLAUSIBLE_DOMAIN=getlifesorted.com
GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX

# API Keys (if applicable)
API_KEY=xxxxxxxxxxxx
```

## 📚 Documentation

Comprehensive documentation is available to help you understand, use, and contribute to GetLifeSorted.com:

- [Documentation Index](./src/docs/index.md) - Central hub for all documentation
- [Content Templating Guide](./src/docs/content-templating-guide.md) - How to create articles and guides
- [Calculator Usage](./src/docs/calculator-usage.md) - How to create and use calculators
- [Analytics & Ads Integration](./src/docs/analytics-ads-integration.md) - Setting up analytics and ads
- [SEO Guidelines](./src/docs/seo-guidelines.md) - Best practices for SEO
- [Deployment Guide](./src/docs/deployment.md) - How to deploy the site

## 🧩 Component Library

GetLifeSorted.com uses a custom component library built with Astro components. These components are designed to be reusable, accessible, and consistent with the site's design language. See the [Component Library Documentation](./src/docs/component-library.md) for details.

## 🔄 Development Workflow

1. Clone the repository
2. Install dependencies with `npm install`
3. Copy `.env.example` to `.env` and configure environment variables
4. Run the development server with `npm run dev`
5. Make changes and test locally
6. Commit changes and push to GitHub
7. Create a pull request for review
8. Once approved, changes will be automatically deployed

## 📝 License

Copyright © 2025 GetLifeSorted.com. All rights reserved.
