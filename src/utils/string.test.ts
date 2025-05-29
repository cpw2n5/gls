import { describe, it, expect } from 'vitest';
import { capitalize, truncate } from './string';

describe('String utilities', () => {
  describe('capitalize', () => {
    it('should capitalize the first letter of a string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    it('should return an empty string for non-string inputs', () => {
      expect(capitalize('')).toBe('');
      expect(capitalize(null as unknown as string)).toBe('');
      expect(capitalize(undefined as unknown as string)).toBe('');
    });

    it('should handle single character strings', () => {
      expect(capitalize('a')).toBe('A');
    });
  });

  describe('truncate', () => {
    it('should truncate strings longer than the specified length', () => {
      expect(truncate('Hello world', 5)).toBe('Hello...');
      expect(truncate('Testing', 4)).toBe('Test...');
    });

    it('should not truncate strings shorter than or equal to the specified length', () => {
      expect(truncate('Hello', 5)).toBe('Hello');
      expect(truncate('Hi', 5)).toBe('Hi');
    });

    it('should return an empty string for non-string inputs', () => {
      expect(truncate('', 5)).toBe('');
      expect(truncate(null as unknown as string, 5)).toBe('');
      expect(truncate(undefined as unknown as string, 5)).toBe('');
    });
  });
});