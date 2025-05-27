# Calculator Component Documentation

This document explains how to use and extend the calculator functionality in GetLifeSorted.com.

## Overview

The calculator system consists of several components:

1. `CalculatorWidget.astro` - The main reusable component for all calculators
2. `InputField.astro` - Component for rendering different types of form inputs
3. `ResultsDisplay.astro` - Component for displaying calculation results
4. Calculator-specific pages (e.g., `rental-insurance.astro`)
5. Calculator configuration files in `src/content/calculators/`

## Using the CalculatorWidget Component

The `CalculatorWidget` component is designed to be highly reusable across different calculator types. Here's how to use it:

```astro
<CalculatorWidget
  id="unique-calculator-id"
  title="Calculator Title"
  description="Description of what this calculator does"
  inputs={inputsArray}
  initialResults={initialResultsArray}
  calculationFunction="nameOfCalculationFunction"
  showShareButton={true}
  showPrintButton={true}
/>
```

### Props

| Prop | Type | Description |
|------|------|-------------|
| `id` | string | Unique identifier for the calculator |
| `title` | string | Title displayed at the top of the calculator |
| `description` | string | Description text explaining the calculator's purpose |
| `inputs` | array | Array of input field configurations |
| `initialResults` | array | Initial results to display (optional) |
| `calculationFunction` | string | Name of the JavaScript function that performs calculations |
| `showShareButton` | boolean | Whether to show the share button (default: true) |
| `showPrintButton` | boolean | Whether to show the print button (default: true) |

### Input Configuration

Each input in the `inputs` array should have the following structure:

```javascript
{
  id: "inputId",
  label: "Input Label",
  type: "text", // Can be: text, number, select, radio, checkbox
  defaultValue: "default", // Optional default value
  required: true, // Whether the field is required
  min: 0, // For number inputs
  max: 100, // For number inputs
  step: 1, // For number inputs
  options: [ // For select and radio inputs
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" }
  ],
  helpText: "Additional explanation about this field" // Optional help text
}
```

### Result Configuration

Results should be structured as follows:

```javascript
{
  label: "Result Label",
  value: 100, // The value to display
  type: "currency", // Can be: currency, percentage, text, number
  description: "Additional explanation about this result" // Optional
}
```

## Creating a New Calculator

To create a new calculator:

1. Create a configuration file in `src/content/calculators/` (e.g., `mortgage-calculator.json`)
2. Create a new page in `src/pages/calculators/` (e.g., `mortgage-calculator.astro`)
3. Implement the calculation function in a script tag

### Step 1: Create Configuration File

```json
{
  "title": "Mortgage Calculator",
  "description": "Calculate your monthly mortgage payments",
  "slug": "mortgage-calculator",
  "inputs": [
    {
      "id": "loanAmount",
      "label": "Loan Amount",
      "type": "number",
      "defaultValue": 300000,
      "required": true,
      "min": 10000,
      "max": 10000000,
      "step": 1000
    },
    {
      "id": "interestRate",
      "label": "Interest Rate (%)",
      "type": "number",
      "defaultValue": 4.5,
      "required": true,
      "min": 0.1,
      "max": 20,
      "step": 0.1
    },
    {
      "id": "loanTerm",
      "label": "Loan Term (years)",
      "type": "select",
      "required": true,
      "options": [
        {
          "label": "15 years",
          "value": 15
        },
        {
          "label": "30 years",
          "value": 30
        }
      ],
      "defaultValue": 30
    }
  ],
  "relatedArticles": [
    "mortgage-guides/first-time-homebuyer"
  ],
  "relatedCalculators": [
    "home-affordability"
  ]
}
```

### Step 2: Create Calculator Page

```astro
---
import CalculatorLayout from "../../layouts/CalculatorLayout.astro";
import CalculatorWidget from "../../components/calculators/CalculatorWidget.astro";
import { getEntry } from "astro:content";

// Get calculator configuration from content collection
const calculatorData = await getEntry("calculators", "mortgage-calculator");
const { title, description, inputs } = calculatorData.data;

// Enhance inputs with help text if needed
const enhancedInputs = inputs.map(input => {
  if (input.id === "interestRate") {
    return {
      ...input,
      helpText: "Current average rate is 4.5%"
    };
  }
  return input;
});

// Get related articles if they exist
const relatedArticles = calculatorData.data.relatedArticles || [];
const relatedCalculators = calculatorData.data.relatedCalculators || [];

// Initial empty results
const initialResults = [];
---

<CalculatorLayout title={title} description={description}>
  <div class="space-y-8">
    <CalculatorWidget
      id="mortgage-calculator"
      title={title}
      description="Calculate your monthly mortgage payment based on loan amount, interest rate, and term."
      inputs={enhancedInputs}
      initialResults={initialResults}
      calculationFunction="calculateMortgage"
    />
    
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-4">About Mortgage Calculations</h3>
      <div class="prose prose-sm dark:prose-invert max-w-none">
        <p>
          This calculator uses the standard mortgage formula to calculate your monthly payment.
        </p>
        <!-- Additional information about mortgages -->
      </div>
    </div>
  </div>
  
  <Fragment slot="related">
    <ul class="space-y-2">
      {relatedCalculators.map((calc) => (
        <li>
          <a href={`/calculators/${calc}`} class="text-primary-600 dark:text-primary-400 hover:underline">
            Home Affordability Calculator
          </a>
        </li>
      ))}
    </ul>
    
    <div class="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
      <h4 class="font-medium mb-2">Related Articles</h4>
      <ul class="space-y-2">
        {relatedArticles.map((article) => (
          <li>
            <a href={`/articles/${article}`} class="text-primary-600 dark:text-primary-400 hover:underline">
              First-Time Homebuyer Guide
            </a>
          </li>
        ))}
      </ul>
    </div>
  </Fragment>
</CalculatorLayout>

<script>
  /**
   * Calculate mortgage payment based on form inputs
   * @param {Object} formData - The form data object
   * @returns {Array} Array of result objects
   */
  window.calculateMortgage = function(formData) {
    // Extract form values
    const loanAmount = Number(formData.loanAmount) || 300000;
    const interestRate = Number(formData.interestRate) || 4.5;
    const loanTerm = Number(formData.loanTerm) || 30;
    
    // Calculate monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate number of payments
    const payments = loanTerm * 12;
    
    // Calculate monthly payment using mortgage formula
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, payments)) / 
      (Math.pow(1 + monthlyRate, payments) - 1);
    
    // Calculate total payment over loan term
    const totalPayment = monthlyPayment * payments;
    
    // Calculate total interest
    const totalInterest = totalPayment - loanAmount;
    
    // Return results
    return [
      {
        label: "Monthly Payment",
        value: Math.round(monthlyPayment),
        type: "currency",
        description: "Principal and interest only"
      },
      {
        label: "Total Principal",
        value: loanAmount,
        type: "currency"
      },
      {
        label: "Total Interest",
        value: Math.round(totalInterest),
        type: "currency",
        description: `Over ${loanTerm} years`
      },
      {
        label: "Total Cost",
        value: Math.round(totalPayment),
        type: "currency",
        description: "Principal plus interest"
      }
    ];
  }
</script>
```

## Important Implementation Notes

### Exposing Calculation Functions

The calculation function must be exposed to the global scope by assigning it to the `window` object:

```javascript
// Correct way to define the calculation function
window.calculateMortgage = function(formData) {
  // Calculation logic here
  return results;
};
```

Do not define it as a regular function, as it won't be accessible to the CalculatorWidget component:

```javascript
// This won't work!
function calculateMortgage(formData) {
  // Calculation logic here
  return results;
}
```

## Features

### URL Parameter Sharing

The calculator automatically updates the URL with form parameters when calculations are performed. This allows users to share specific calculator results by copying the URL.

### Responsive Design

All calculator components are fully responsive and work on mobile, tablet, and desktop devices.

### Accessibility

The calculator components include proper ARIA attributes and support keyboard navigation for accessibility compliance.

### Print and Share

Users can print their results or share them via the Web Share API (with clipboard fallback).

## Extending the Calculator System

To add new features to the calculator system:

1. For new input types, update the `InputField.astro` component
2. For new result display options, update the `ResultsDisplay.astro` component
3. For global calculator functionality, update the `CalculatorWidget.astro` component

## Best Practices

1. Always provide helpful descriptions for inputs and results
2. Include reasonable default values for all inputs
3. Validate inputs on the client side
4. Format outputs appropriately (currency, percentage, etc.)
5. Include explanatory text about the calculator's methodology
6. Link to related calculators and articles