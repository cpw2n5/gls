# Deployment Guide for GetLifeSorted.com

This document outlines the complete deployment process for GetLifeSorted.com, including GitHub repository integration, Cloudflare Pages deployment, and custom domain configuration.

## Table of Contents

1. [GitHub Repository Configuration](#github-repository-configuration)
2. [Cloudflare Pages Setup](#cloudflare-pages-setup)
3. [Custom Domain Configuration](#custom-domain-configuration)
4. [Environment Variables](#environment-variables)
5. [Maintenance and Updates](#maintenance-and-updates)

## GitHub Repository Configuration

### Repository Setup

1. Ensure your repository is hosted on GitHub.
2. The main branch (`main`) is the production branch.
3. All development should be done in feature branches and merged via pull requests.

### Branch Protection Rules

To ensure code quality and prevent accidental deployments:

1. Go to your GitHub repository → Settings → Branches → Add rule
2. Set the following rules for the `main` branch:
   - Require pull request reviews before merging
   - Require status checks to pass before merging
   - Require branches to be up to date before merging
   - Include administrators in these restrictions

### GitHub Actions Workflow

A GitHub Actions workflow is configured in `.github/workflows/deploy.yml` that:

1. Builds the site on every push to `main`
2. Runs linting for code quality
3. Deploys to Cloudflare Pages automatically
4. Can be manually triggered via GitHub Actions interface

The workflow performs the following steps:
- Checks out the repository
- Sets up Node.js 18
- Installs dependencies
- Runs ESLint for code quality checks
- Builds the Astro site
- Deploys to Cloudflare Pages

To manually trigger a deployment:
1. Go to your GitHub repository
2. Navigate to Actions → "Deploy to Cloudflare Pages" workflow
3. Click "Run workflow" dropdown
4. Select the branch you want to deploy
5. Click "Run workflow"

### GitHub Secrets

The following secrets **must** be configured in your GitHub repository for the deployment workflow to function:

1. `CLOUDFLARE_API_TOKEN`: API token from Cloudflare with Pages permissions
   - Create this token in Cloudflare Dashboard → My Profile → API Tokens
   - Use the "Edit Cloudflare Workers" template or create a custom token with:
     - Account.Cloudflare Pages: Edit permission
     - Zone.Cloudflare Pages: Edit permission

2. `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
   - Find this in the Cloudflare Dashboard URL: `https://dash.cloudflare.com/ACCOUNT_ID`
   - Or in the Overview page of your account

To add these secrets:
1. Go to your GitHub repository → Settings → Secrets and variables → Actions
2. Click "New repository secret" and add each secret with the exact names shown above

## Cloudflare Pages Setup

### Initial Setup

1. Log in to your Cloudflare dashboard
2. Navigate to Pages → Create a project
3. Connect to your GitHub repository
4. Configure the following build settings:
   - Framework preset: Astro
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node.js version: 18

### Environment Variables

Set the following environment variables in Cloudflare Pages:

1. Go to your project → Settings → Environment variables
2. Add the following variables for Production and Preview environments:
   - `PLAUSIBLE_DOMAIN`: getlifesorted.com
   - `GOOGLE_ANALYTICS_ID`: Your Google Analytics ID
   - `SITE_URL`: https://getlifesorted.com (for production) or your preview URL
   - `ENABLE_ADS`: "true" or "false" to toggle ad display
   - `ENABLE_NEWSLETTER`: "true" or "false" to toggle newsletter features
   - Any other API keys or environment-specific variables

These environment variables are used by the Astro build process and affect site functionality. Make sure to set them for both Production and Preview environments as needed.

### Caching and Performance

Caching is configured through:
1. `public/_headers` file for HTTP headers
2. `wrangler.toml` for advanced configuration

The configuration includes:
- Security headers for all pages
- Cache settings for assets, images, and HTML files
- Forced HTTPS for all requests

## Custom Domain Configuration

### Connecting Your Domain

1. In Cloudflare Pages, go to your project → Custom domains
2. Click "Set up a custom domain"
3. Enter `getlifesorted.com` and follow the verification steps
4. Optionally, add `www.getlifesorted.com` as an additional domain

### DNS Configuration

1. Ensure your domain is using Cloudflare's nameservers
2. In Cloudflare DNS settings, add the following records:
   - `A` record for `getlifesorted.com` pointing to Cloudflare Pages
   - `CNAME` record for `www.getlifesorted.com` pointing to `getlifesorted.com`

### HTTPS Configuration

HTTPS is automatically configured by Cloudflare with:
- TLS certificates automatically provisioned and renewed
- HTTPS enforced for all traffic
- HSTS header included in responses

### Redirects

Redirects are configured in the `public/_redirects` file:
- www to non-www redirection
- Any legacy URL redirects
- 404 handling

## Environment Variables

The following environment variables are used in the project:

| Variable | Description | Required |
|----------|-------------|----------|
| `PLAUSIBLE_DOMAIN` | Domain for Plausible Analytics | Yes |
| `GOOGLE_ANALYTICS_ID` | Google Analytics ID | Yes |
| Additional variables as needed | | |

## Maintenance and Updates

### Regular Maintenance

1. Keep dependencies updated:
   ```
   npm update
   ```

2. Check for security vulnerabilities:
   ```
   npm audit
   ```

3. Monitor Cloudflare Pages analytics for performance issues

### Deployment Process

1. All changes should be made in feature branches
2. Create a pull request to merge changes into `main`
3. GitHub Actions will create a preview deployment
4. Review the preview deployment
5. Once approved and merged, GitHub Actions will deploy to production

### Rollback Process

If issues are discovered after deployment:

1. Go to Cloudflare Pages → your project → Deployments
2. Find the last working deployment
3. Click the three dots menu → Rollback to this deployment

This will immediately revert the site to the selected deployment while you fix the issues.