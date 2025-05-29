# Testing Documentation

This document provides comprehensive information about the testing setup for GetLifeSorted.com, including how to run tests, write new tests, and understand the CI workflow.

## Testing Setup

GetLifeSorted.com uses the following testing tools and libraries:

- **Vitest**: A Vite-native testing framework that's fast and compatible with the Jest API
- **happy-dom**: A browser environment simulator for testing browser-specific code
- **@testing-library/dom**: Utilities for testing DOM elements

### Configuration

The testing environment is configured in `vitest.config.ts` with the following settings:

- **Test Environment**: happy-dom (browser-like environment)
- **Test Files**: All files matching `src/**/*.{test,spec}.{js,ts,jsx,tsx}`
- **Coverage Reporting**: Configured to generate text, JSON, and HTML reports
- **Path Aliases**: `~` is aliased to the `src` directory

## Running Tests Locally

The project includes several npm scripts for running tests:

| Command | Description |
|---------|-------------|
| `npm run test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode (tests rerun when files change) |
| `npm run test:coverage` | Run tests with coverage reporting |

### Example

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage reporting
npm run test:coverage
```

The coverage reports are generated in the `coverage/` directory and include:
- Text output in the console
- HTML report for viewing in a browser
- JSON data for integration with other tools

## Writing Tests

Tests are written using the Vitest API, which is compatible with Jest. Here's a simple example of how to write a test:

```typescript
import { describe, it, expect } from 'vitest';
import { myFunction } from './myModule';

describe('myModule', () => {
  describe('myFunction', () => {
    it('should return the expected result', () => {
      expect(myFunction('input')).toBe('expected output');
    });
    
    it('should handle edge cases', () => {
      expect(myFunction('')).toBe('default value');
      expect(myFunction(null as unknown as string)).toBe('default value');
    });
  });
});
```

### Test Structure

- Use `describe` blocks to group related tests
- Use nested `describe` blocks for more specific grouping
- Use `it` blocks for individual test cases
- Use `expect` with matchers like `toBe`, `toEqual`, etc. for assertions

### Testing Utilities

The project includes a `vitest.setup.ts` file where you can add global test setup code, such as:
- Global mocks
- Environment variables
- Custom matchers

## GitHub Actions CI Workflow

The project includes a CI workflow defined in `.github/workflows/ci.yml` that runs on push to the main branch and on pull requests.

### CI Jobs

The workflow includes the following jobs:

1. **Lint**:
   - Runs ESLint to check code quality
   - Uses Node.js 18
   - Runs `npm run lint`

2. **Test**:
   - Runs all tests
   - Uses Node.js 18
   - Runs `npm run test`
   - Uploads coverage reports as artifacts

### Coverage Reports

The CI workflow automatically uploads coverage reports as artifacts, which can be downloaded from the GitHub Actions interface. These reports are retained for 30 days.

## Best Practices

### General Testing Practices

1. **Write Tests First**: Consider writing tests before implementing features (Test-Driven Development)
2. **Test Behavior, Not Implementation**: Focus on what the code does, not how it does it
3. **Keep Tests Simple**: Each test should verify one specific behavior
4. **Use Descriptive Test Names**: Test names should clearly describe what is being tested

### Project-Specific Best Practices

1. **Component Testing**:
   - Test that components render correctly
   - Test user interactions (clicks, inputs, etc.)
   - Test conditional rendering

2. **Utility Function Testing**:
   - Test all edge cases (empty strings, null values, etc.)
   - Test error handling
   - Test with a variety of inputs

3. **Integration Testing**:
   - Test that components work together correctly
   - Test data flow between components

4. **Coverage Goals**:
   - Aim for high test coverage, especially for critical business logic
   - Focus on quality of tests over quantity

## Troubleshooting

### Common Issues

1. **Tests Failing in CI but Passing Locally**:
   - Check for environment-specific code
   - Ensure all dependencies are properly installed in CI

2. **Slow Tests**:
   - Avoid unnecessary setup/teardown
   - Use mocks for external services
   - Consider running tests in parallel

3. **Flaky Tests**:
   - Avoid timing-dependent tests
   - Don't rely on global state
   - Ensure proper cleanup after tests

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/docs/)
- [Happy DOM Documentation](https://github.com/capricorn86/happy-dom)