import { describe, it, expect } from 'vitest';
import { generateQuickSortSteps } from './quickSort';

describe('Quick Sort Engine', () => {
  it('should generate steps for sorting an array', () => {
    const input = [10, 7, 8, 9, 1, 5];
    const steps = generateQuickSortSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].descriptionKey).toBe('quick_sort_initial');

    const finalStep = steps[steps.length - 1];
    expect(finalStep.descriptionKey).toBe('quick_sort_done');

    if (finalStep.data.type === 'array') {
      const finalValues = finalStep.data.values.map((v) => v.value);
      expect(finalValues).toEqual([1, 5, 7, 8, 9, 10]);
    } else {
      throw new Error('Expected array data type');
    }
  });

  it('should contain pivot selection and placement steps', () => {
    const steps = generateQuickSortSteps([3, 6, 2, 8, 1]);
    const hasPivot = steps.some((s) => s.descriptionKey === 'quick_sort_pivot');
    const hasPivotPlaced = steps.some((s) => s.descriptionKey === 'quick_sort_pivot_placed');
    expect(hasPivot).toBe(true);
    expect(hasPivotPlaced).toBe(true);
  });

  it('should generate unique IDs', () => {
    const steps = generateQuickSortSteps([4, 2, 7]);
    const ids = steps.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('should not leak stepCounter between calls', () => {
    const steps1 = generateQuickSortSteps([3, 1]);
    const steps2 = generateQuickSortSteps([3, 1]);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
