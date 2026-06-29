import { describe, it, expect } from 'vitest';
import { generateMergeSortSteps } from './mergeSort';

describe('Merge Sort Engine', () => {
  it('should generate steps for sorting an array', () => {
    const input = [38, 27, 43, 3, 9];
    const steps = generateMergeSortSteps(input);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].descriptionKey).toBe('merge_sort_initial');

    const finalStep = steps[steps.length - 1];
    expect(finalStep.descriptionKey).toBe('merge_sort_done');

    if (finalStep.data.type === 'array') {
      const finalValues = finalStep.data.values.map((v) => v.value);
      expect(finalValues).toEqual([3, 9, 27, 38, 43]);
    } else {
      throw new Error('Expected array data type');
    }
  });

  it('should contain split and merge steps', () => {
    const steps = generateMergeSortSteps([5, 2, 8, 1]);
    const hasSplit = steps.some((s) => s.descriptionKey === 'merge_sort_split');
    const hasMerged = steps.some((s) => s.descriptionKey === 'merge_sort_merged');
    expect(hasSplit).toBe(true);
    expect(hasMerged).toBe(true);
  });

  it('should generate unique IDs', () => {
    const steps = generateMergeSortSteps([4, 2, 7]);
    const ids = steps.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('should not leak stepCounter between calls', () => {
    const steps1 = generateMergeSortSteps([3, 1]);
    const steps2 = generateMergeSortSteps([3, 1]);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
