import { describe, it, expect } from 'vitest';
import { generateSelectionSortSteps } from './selectionSort';

describe('Selection Sort Engine', () => {
  it('should generate steps for sorting an array', () => {
    const input = [5, 3, 1, 4, 2];
    const steps = generateSelectionSortSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].descriptionKey).toBe('selection_sort_initial');

    const finalStep = steps[steps.length - 1];
    expect(finalStep.descriptionKey).toBe('selection_sort_done');

    if (finalStep.data.type === 'array') {
      const finalValues = finalStep.data.values.map((v) => v.value);
      expect(finalValues).toEqual([1, 2, 3, 4, 5]);
    } else {
      throw new Error('Expected array data type');
    }
  });

  it('should handle an already sorted array', () => {
    const steps = generateSelectionSortSteps([1, 2, 3]);
    expect(steps[0].descriptionKey).toBe('selection_sort_initial');
    expect(steps[steps.length - 1].descriptionKey).toBe('selection_sort_done');
  });

  it('should generate unique IDs', () => {
    const steps = generateSelectionSortSteps([4, 2, 7]);
    const ids = steps.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('should not leak stepCounter between calls', () => {
    const steps1 = generateSelectionSortSteps([3, 1]);
    const steps2 = generateSelectionSortSteps([3, 1]);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
