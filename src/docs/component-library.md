# GetLifeSorted Component Library

This document provides an overview of the component library used in GetLifeSorted.com. The component library is designed to ensure consistency, accessibility, and maintainability across the site.

## Table of Contents

1. [Overview](#overview)
2. [Global Components](#global-components)
3. [Calculator Components](#calculator-components)
4. [Analytics Components](#analytics-components)
5. [Layout Components](#layout-components)
6. [Component Usage Guidelines](#component-usage-guidelines)
7. [Creating New Components](#creating-new-components)

## Overview

GetLifeSorted.com uses Astro components to build a consistent user interface. The component library follows these principles:

- **Reusability**: Components are designed to be reused across the site
- **Accessibility**: All components follow WCAG 2.1 AA standards
- **Responsiveness**: Components adapt to different screen sizes
- **Performance**: Components are optimized for fast loading and rendering
- **Maintainability**: Components use consistent patterns and naming conventions

## Global Components

### Header (`Header.astro`)

The site header component that appears on all pages.

```astro
---
import Navigation from './Navigation.astro';
---

<Header />
```

### Footer (`Footer.astro`)

The site footer component that appears on all pages.

```astro
<Footer />
```

### Navigation (`Navigation.astro`)

The main navigation component used in the header.

```astro
<Navigation />
```

### SEO (`SEO.astro`)

Component for managing SEO metadata, Open Graph tags, and structured data.

```astro
---
const { title, description, image, canonicalURL } = Astro.props;
---

<SEO 
  title={title}
  description={description}
  image={image}
  canonicalURL={canonicalURL}
/>
```

### OptimizedImage (`OptimizedImage.astro`)

Component for rendering optimized, responsive images.

```astro
---
const { src, alt, width, height, loading = "lazy" } = Astro.props;
---

<OptimizedImage
  src={src}
  alt={alt}
  width={width}
  height={height}
  loading={loading}
/>
```

### AdUnit (`AdUnit.astro`)

Component for displaying advertisements.

```astro
---
const { type, className, slot } = Astro.props;
---

<AdUnit type="banner" className="my-4" />
```


### FontOptimization (`FontOptimization.astro`)

Component for optimizing font loading and display.

```astro
<FontOptimization />
```

## Calculator Components

### CalculatorWidget (`CalculatorWidget.astro`)

The main calculator component used for all calculators on the site.

```astro
---
const { 
  id, 
  title, 
  description, 
  inputs, 
  initialResults, 
  calculationFunction,
  showShareButton = true,
  showPrintButton = true
} = Astro.props;
---

<CalculatorWidget
  id="mortgage-calculator"
  title="Mortgage Calculator"
  description="Calculate your monthly mortgage payment"
  inputs={inputs}
  initialResults={initialResults}
  calculationFunction="calculateMortgage"
/>
```

### InputField (`InputField.astro`)

Component for rendering different types of form inputs in calculators.

```astro
---
const { 
  id, 
  label, 
  type = "text", 
  defaultValue, 
  required = false,
  min, 
  max, 
  step,
  options,
  helpText
} = Astro.props;
---

<InputField
  id="loanAmount"
  label="Loan Amount"
  type="number"
  defaultValue={300000}
  required={true}
  min={10000}
  max={1000000}
  step={1000}
  helpText="Enter the total loan amount"
/>
```

### ResultsDisplay (`ResultsDisplay.astro`)

Component for displaying calculation results.

```astro
---
const { results } = Astro.props;
---

<ResultsDisplay results={results} />
```

## Analytics Components

### Analytics (`Analytics.astro`)

Component for loading analytics scripts.

```astro
<Analytics />
```

### PlausibleAnalytics (`PlausibleAnalytics.astro`)

Component for loading Plausible Analytics.

```astro
---
const { domain } = Astro.props;
---

<PlausibleAnalytics domain={domain} />
```

### GoogleAdSense (`GoogleAdSense.astro`)

Component for loading Google AdSense.

```astro
---
const { clientId } = Astro.props;
---

<GoogleAdSense clientId={clientId} />
```

### EventTracking (`EventTracking.astro`)

Component for tracking user events.

```astro
<EventTracking />
```

## Layout Components

### Layout (`Layout.astro`)

The main layout component used for all pages.

```astro
---
const { title, description, image } = Astro.props;
---

<Layout title={title} description={description} image={image}>
  <slot />
</Layout>
```

### ArticleLayout (`ArticleLayout.astro`)

Layout component specifically for article pages.

```astro
---
const { title, description, image, publishDate, author, tags } = Astro.props;
---

<ArticleLayout
  title={title}
  description={description}
  image={image}
  publishDate={publishDate}
  author={author}
  tags={tags}
>
  <slot />
</ArticleLayout>
```

### CalculatorLayout (`CalculatorLayout.astro`)

Layout component specifically for calculator pages.

```astro
---
const { title, description } = Astro.props;
---

<CalculatorLayout title={title} description={description}>
  <slot />
  <Fragment slot="related">
    <slot name="related" />
  </Fragment>
</CalculatorLayout>
```

## Component Usage Guidelines

### When to Use Components

- Use components for UI elements that appear multiple times across the site
- Use components to encapsulate complex functionality
- Use layout components to maintain consistent page structure

### Component Props

- Document all props with JSDoc comments
- Provide default values for optional props
- Use TypeScript interfaces for complex prop types

### Component Styling

- Use Tailwind CSS for component styling
- Use consistent class naming conventions
- Use CSS variables for theme colors and spacing

## Creating New Components

To create a new component:

1. Create a new `.astro` file in the appropriate directory under `src/components/`
2. Define the component's props using TypeScript interfaces
3. Implement the component's markup and logic
4. Document the component in this documentation

### Component Template

```astro
---
// Import dependencies
import { SomeComponent } from '../path/to/component';

// Define props interface
interface Props {
  propName: string;
  optionalProp?: number;
}

// Get props with defaults
const { 
  propName, 
  optionalProp = 0 
} = Astro.props as Props;

// Component logic
const result = someFunction(propName);
---

<!-- Component markup -->
<div class="component-wrapper">
  <h2>{propName}</h2>
  <p>Result: {result}</p>
  {optionalProp > 0 && <span>{optionalProp}</span>}
  <slot />
</div>

<style>
  /* Component-specific styles */
  .component-wrapper {
    /* styles */
  }
</style>

<script>
  // Client-side JavaScript
  document.addEventListener('DOMContentLoaded', () => {
    // Initialize component
  });
</script>
```

### Best Practices

1. **Keep components focused**: Each component should do one thing well
2. **Make components reusable**: Avoid hardcoding values that should be props
3. **Document components**: Add comments explaining complex logic
4. **Test components**: Ensure components work across different browsers and screen sizes
5. **Optimize performance**: Minimize JavaScript and CSS in components
6. **Ensure accessibility**: Use semantic HTML and ARIA attributes