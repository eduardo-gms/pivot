import { describe, it, expect } from 'vitest';
import { generateQueueSteps } from './queue';

describe('Queue Engine', () => {
  it('should generate steps for enqueue and dequeue operations', () => {
    const ops = [
      { action: 'enqueue' as const, value: 10 },
      { action: 'enqueue' as const, value: 20 },
      { action: 'dequeue' as const },
    ];
    const steps = generateQueueSteps(ops);

    expect(steps.length).toBeGreaterThan(0);
    expect(steps[0].descriptionKey).toBe('queue_initial');
    expect(steps[steps.length - 1].descriptionKey).toBe('queue_final');
  });

  it('should handle underflow (dequeue on empty queue)', () => {
    const ops = [{ action: 'dequeue' as const }];
    const steps = generateQueueSteps(ops);
    const hasUnderflow = steps.some((s) => s.descriptionKey === 'queue_underflow');
    expect(hasUnderflow).toBe(true);
  });

  it('should maintain FIFO order', () => {
    const ops = [
      { action: 'enqueue' as const, value: 1 },
      { action: 'enqueue' as const, value: 2 },
      { action: 'enqueue' as const, value: 3 },
      { action: 'dequeue' as const },
    ];
    const steps = generateQueueSteps(ops);
    const finalStep = steps[steps.length - 1];

    if (finalStep.data.type === 'queue') {
      // After dequeueing 1, remaining should be [2, 3]
      expect(finalStep.data.values).toEqual([2, 3]);
    } else {
      throw new Error('Expected queue data type');
    }
  });

  it('should generate unique IDs', () => {
    const ops = [
      { action: 'enqueue' as const, value: 5 },
      { action: 'dequeue' as const },
    ];
    const steps = generateQueueSteps(ops);
    const ids = steps.map((s) => s.id);
    expect(ids.length).toBe(new Set(ids).size);
  });

  it('should not leak stepCounter between calls', () => {
    const ops = [{ action: 'enqueue' as const, value: 1 }];
    const steps1 = generateQueueSteps(ops);
    const steps2 = generateQueueSteps(ops);
    expect(steps1[0].id).toBe(steps2[0].id);
  });
});
