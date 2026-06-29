import { describe, it, expect } from 'vitest';
import { generateStackSteps } from './stack';

describe('Stack Engine', () => {
  it('should generate steps for push and pop operations', () => {
    const ops = [
      { action: 'push' as const, value: 10 },
      { action: 'push' as const, value: 20 },
      { action: 'pop' as const },
    ];
    const steps = generateStackSteps(ops);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].descriptionKey).toBe('stack_initial');
    expect(steps[steps.length - 1].descriptionKey).toBe('stack_final');
  });

  it('should handle underflow (pop on empty stack)', () => {
    const ops = [{ action: 'pop' as const }];
    const steps = generateStackSteps(ops);
    const hasUnderflow = steps.some((s) => s.descriptionKey === 'stack_underflow');
    expect(hasUnderflow).toBe(true);
  });

  it('should track correct stack state after operations', () => {
    const ops = [
      { action: 'push' as const, value: 1 },
      { action: 'push' as const, value: 2 },
      { action: 'push' as const, value: 3 },
      { action: 'pop' as const },
    ];
    const steps = generateStackSteps(ops);
    const finalStep = steps[steps.length - 1];

    if (finalStep.data.type === 'stack') {
      expect(finalStep.data.values).toEqual([1, 2]);
    } else {
      throw new Error('Expected stack data type');
    }
  });

  it('should generate unique IDs', () => {
    const ops = [
      { action: 'push' as const, value: 5 },
      { action: 'pop' as const },
    ];
    const steps = generateStackSteps(ops);
    const ids = steps.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('should not leak stepCounter between calls', () => {
    const ops = [{ action: 'push' as const, value: 1 }];
    const steps1 = generateStackSteps(ops);
    const steps2 = generateStackSteps(ops);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
