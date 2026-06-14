import { describe, it, expect } from 'vitest';
import { generateBubbleSortSteps } from './bubbleSort';

describe('Bubble Sort Engine', () => {
  it('should generate steps for sorting an array', () => {
    const input = [3, 1, 2];
    const steps = generateBubbleSortSteps(input);
    
    expect(steps.length).toBeGreaterThan(0);
    
    // Check initial state
    expect(steps[0].descriptionKey).toBe('bubble_sort_initial');
    
    // Final state should be sorted and marked as done
    const finalStep = steps[steps.length - 1];
    expect(finalStep.descriptionKey).toBe('bubble_sort_done');
    
    // Values in the final step should be [1, 2, 3]
    if (finalStep.data.type === 'array') {
      const finalValues = finalStep.data.values.map(v => v.value);
      expect(finalValues).toEqual([1, 2, 3]);
    } else {
      throw new Error('Expected array data type');
    }
  });

  it('should generate step IDs uniquely within the same call', () => {
    const steps = generateBubbleSortSteps([5, 4]);
    const ids = steps.map(s => s.id);
    const uniqueIds = new Set(ids);
    expect(ids.length).toBe(uniqueIds.size);
  });

  it('should start with stepCounter reset when called multiple times', () => {
    const steps1 = generateBubbleSortSteps([2, 1]);
    const steps2 = generateBubbleSortSteps([2, 1]);
    // Since we localized stepCounter, steps2 should have the same IDs as steps1
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
